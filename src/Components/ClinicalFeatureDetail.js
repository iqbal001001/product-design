import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateFeatures } from "../Store/ClinicalCategory/clinicalCategory";
import styled from 'styled-components';
import ListDragAndDrop from './dnd/ListDragAndDrop';

import _ from 'lodash'; 

import { AwesomeButton } from "react-awesome-button";
import { FeatureService } from "../Service/FeatureService";


export const Container = styled.div`
    background: green;
    max-height:100%;
    overflow-y:auto;

    .header{
        background: red;
        display: flex;
    }
    .mid{
        background: orange;
        display: flex;
    }
    .footer{

    }
`

export const InputBlockStyle = styled.div`
    background: green;
    max-height:100%;
    overflow-y:auto;
`

const ClinicalFeatureDetail = ({selectedId, selectedItems, onSave}) => {
  const dispatch = useDispatch();
  const featureSrv = new FeatureService();
  // const [clinicalCategoryId, setClinicalCategoryId] = useState(null);
  // const [clinicalFeatures, setClinicalFeatures] = useState([]);
  const clinicalCategoryId = useSelector(state => state.entities.clinicalCategory.Id);
  const clinicalFeatures = useSelector(state => state.entities.clinicalCategory.Features);
  const [features, setFeatures] = useState([]);
  const [options, setOptions] = useState([]);

  // useEffect( () => {
  //   if(selectedId){
  //       setClinicalCategoryId(selectedId);
  //   } 
  //  },[selectedId]);

  //  useEffect( () => {
  //   if(selectedItems){
  //       setClinicalFeatures(selectedItems); 
  //   } 
  //  },[selectedItems]);

   useEffect( () => {
    loadItems();
   }, [clinicalCategoryId]);

   useEffect( () =>{
    setOptions(getOptions(features));
},[features]);

// useEffect( () =>{
//     let c = _.cloneDeep(selectedClinicalCategory);
//     c.Ancillaries = ancillaries;
//     setCode(c);
// },[clinicalFeatures]);


const loadItems = async() => {
    let items = await featureSrv.getFeatureListWithDependents();
          let is = items.map((item) => {
            if (item.ClinicalCategoryId === null 
              || item.ClinicalCategoryId === 0 
              || item.ClinicalCategoryId === clinicalCategoryId)
            {
              return {...item, isAvailable: true, label: item.Name}
            }else{
              return {...item, isAvailable: false, label: item.Name + '(' + item.ClinicalCategory?.Name + ')'}
            }
          })
          setFeatures(is);
        //  setOptions(getOptions(is));
  }

  const getOptions = (items) => {
    let is = _.cloneDeep(items);
      return is
        .map((i) => {
          return {label: i.label, isAvailable: i.isAvailable, value:i.Id}
    })
  }

  const onChange = (selectedValues) => {
    let cItems = _.cloneDeep(features);
    let cItemIds = cItems.map(x => x.Id);

    let deletedItems = _.difference(cItemIds,selectedValues);
    cItems = cItems.filter(x=>!deletedItems.includes(x.Id) )

    // let addedItems = _.difference(selectedValues,cItemIds);
    // addedItems.map((id)=>{
    //     let index = cItems.findIndex(x=> x.Id === id)
    //     cItems[index].ClinicalCategoryId = clinicalCategoryId
    // // return f;
    // })
    cItems.map((i)=>{
        i.ClinicalCategoryId = clinicalCategoryId
    })
    dispatch(updateFeatures(cItems));
};

  return (
    <React.Fragment> 
      <Container>
        <h1>Item Edit</h1>
         <div>
         <ListDragAndDrop 
              options = {options} 
              selected = {clinicalFeatures?.map(x=>x.Id)} 
              onChange = {onChange}/>
         </div>

      </Container>
    </React.Fragment>
  );
};

export default ClinicalFeatureDetail;

