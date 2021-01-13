import { createAction, createSlice } from '@reduxjs/toolkit'
import { serviceGetCode, serviceSaveCode } from './service';
import { ProductService } from '../../Service/ProductService';

const productSrv = new ProductService();

export const codeReceived = createAction("code/Received");
export const codeSaved = createAction("code/Saved");

const  codeSlice = createSlice({
    name: 'code',
    initialState: productSrv.getNewCode(),
    reducers: {
      updateCode(version, action){
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
     updateCode } = codeSlice.actions
  export default codeSlice.reducer

 // Action Creators

  export const loadCode = (id) => serviceGetCode({
    data: id,
    onSuccess: codeReceived.type
  });

  export const SaveCode = (code) => serviceSaveCode({
    data: code,
    onSuccess: codeSaved.type
  });



  //createselector from reselect for cachng