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