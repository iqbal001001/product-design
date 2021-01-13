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
      // updateName(template, action){
      //   template.Name = action.payload
      // }, 
      // updateVersion(suite, action){
      //   suite.Layout.Version = action.payload
      // }, 
      // updateLayout(template, action){
      //   template.Layout = action.payload
      // },  
      // addItem(template, action) {
      //   template.Layout.Setting.CellData
      //   .push({ ...action.payload, Id : id++})
      // },
      // updateItem(template, action) {
      //   let index = template.Layout.Setting.CellData
      //       .findIndex(c => c.Id === action.payload.Id);
      //   template.Layout.Setting.CellData[index] = action.payload;
      // },
      // updateItems(template, action) {
      //   template.Layout.Setting.CellData = action.payload;
      // },
      // removeItem(template, action) {
      //   let index = template.Layout.Setting.CellData
      //   .findIndex(c => c.Id === action.payload);
      //    template.Layout.Setting.CellData.splice(index,1)
      // },
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