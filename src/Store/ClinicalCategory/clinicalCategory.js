import { createAction, createSlice } from '@reduxjs/toolkit'
import { serviceGetClinicalCategory, serviceSaveClinicalCategory } from './service';
import { ClinicalCategoryService } from '../../Service/ClinicalCategory';

const CCSrv = new ClinicalCategoryService();

export const clinicalCategoryReceived = createAction("cc/clinicalCategoryReceived");
export const clinicalCategorySaved = createAction("cc/clinicalCategorySaved");

const  clinicalCategorySlice = createSlice({
    name: 'clinicalCategory',
    initialState: CCSrv.getNewClinicalCategory(),
    reducers: {
      updateClinicalCategory(cc, action){
        return action.payload;
      },
      updateClinicalItems(cc, action){
        cc.ClinicalItems = action.payload
      },  
      updateFeatures(cc, action){
        cc.Features = action.payload
      },  
    },
  })
  
  export const {
    updateClinicalCategory, updateClinicalItems, updateFeatures} = clinicalCategorySlice.actions
  export default clinicalCategorySlice.reducer

 // Action Creators

  export const loadClinicalCategory = (id) => serviceGetClinicalCategory({
    data: id,
    onSuccess: clinicalCategoryReceived.type
  });

  export const SaveClinicalCategory = (CC) => serviceSaveClinicalCategory({
    data: CC,
    onSuccess: clinicalCategorySaved.type
  });



  //createselector from reselect for cachng