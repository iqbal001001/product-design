import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import ClinicalFeatureDetail from './ClinicalFeatureDetail';

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

const ClinicalFeatureDetailData = ({selectedId, selectedItems, onSave}) => {
  const featureSrv = new FeatureService();
  const [clinicalCategoryId, setClinicalCategoryId] = useState(null);
  //const clinicalCategoryId = useSelector(state => state.entities.clinicalCategory.Id);
  const [clinicalFeatures, setClinicalFeatures] = useState([]);
  const [originalClinicalFeatures, setOriginalClinicalFeatures] = useState([]);
  //const clinicalFeatures = useSelector(state => state.entities.clinicalCategory.Features);
  //const originalClinicalFeatures = useSelector(state => state.entities.originalClinicalCategory.Features);
  const [isDirty, setIsDirty] = useState(false);

  useEffect( () => {
    if(selectedId){
        setClinicalCategoryId(selectedId);
    } 
   },[selectedId]);

   useEffect( () => {
    if(selectedItems){
        setClinicalFeatures(selectedItems); 
        setOriginalClinicalFeatures(selectedItems);
    } 
   },[selectedItems]);

    useEffect( () =>{
        handleIsDirty();
    },[clinicalFeatures]);

const handleIsDirty = () =>{

    // let items = clinicalFeatures.map((i) => {
    //         return  {
    //             ClinicalCategoryId : i.ClinicalCategoryId,
    //                 StartDate : i.StartDate,
    //                 EndDate : i.EndDate,
    //                 ProductCategoryId : i.ProductCategoryId
    //             }
    //     })
    // let oItems = originalClinicalItems.map((i) => {
    //     return  {
    //         ClinicalCategoryId : i.ClinicalCategoryId,
    //         StartDate : i.StartDate,
    //         EndDate : i.EndDate,
    //         ProductCategoryId : i.ProductCategoryId
    //     }
    // })
        let isDirtyFeatures = !_.isEqual(clinicalFeatures, originalClinicalFeatures);

    setIsDirty(isDirtyFeatures);
}
   const Save =  async() => {
    console.log(clinicalCategoryId);
 
    let cFs = await featureSrv.SaveFeatures(clinicalFeatures);

        onSave(cFs);
    
  }

  

  return (
    <React.Fragment> 
      <Container>
        <h1>Item Edit</h1>
        {isDirty && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    Save();
                  }}
                  >
                  Save
        </AwesomeButton>
        }

<ClinicalFeatureDetail/>
      </Container>
    </React.Fragment>
  );
};

export default ClinicalFeatureDetailData;

