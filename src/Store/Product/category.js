import { createAction, createSlice } from '@reduxjs/toolkit'
import { serviceGetCategory, serviceSaveCategory } from './service';
import { ProductService } from '../../Service/ProductService';

const productSrv = new ProductService();

export const categoryReceived = createAction("category/Received");
export const categorySaved = createAction("category/Saved");

const  categorySlice = createSlice({
    name: 'category',
    initialState: productSrv.getNewCategory(),
    reducers: {
      updateCategory(version, action){
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
     updateCategory } = categorySlice.actions
  export default categorySlice.reducer

 // Action Creators

  export const loadCategory = (id) => serviceGetCategory({
    data: id,
    onSuccess: categoryReceived.type
  });

  export const SaveCategory = (category) => serviceSaveCategory({
    data: category,
    onSuccess: categorySaved.type
  });



  //createselector from reselect for cachng