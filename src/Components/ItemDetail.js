import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateItem, SaveItem } from "../Store/Item/item";
//import { updateOriginalItem } from "../Store/Product/originalItem";
import styled from 'styled-components';

import _ from 'lodash'; 
import Moment from 'react-moment';
import DatePicker from "react-datepicker";

import { AwesomeButton } from "react-awesome-button";
import { ItemService } from "../Service/ItemService";


export const Container = styled.div`
 
    max-height:100%;
    overflow-y:auto;

    .header{
    
        display: flex;
        justify-content: space-around;
        margin: 10px;
    }
    .mid{

        display: flex;
        justify-content: space-around;
        margin: 10px;
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


const ItemDetail = () => {
  const dispatch = useDispatch();
  //const itemSrv = new ItemService();
  
 const selectedItem = useSelector(state => state.entities.item);
 const [item, setItem] = useState(selectedItem); // ?? itemSrv.getNewItem());
  const originalItem = useSelector(state => state.entities.originalItem);
  const [isDirtyItem, setIsDirtyItem] = useState(false);
  // useEffect( () => {
  //   selectedItem && setItem(selectedItem);
  //  },[selectedItem]);

  useEffect( () =>{
    setItem(selectedItem);
  },[selectedItem])

  useEffect( () =>{
    handleIsDirtyItem()
  },[item])

  useEffect( () =>{
    handleIsDirtyItem()
  },[originalItem]);
  
  
  const handleIsDirtyItem = () =>{
    let isDirtyItem = !_.isEqual(item, originalItem);
  
    setIsDirtyItem(isDirtyItem);
  }

   const Save =  async() => {
    console.log(item)
   // let Id = await itemSrv.SaveItem(item);
    dispatch(SaveItem(item))
    //console.log(Id);
   // let i = {...item, Id};
    //setItem(i);
    //onSave(i);
  }
  
   const updateStartDate = (date) =>{
    let v= {...item, StartDate:date}
    setItem(v);
   }

   const updateEndDate = (date) =>{
    let v= {...item, EndDate:date}
    setItem(v);
  }

  const updateCode = (e) => {
    let i = {...item, Code:e}
    setItem(i);
    console.log(e);
  }
  const updateType = (e) => {
   // setItem({...item, Type:e});
   setItem({...item, Type:e})
    console.log(e);
  }
  const UpdateSpecialityCode = (e) => {
    //setItem({...item, SpecialityCode:e});
    setItem({...item, SpecialityCode:e})
    console.log(e);
  }
  const updateProviderNumber = (e) => {
    //setItem({...item, ProviderNumber:e});
    setItem({...item, ProviderNumber:e})
    console.log(e);
  }

  return (
    <React.Fragment> 
      <Container>
        <h1>Item Edit</h1>
        {isDirtyItem &&
        <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    Save();
                  }}
                  >
                  {item.Id > 0 ? "Save" : "Create"}
        </AwesomeButton>
        }
        <div className = "header">
          
        <div>
         <Moment format="YYYY/MM/DD" date ={item?.StartDate}/> - <Moment format="YYYY/MM/DD" date ={item?.EndDate}/>
         </div>
         <div>
        <DatePicker selected={Date.parse(item.StartDate)} onChange={date => updateStartDate(date)} />
        <DatePicker selected={Date.parse(item.EndDate)} onChange={date => updateEndDate(date)} />
        </div>
        </div>
        <div className = "mid">
          <InputBlock>
              <span>Code</span>
              <input
                type="text"
                value={item.Code}
                onChange={e => updateCode(e.target.value)}
              />
            </InputBlock>
            <InputBlock>
              <span>Type</span>
              <input
                type="text"
                value={item.Type}
                onChange={e => updateType(e.target.value)}
              />
            </InputBlock>
            <InputBlock>
              <span>Speciality Code</span>
              <input
                type="text"
                value={item.SpecialityCode}
                onChange={e => UpdateSpecialityCode(e.target.value)}
              />
            </InputBlock>
            <InputBlock>
              <span>ProviderNumber</span>
              <input
                type="text"
                value={item.ProviderNumber}
                onChange={e => updateProviderNumber(e.target.value)}
              />
            </InputBlock>
            
         </div>
      </Container>
    </React.Fragment>
  );
};

export default ItemDetail;

