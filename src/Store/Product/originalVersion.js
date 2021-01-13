import { createSlice } from '@reduxjs/toolkit'
import { ProductService } from '../../Service/ProductService';

const productSrv = new ProductService();

const   originalVersionSlice = createSlice({
    name: 'originalVersion',
    initialState: productSrv.getNewVersion(),
    reducers: {
      updateOriginalVersion(errorString, action){
        return action.payload;
      },  
    },
  })
  
  export const { updateOriginalVersion } = originalVersionSlice.actions
  export default originalVersionSlice.reducer