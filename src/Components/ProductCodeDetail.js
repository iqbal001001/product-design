import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListDragAndDrop from './dnd/ListDragAndDrop';

import _ from 'lodash'; 

import { AwesomeButton } from "react-awesome-button";
import { ProductService } from "../Service/ProductService";
import { ItemService } from "../Service/ItemService";


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

const InputBlock = ({children}) => {
  return (<InputBlockStyle>{children}</InputBlockStyle> );
}


const ProductCodeDetail = ({mode, selectedCode, onSave}) => {
  const productSrv = new ProductService();
  const itemSrv = new ItemService();
  const [code, setCode] = useState(selectedCode ?? productSrv.getNewCode());
  const [ancillaries, setAncillaries] = useState([]);
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect( () => {
    selectedCode && loadCode(selectedCode.Id);
   },[selectedCode]);

   useEffect( () => {
    loadItems();
   }, []);

   useEffect( () =>{
    setOptions(getOptions(items));
},[items]);

useEffect( () =>{
    let c = _.cloneDeep(code);
    c.Ancillaries = ancillaries;
    setCode(c);
},[ancillaries]);

const loadCode = async(id) => {
    let codes = await productSrv.getProductCodeWithDependents(id);
    if (mode === 'Clone')
      setCode({...codes[0], Id:0});
    else
      setCode(codes[0]);
}

const loadItems = async() => {
    let items = await itemSrv.getItems();
          let is = items.map((item) => {
            return {...item, isAvailable: true, label: item.Code}
          })
                      setItems(is);
        //  setOptions(getOptions(is));
  }

  const getOptions = (items) => {
    let is = _.cloneDeep(items);
      return is
        .map((i) => {
          return {label: i.label, isAvailable: i.isAvailable, value:i.Id}
    })
  }

   const SaveCode =  async() => {
    console.log(code)
 
    let c = await productSrv.SaveCodeWithDependent(code);
    console.log(c);
    if (c && c.Id > 0) {
        let i = {...code, Id:c.Id};
        setCode(i);
        onSave &&  onSave(i);
    }
  }

  const updateName = (e) => {
    setCode({...code, Code:e});
    console.log(e);
  }

  const onChange = (selectedValues) => {
    let cItems = [...ancillaries];
    let cItemIds = cItems.map(x => x.ItemId);

    let deletedItems = _.difference(cItemIds,selectedValues);
    cItems = cItems.filter(x=>!deletedItems.includes(x.ItemId) )

    let addedItems = _.difference(selectedValues,cItemIds);
    addedItems.map((id)=>{
     return cItems.push(
      {
        Id: 0, 
        ProductCodeId: code.Id,
        ItemId: id
      });
    })
    setAncillaries(cItems);
};

  return (
    <React.Fragment> 
      <Container>
        <h1>Code Edit</h1>
        <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveCode();
                  }}
                  >
                  {code.Id > 0 ? "Save" : "Create"}
        </AwesomeButton>
        <div className = "header">
          
        </div>
        <div className = "mid">
          <InputBlock>
              <span>Code</span>
              <input
                type="text"
                value={code.Code}
                onChange={e => updateName(e.target.value)}
              />
            </InputBlock>
         
            
         </div>
         <div>
         <ListDragAndDrop 
              options = {options} 
              selected = {code.Ancillaries?.map(x=>x.ItemId)} 
              onChange = {onChange}/>
         </div>

      </Container>
    </React.Fragment>
  );
};

export default ProductCodeDetail;

