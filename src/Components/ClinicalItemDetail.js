import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AwesomeButton } from "react-awesome-button";
import Moment from 'react-moment';
import moment from 'moment';
import ListDragAndDrop from './dnd/ListDragAndDrop';
import DatePicker from "react-datepicker";
import _ from 'lodash';
import "react-datepicker/dist/react-datepicker.css";


import { ClinicalCategoryService} from "../Service/ClinicalCategory";
import { ItemService} from "../Service/ItemService";

export const Container = styled.div`
    background: green;
    max-height:100%;
    overflow-y:auto;

    .header{
        background: red;
        display: flex;
        flex-direction: column;
    }
    .mid{
        background: orange;
        display: flex;
    }
    .footer{

    }
`

const ClinicalItemDetail = ({mode, allAllocatedItems, selected, onSave}) => {
  const itemSrv = new ItemService();

    const [clinicalCategoryId, setClinicalCategoryId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [clinicalItems, setClinicalItems] = useState([]);
    const [items, setItems] = useState([]);
    const [options, setOptions] = useState([]);


    useEffect(() =>{
        if(selected){
            let date = selected.UniqueId?.split('|');
            if(date){
                setStartDate(date[0]);
                setEndDate(date[1]);
                setClinicalCategoryId(date[2]);
            }
            setClinicalItems(selected.values);
        }
    },[selected]);

    useEffect( () =>{
      loadItems();
    },[allAllocatedItems]);
    const loadItems = async() => {
      let items = await itemSrv.getItems();
            let is = items.map((item) => {
              return {...item, isAvailable: true}
            })
                        setItems(is);
          //  setOptions(getOptions(is));
    }

   useEffect( () =>{
         setOptions(getOptions(items));
  },[items]);

  useEffect( () =>{
    if (allAllocatedItems){
      if(items.length === 0) return;
      let currentAllocatedItemIds = clinicalItems.map(x=>x.ItemId);
      let allAllocatedItemIds = allAllocatedItems.map(x=>x.ItemId);
      let allAllocatedItemIdsExceptCurrent 
                      = allAllocatedItemIds
                        .filter(x =>!currentAllocatedItemIds.includes(x))

   let is = _.cloneDeep(items);
   let x = is.map((item) => {
        if (allAllocatedItemIdsExceptCurrent.includes(item.Id)) {
          let cI = allAllocatedItems.find(x=>x.ItemId === item.Id);
            return {...item, isAvailable: false, label: item.Code + ' ' 
                                    + moment(cI.StartDate).format('YYYY/MM/DD') + '-' 
                                    + moment(cI.EndDate).format('YYYY/MM/DD')};
        }else{
             return {...item, isAvailable: true, label: item.Code};
        }
      })
      //setItems(x);
      setOptions(getOptions(x));
      
    }
},[allAllocatedItems,clinicalItems,items]);
  
    useEffect(() => {
      if (startDate){
        let cIs = _.cloneDeep(clinicalItems);
        cIs.map((cI) => {
          return cI.StartDate = startDate
        });
        setClinicalItems(cIs);
      }
    }, [startDate]);

    useEffect(() => {
      if (endDate) {
        let cIs = _.cloneDeep(clinicalItems);
        cIs.map((cI) => {
          return cI.EndDate = endDate
        });
        setClinicalItems(cIs);
      }
    }, [endDate]);
    
       const updateStartDate = (date) => {
        setStartDate(date);
       }    
  
      const updateEndDate = (date) => {
        setEndDate(date);
      }
      
      const onChange = (selectedValues) => {
        let cItems = [...clinicalItems];
        let cItemIds = cItems.map(x => x.ItemId);

        let deletedItems = _.difference(cItemIds,selectedValues);
        cItems = cItems.filter(x=>!deletedItems.includes(x.ItemId) )

        let addedItems = _.difference(selectedValues,cItemIds);
        addedItems.map((id)=>{
         return cItems.push(
          {
            Id: 0, 
            ClinicalCategoryId: clinicalCategoryId,
            ItemId: id, 
            StartDate: startDate, 
            EndDate: endDate
          });
        })
        setClinicalItems(cItems);
        onSave(
          { UniqueId: selected.UniqueId, values: cItems});
      };
      
      const getOptions = (items) => {
        let is = _.cloneDeep(items);
          return is
            .map((i) => {
              return {label: i.label, isAvailable: i.isAvailable, value:i.Id}
        })
      }

    return (
        <Container>
        <h1>Clinical Item detail</h1>
          <div className = "header">
            <div>
              <Moment format="YYYY/MM/DD" date ={startDate}/> - 
              <Moment format="YYYY/MM/DD" date ={endDate}/>
          </div>
          <div>
            <DatePicker 
              selected={Date.parse(startDate)} 
              onChange={date => updateStartDate(date)} 
              disabled = {mode === "detail" ? true : false}/>
            <DatePicker 
              selected={Date.parse(endDate)} 
              onChange={date => updateEndDate(date)} 
              disabled = {mode === "detail" ? true : false}/>
          </div>
            </div>
          <div className = "mid">
  
            {options && clinicalItems && allAllocatedItems && 
            <ListDragAndDrop 
                options = {options} 
                selected = {clinicalItems?.map(x=>x.ItemId)} 
                onChange = {onChange}/>}
             
           
          </div>
          <div>
           
          </div>
        </Container>
    );
}

export default ClinicalItemDetail;