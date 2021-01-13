import { createAction, createSlice } from '@reduxjs/toolkit'
import { serviceGetVersion, serviceSaveVersion } from './service';
import { ProductService } from '../../Service/ProductService';

const productSrv = new ProductService();

export const versionReceived = createAction("version/Received");
export const versionSaved = createAction("version/Saved");

const  versionSlice = createSlice({
    name: 'version',
    initialState: productSrv.getNewVersion(),
    reducers: {
      updateVersion(version, action){
        return action.payload;
      },
      // updateImage(template, action){
      //   template.Base64 = action.payload
      // },  
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
     updateVersion } = versionSlice.actions
  export default versionSlice.reducer

 // Action Creators

  export const loadVersion = (id) => serviceGetVersion({
    data: id,
    onSuccess: versionReceived.type
  });

  export const SaveVersion = (suite) => serviceSaveVersion({
    data: suite,
    onSuccess: versionSaved.type
  });



  //createselector from reselect for cachng