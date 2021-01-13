import { createSlice } from '@reduxjs/toolkit'
import { ProductService } from '../../Service/ProductService';

const productSrv = new ProductService();

const   originalCategorySlice = createSlice({
    name: 'originalCategory',
    initialState: productSrv.getNewVersion(),
    reducers: {
      updateOriginalCategory(errorString, action){
        return action.payload;
      },  
    },
  })
  
  export const { updateOriginalCategory } = originalCategorySlice.actions
  export default originalCategorySlice.reducer