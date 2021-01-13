import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateClinicalCategory,  SaveClinicalCategory } from "../Store/ClinicalCategory/clinicalCategory";
import styled from 'styled-components';
import _ from 'lodash'; 
import { AwesomeButton } from "react-awesome-button";
import ClinicalCategoryVersions from "./ClinicalCategoryVersions";
import { ClinicalCategoryService } from "../Service/ClinicalCategory";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ClinicalItemDetail from "./ClinicalItemDetail";
import ClinicalProductCategoryDetail from "./ClinicalProductCategoryDetail";
import ClinicalFeatureDetail from "./ClinicalFeatureDetail";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const SuiteStyle = styled.div`
    background: grey;
    max-height:100%;
    overflow-y:auto;
`
export const SuiteDetailStyle = styled.div`
    background: grey;
    display: flex;
`

export const InputBlockStyle = styled.div`
    background: green;
    max-height:100%;
    overflow-y:auto;
`

const Suite = ({children}) => {
    return (<SuiteStyle>{children}</SuiteStyle> );
}

const SuiteDetail = ({children}) => {
  return (<SuiteDetailStyle>{children}</SuiteDetailStyle> );
}

const InputBlock = ({children}) => {
  return (<InputBlockStyle>{children}</InputBlockStyle> );
}


