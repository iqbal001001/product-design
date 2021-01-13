import { createSlice } from '@reduxjs/toolkit'
import { FeatureService } from '../../Service/FeatureService';

const itemSrv = new FeatureService();

const   originalFeatureSlice = createSlice({
    name: 'originalFeature',
    initialState: itemSrv.getNewFeature(),
    reducers: {
      updateOriginalFeature(errorString, action){
        return action.payload;
      },  
    },
  })
  
  export const { updateOriginalFeature } = originalFeatureSlice.actions
  export default originalFeatureSlice.reducer