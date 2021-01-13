import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AwesomeButton } from "react-awesome-button";
import _ from 'lodash';
import "react-datepicker/dist/react-datepicker.css";
import ClinicalProductCategoryDetail from './ClinicalProductCategoryDetail';

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

const ClinicalProductCategoryDetailData = ({mode, allAllocatedItems, selected, onSave}) => {
    const [clinicalItems, setClinicalItems] = useState([]);
    const [originalClinicalItems, setOriginalClinicalItems] = useState([]);
    const [isDirty, setIsDirty] = useState(false);

    const clinicalCategorySrv = new ClinicalCategoryService();

    useEffect(() =>{
        if(selected){
            setClinicalItems(selected.values);
            setOriginalClinicalItems(selected.values);
        }
    },[selected]);

  useEffect( () =>{
    handleIsDirty();
},[clinicalItems]);


       const SaveClinicalItem =  async() => {
        let data = selected.UniqueId?.split('|');
        let startDate = data[0];
        let endDate = data[1];
        let clinicalCategoryId = data[2];

           console.log(clinicalItems)
           let group = null;
           if(clinicalCategoryId === "0") {
            group = {Items : clinicalItems}
           }else{
            group = await clinicalCategorySrv.SaveProductCategories({
              ClinicalCategoryId:clinicalCategoryId,
              StartDate: startDate,
              EndDate: endDate,
              ClinicalProductCategories :clinicalItems
             });
           }
         
         console.log(group);

      group && onSave(
        { UniqueId: selected.UniqueId, values: group.Items});
      group && setOriginalClinicalItems(group.Items);
      group && setClinicalItems(group.Items);
      

      }

      const onChangeItem = (version) => {
        setClinicalItems(version.values)
      }

      const handleIsDirty = () =>{

        let items = clinicalItems.map((i) => {
                return  {
                    ClinicalCategoryId : i.ClinicalCategoryId,
                        StartDate : i.StartDate,
                        EndDate : i.EndDate,
                        ProductCategoryId : i.ProductCategoryId
                    }
            })
        let oItems = originalClinicalItems.map((i) => {
            return  {
                ClinicalCategoryId : i.ClinicalCategoryId,
                StartDate : i.StartDate,
                EndDate : i.EndDate,
                ProductCategoryId : i.ProductCategoryId
            }
        })
            let isDirtTemplate = !_.isEqual(items, oItems);

        setIsDirty(isDirtTemplate);
     }

    return (
        <Container>
        <h1>Clinical Product Category detail</h1>
        {isDirty && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveClinicalItem();
                  }}
                  >
                  {true? "Save" : "Create"}
        </AwesomeButton>}
        <ClinicalProductCategoryDetail mode ={mode} 
                                        allAllocatedItems={allAllocatedItems} 
                                        selected ={selected}
                                        onChange = {onChangeItem}
                                        />
        </Container>
    );
}

export default ClinicalProductCategoryDetailData;