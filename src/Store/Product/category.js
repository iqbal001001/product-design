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