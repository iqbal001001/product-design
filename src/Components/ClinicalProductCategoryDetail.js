import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AwesomeButton } from "react-awesome-button";
import Moment from 'react-moment';
import moment from 'moment';
import ListDragAndDrop from './dnd/ListDragAndDrop';
import DatePicker from "react-datepicker";
import _ from 'lodash';
import "react-datepicker/dist/react-datepicker.css";


import { ClinicalCategoryService } from "../Service/ClinicalCategory";
import { ProductService } from "../Service/ProductService";

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

const ClinicalProductCategoryDetail = ({mode, allAllocatedItems, selected, onSave}) => {
    const [clinicalCategoryId, setClinicalCategoryId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
     const [clinicalItems, setClinicalItems] = useState([]);
    // const [originalClinicalItems, setOriginalClinicalItems] = useState([]);
    const [items, setItems] = useState([]);
    const [options, setOptions] = useState([]);

    const productSrv = new ProductService();
    //const clinicalCategorySrv = new ClinicalCategoryService();

    useEffect(() =>{
        if(selected){
            let date = selected.UniqueId?.split('|');
            if(date){
                setStartDate(date[0]);
                setEndDate(date[1]);
                setClinicalCategoryId(date[2]);
            }
             setClinicalItems(selected.values);
            // setOriginalClinicalItems(selected.values);
        }
    },[selected]);

    useEffect( () =>{
      loadItems();
    },[allAllocatedItems]);

   useEffect( () =>{
         setOptions(getOptions(items));
  },[items]);

//   useEffect( () =>{
//     handleIsDirty();
// },[clinicalItems]);

  useEffect( () =>{
    if (allAllocatedItems){
      if(items.length === 0) return;
      let currentAllocatedItemIds = clinicalItems.map(x=>x.ProductCategoryId);
      let allAllocatedItemIds = allAllocatedItems.map(x=>x.ProductCategoryId);
      let allAllocatedItemIdsExceptCurrent 
                      = allAllocatedItemIds
                        .filter(x =>!currentAllocatedItemIds.includes(x))

   let is = _.cloneDeep(items);
   let x = is.map((item) => {
       let cI = allAllocatedItems.find(x=>x.ProductCategoryId === item.Id);
        if (allAllocatedItemIdsExceptCurrent.includes(item.Id) 
            && (cI.StartDate !== startDate && cI.EndDate !== endDate)) {
                return {...item, isAvailable: false, label: item.Name + ' ' 
                                    + moment(cI.StartDate).format('YYYY/MM/DD') + '-' 
                                    + moment(cI.EndDate).format('YYYY/MM/DD')};
        }else{
                return {...item, isAvailable: true, label: item.Name};
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
    
       const loadItems = async() => {
      let items = await productSrv.getProductCategories();
            let is = items.map((item) => {
              return {...item, isAvailable: true, label: item.Name}
            })
                        setItems(is);
          //  setOptions(getOptions(is));
    }

      //  const SaveClinicalItem =  async() => {
      //      console.log(clinicalItems)
      //      let group = null;
      //      if(clinicalCategoryId === "0") {
      //       group = {Items : clinicalItems}
      //      }else{
      //       group = await clinicalCategorySrv.SaveProductCategories({
      //         ClinicalCategoryId:clinicalCategoryId,
      //         StartDate: startDate,
      //         EndDate: endDate,
      //         ClinicalProductCategories :clinicalItems
      //        });
      //      }
         
      //    console.log(group);

      //     group && onSave(
      //       { UniqueId: selected.UniqueId, values: group.Items});
      //     group && setOriginalClinicalItems(group.Items);
      //     group && setClinicalItems(group.Items);
      

      //  }

       const updateStartDate = (date) => {
        setStartDate(date);
       }    
  
      const updateEndDate = (date) => {
        setEndDate(date);
      }
      
      const onItemChange = (selectedValues) => {
        let cItems = [...clinicalItems];
        let cItemIds = cItems.map(x => x.ProductCategoryId);

        let deletedItems = _.difference(cItemIds,selectedValues);
        cItems = cItems.filter(x=>!deletedItems.includes(x.ProductCategoryId) )

        let addedItems = _.difference(selectedValues,cItemIds);
        addedItems.map((id)=>{
         return cItems.push(
          {
            Id: 0, 
            ClinicalCategoryId: clinicalCategoryId * 1,
            ProductCategoryId: id * 1, 
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

    //   const handleIsDirty = () =>{
    //     let isDirtTemplate = !_.isEqual(clinicalItems, originalClinicalItems);

    //    setIsDirty(isDirtTemplate);
    //  }

    return (
        <Container>
        <h1>Clinical Product Category detail</h1>
        {/* {isDirty && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveClinicalItem();
                  }}
                  >
                  {true? "Save" : "Create"}
        </AwesomeButton>} */}


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
                selected = {clinicalItems?.map(x=>x.ProductCategoryId)} 
                onChange = {onItemChange}/>}
             
           
          </div>
          <div>
           
          </div>
        </Container>
    );
}

export default ClinicalProductCategoryDetail;