import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AwesomeButton } from "react-awesome-button";
import ClinicalItemDetail from './ClinicalItemDetail';
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

const ClinicalItemDetailData = ({mode, allAllocatedItems, selected, onSave}) => {
  const clinicalCategorySrv = new ClinicalCategoryService();
  const itemSrv = new ItemService();

    const [clinicalCategoryId, setClinicalCategoryId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [clinicalItems, setClinicalItems] = useState([]);
    const [originalClinicalItems, setOriginalClinicalItems] = useState([]);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() =>{
        if(selected){
            let date = selected.UniqueId?.split('|');
            if(date){
                setStartDate(date[0]);
                setEndDate(date[1]);
                setClinicalCategoryId(date[2]);
            }
            setClinicalItems(selected.values);
            setOriginalClinicalItems(selected.values);
        }
    },[selected]);
 
  useEffect( () =>{
    handleIsDirty();
},[clinicalItems]);


       const SaveClinicalItem =  async() => {
           console.log(clinicalItems)
           let group = null;
           if(clinicalCategoryId === "0") {
            group = {ClinicalItems : clinicalItems}
           }else{
            group = await clinicalCategorySrv.SaveItems({
              ClinicalCategoryId:clinicalCategoryId,
              StartDate: startDate,
              EndDate: endDate,
              ClinicalItems :clinicalItems
             });
           }
         
         console.log(group);

      group && onSave(
        { UniqueId: selected.UniqueId, values: group.ClinicalItems});
      group && setOriginalClinicalItems(group.ClinicalItems);
      group && setClinicalItems(group.ClinicalItems);
      

       }

       const onChange = (version) => {
        setClinicalItems(version.values);
       }

      const handleIsDirty = () =>{
        let isDirtTemplate = !_.isEqual(clinicalItems, originalClinicalItems);

       setIsDirty(isDirtTemplate);
     }

    return (
        <Container>
        <h1>Clinical Item detail</h1>
        {isDirty && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveClinicalItem();
                  }}
                  >
                  {true? "Save" : "Create"}
        </AwesomeButton>}
        <ClinicalItemDetail 
            mode ={mode}
            allAllocatedItems = {allAllocatedItems}
            selected = {selected}
            onSave={onChange}/>
        </Container>
    );
}

export default ClinicalItemDetailData;