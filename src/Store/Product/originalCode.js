import { createSlice } from '@reduxjs/toolkit'
import { ProductService } from '../../Service/ProductService';

const productSrv = new ProductService();

const   originalCodeSlice = createSlice({
    name: 'originalCode',
    initialState: productSrv.getNewVersion(),
    reducers: {
      updateOriginalCode(errorString, action){
        return action.payload;
      },  
    },
  })
  
  export const { updateOriginalCode } = originalCodeSlice.actions
  export default originalCodeSlice.reducer