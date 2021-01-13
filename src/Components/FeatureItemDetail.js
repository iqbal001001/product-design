import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash'; 
import { AwesomeButton } from "react-awesome-button";
import ListDragAndDrop from './dnd/ListDragAndDrop';
import { FeatureService } from "../Service/FeatureService";
import { ItemService } from "../Service/ItemService";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const SuiteStyle = styled.div`
    background: blue;
    max-height:100%;
    overflow-y:auto;
`
export const SuiteDetailStyle = styled.div`
    background: blue;
    display: flex;
    height: 200px;
`

export const VersionsStyle = styled.div`
    background: yellow;
    max-height:100%;
    display: flex;
    flex-direction: column;
`

export const InputBlockStyle = styled.div`
    background: orange;
    max-height:100%;
    width: 300px;
 
`



const Versions = ({children}) => {
  return (<VersionsStyle>{children}</VersionsStyle> );
}


const FeatureItemDetail = ({selected, onChange}) => {
  const featureSrv = new FeatureService();
  const itemSrv = new ItemService();
  const [featureId, setFeatureId] = useState(null);
  const [originalFeatureItems, setOriginalFeatureItems] = useState([]);
  const [featureItems, setFeatureItems] = useState([]);
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [isDirtyFeatureItems, setIsDirtyFeatureItems] = useState(false);

  useEffect( () => {
    loadItems();
   }, []);

   useEffect( () =>{
    setOptions(getOptions(items));
},[items]);

useEffect( () =>{   
    if(selected) {
        setFeatureId(selected.Id);
        setFeatureItems(selected.Items);
        setOriginalFeatureItems(selected.Items);
     //   handleIsDirtyFeature()
    }
},[selected]);

useEffect( () =>{
  handleIsDirtyFeatureItem()
},[featureItems]);

useEffect( () =>{
  handleIsDirtyFeatureItem()
},[originalFeatureItems]);



const handleIsDirtyFeatureItem = () =>{
  let isDirtTemplate = !_.isEqual(featureItems, originalFeatureItems);

 setIsDirtyFeatureItems(isDirtTemplate);
}

   const loadItems = async() => {
    let items = await itemSrv.getItems();
          let is = items?.map((item) => {
            return {...item, isAvailable: true, label: item.Code}
          })
                      setItems(is?? []);
  }

   const getOptions = (items) => {
    let is = _.cloneDeep(items);
      return is
        .map((i) => {
          return {label: i.label, isAvailable: i.isAvailable, value:i.Id}
    })
  }
  

  const onItemChange = (selectedValues) => {
        let cItems = [...featureItems];
        let cItemIds = cItems.map(x => x.ItemId);

        let deletedItems = _.difference(cItemIds,selectedValues);
        cItems = cItems.filter(x=>!deletedItems.includes(x.ItemId) )

        let addedItems = _.difference(selectedValues,cItemIds);
        addedItems.map((id)=>{
         return cItems.push(featureSrv.getNewFeatureItem(featureId, id));
        })
        setFeatureItems(cItems);
        onChange && onChange(cItems);
  };

  const SaveItems = async() => {
    console.log(featureItems)
           let items = null;
           if(onChange) {
            items = featureItems;
           }else{
            items = await featureSrv.SaveItems({
              featureId : featureId,
              Items : featureItems
             }).Items;
           }

           setFeatureItems(items);
           setOriginalFeatureItems(items);
           onChange && onChange(items);
  }

  return (
    <React.Fragment> 
      <Container>
        <h1>Feature Item</h1>
        <Versions>
          <div>
        {!onChange && isDirtyFeatureItems && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveItems();
                  }}
                  >
                  Save
              </AwesomeButton>
              }
              </div>
              <ListDragAndDrop 
              options = {options} 
              selected = {featureItems?.map(x=>x.ItemId)} 
              onChange = {onItemChange}/>

        </Versions>
      </Container>
    </React.Fragment>
  );
};

export default  FeatureItemDetail;

