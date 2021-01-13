import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadClinicalCategory,  SaveClinicalCategory } from "../Store/ClinicalCategory/clinicalCategory";
import styled from 'styled-components';
import _ from 'lodash'; 
import ClinicalCategoryEdit from "./ClinicalCategoryEdit";
import { useParams } from 'react-router-dom';
//import { ClinicalCategoryService }from "../Service/ClinicalCategory";
import { useLocation, useHistory } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductEditData = () => {
 // const ClinicalCategorySrv = new ClinicalCategoryService();

  //const [clinicalCategory, setClinicalCategory] = useState(ClinicalCategorySrv.getNewClinicalCategory());
  const clinicalCategory =  useSelector(state => state.entities.clinicalCategory);
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const { Id } = useParams();

  // useEffect( () => {
  //   selectedItem && onItemSave(selectedItem)
  //  }, [selectedItem]);

  useEffect( () => {
    LoadClinicalItem()
   }, []);

   useEffect( () => {
    if (clinicalCategory && clinicalCategory.Id > 0 && Id === "new"){
      let newLocation = location.pathname.replace("/new", "/" + clinicalCategory.Id );
           history.push(newLocation);
    }
   }, [clinicalCategory]);

   const LoadClinicalItem = async() => {
    
    let cc = {};
    if (Id === "new"){
     // cc = ClinicalCategorySrv.getNewClinicalCategory();
    }else{
     // let ccList = await ClinicalCategorySrv.getClinicalCategotyWithDependents(Id);
      // if (ccList.length === 0) return; 
      // cc = ccList[0];
      dispatch(loadClinicalCategory(Id));
    }
   // setClinicalCategory(cc);
     
   }

  // const Save = async(clinialCategory) => {
  //   // let cC = {};
  //   //   if (clinialCategory.Id === 0){
  //   //     // cC = await ClinicalCategorySrv.SaveClinicalCategoryWithDependents(clinialCategory);
  //   //      dispatch(SaveClinicalCategory(clinialCategory));
  //   //     let newLocation = location.pathname.replace("/new", "/" + cC.Id );
  //   //     history.push(newLocation);
  //   //   }else{
  //   //     // cC = await ClinicalCategorySrv.SaveClinicalCategoryWithDependents(
  //   //     //     {...clinialCategory, ClinicalItems: [], ProductCategories: [], Features: []});
  //   //     dispatch(SaveClinicalCategory({...clinialCategory, ClinicalItems: [], ProductCategories: [], Features: []}));
  //   //   }
  //   //   //setClinicalCategory(cC);
  //   //   return cC;
  //   dispatch(SaveClinicalCategory(clinialCategory));
  // }

  return (
    <React.Fragment> 
      <Container>
        <ClinicalCategoryEdit/>
      </Container>
    </React.Fragment>
  );
};

export default ProductEditData;