const ClinicalCategoryEdit = ({ onSave}) => {
  const dispatch = useDispatch();
  //const clinicalCategorySrv =  new ClinicalCategoryService();
 // const [clinicalCategory, setClinicalCategory] = useState(clinicalCategorySrv.getNewClinicalCategory());
 const clinicalCategory =  useSelector(state => state.entities.clinicalCategory);
 const originalClinicalCategory =  useSelector(state => state.entities.originalClinicalCategory);
 const [isDirty, setIsDirty] = useState(false);
 const [isClinicalItemDirty, setIsClinicalItemDirty] = useState(false);
 const [isProductCategoryDirty, setIsProductCategoryDirty] = useState(false);
 const [isFeaturesDirty, setIsFeaturesDirty] = useState(false);
  // useEffect( () => {
  //   if (selected){
  //     setClinicalCategory(selected);
  //   }
  //  }, [selected]);

  useEffect( () =>{
    handleIsDirty();
},[clinicalCategory]);

const handleIsDirty = () =>{
  let cc = _.cloneDeep(clinicalCategory);
  let occ = _.cloneDeep(originalClinicalCategory);
  let pcs = _.sortBy(clinicalCategory.ClinicalProductCategories, function(i) { 
    return i.Id; 
    })
    .map((i) => {
          return  {
              ClinicalCategoryId : i.ClinicalCategoryId,
                  StartDate : i.StartDate,
                  EndDate : i.EndDate,
                  ProductCategoryId : i.ProductCategoryId
              }
      })
  let opcs = _.sortBy(originalClinicalCategory.ClinicalProductCategories, function(i) { 
    return i.Id; 
    })
    .map((i) => {
      return  {
          ClinicalCategoryId : i.ClinicalCategoryId,
          StartDate : i.StartDate,
          EndDate : i.EndDate,
          ProductCategoryId : i.ProductCategoryId
      }
  })

 let cis = _.sortBy(clinicalCategory.ClinicalItems, function(i) { 
    return i.Id; 
    })
    .map((i) => {
          return  {
              ClinicalCategoryId : i.ClinicalCategoryId,
                  StartDate : i.StartDate,
                  EndDate : i.EndDate,
                  ItemId : i.ItemId
              }
      })
  let ocis = _.sortBy(originalClinicalCategory.ClinicalItems, function(i) { 
    return i.Id; 
    })
    .map((i) => {
      return  {
          ClinicalCategoryId : i.ClinicalCategoryId,
          StartDate : i.StartDate,
          EndDate : i.EndDate,
          ItemId : i.ItemId
      }
  })

  let cfs = _.sortBy(clinicalCategory.Features, function(i) { 
    return i.Id; 
    });

    let ocfs = _.sortBy(originalClinicalCategory.Features, function(i) { 
      return i.Id; 
      })

  cc.ClinicalItems = cis;
  occ.ClinicalItems = ocis;

  cc.ClinicalProductCategories = pcs;
  occ.ClinicalProductCategories = opcs;

  cc.Features = cfs;
  occ.Features = ocfs;

      let isDirtyItems = !_.isEqual(cis, ocis);
      let isDirtFeatrues = !_.isEqual(cfs, ocfs);
      let isDirtProductCategories = !_.isEqual(pcs, opcs);
      let isDirtTemplate = !_.isEqual(cc, occ);

      setIsClinicalItemDirty(isDirtyItems);
      setIsProductCategoryDirty(isDirtProductCategories);
      setIsFeaturesDirty(isDirtFeatrues);
      setIsDirty(isDirtTemplate);
}

   const onClinicalItemsSave = (vs) => {
     let cC = _.cloneDeep(clinicalCategory);

    cC.ClinicalItems = [].concat.apply([], Object.values(vs));
    // setClinicalCategory(cC);
    dispatch(updateClinicalCategory(cC));
   }

   const onClincalProductCategoriesSave = (vs) => {
    let cC = _.cloneDeep(clinicalCategory);

   cC.ClinicalProductCategories = [].concat.apply([], Object.values(vs));
   dispatch(updateClinicalCategory(cC));
  }

  const onClincalFeaturesSave = (features) =>{
    let cC = _.cloneDeep(clinicalCategory);

    cC.Features = features;
    dispatch(updateClinicalCategory(cC));
  }

   const updateCCCode = (value) => {
    let cc = {...clinicalCategory, Code : value}
    dispatch(updateClinicalCategory(cc));
   }

   const updateCCName = (value) => {
    let cc = {...clinicalCategory, Name : value}
    dispatch(updateClinicalCategory(cc));
  }

  const Save = async() => {
    dispatch(SaveClinicalCategory(clinicalCategory));
    //         let cC = await onSave(clinicalCategory);
    //  setClinicalCategory(cC);
  }

  return (
    <React.Fragment> 
      <Container>
        <h1>Clinical Category Edit</h1>
        <Suite>
          <h1>Clinical Category - {clinicalCategory.Code}</h1>
         <SuiteDetail>
         <InputBlock>
              <span>Code</span>
              <input
                type="text"
                value={clinicalCategory.Code}
                onChange={e => updateCCCode(e.target.value)}
              />
            </InputBlock>
          <InputBlock>
              <span>Name</span>
              <input
                type="text"
                value={clinicalCategory.Name}
                onChange={e => updateCCName(e.target.value)}
              />
            </InputBlock>
              {isDirty && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    Save();
                  }}
                  >
                  {clinicalCategory.Id !== 0? "Save" : "Create"}
        </AwesomeButton>}
         </SuiteDetail>
        </Suite>
        <Tabs forceRenderTabPanel={"false"}>
    <TabList >
                <Tab>Item{isClinicalItemDirty && <span>*</span>}</Tab>
                <Tab>Product Category{isProductCategoryDirty && <span>*</span>}</Tab>
                <Tab>Features{isFeaturesDirty && <span>*</span>}</Tab>
    </TabList>

    <TabPanel show={"true"}>
    <ClinicalCategoryVersions
            selectedId ={clinicalCategory.Id}
            selectedItems ={clinicalCategory.ClinicalItems} 
            onSave = {onClinicalItemsSave}
            detailComponent = {<ClinicalItemDetail/>}
        />
    </TabPanel>
    <TabPanel>
    <ClinicalCategoryVersions
            selectedId ={clinicalCategory.Id}
            selectedItems ={clinicalCategory.ClinicalProductCategories} 
            onSave = {onClincalProductCategoriesSave}
            detailComponent = {<ClinicalProductCategoryDetail/>}
        />
    </TabPanel>
    <TabPanel>
    <ClinicalFeatureDetail
            selectedId ={clinicalCategory.Id}
            selectedItems ={clinicalCategory.Features} 
            onSave = {onClincalFeaturesSave}
        />
    </TabPanel>
  </Tabs>
        
      </Container>
    </React.Fragment>
  );
};

export default ClinicalCategoryEdit;

