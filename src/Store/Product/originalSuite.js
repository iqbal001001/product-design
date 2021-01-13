import { createSlice } from '@reduxjs/toolkit'
import { ProductService } from '../../Service/ProductService';

const productSrv = new ProductService();

const   originalSuiteSlice = createSlice({
    name: 'originalSuite',
    initialState: productSrv.getNewSuite(),
    reducers: {
      updateOriginalSuite(errorString, action){
        return action.payload;
      },  
    },
  })
  
  export const { updateOriginalSuite } = originalSuiteSlice.actions
  export default originalSuiteSlice.reducer