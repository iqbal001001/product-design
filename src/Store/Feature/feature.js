import { createAction, createSlice } from '@reduxjs/toolkit'
import { serviceGetFeature, serviceSaveFeature } from './service';
import { FeatureService } from '../../Service/FeatureService';

const featureSrv = new FeatureService();

export const featureReceived = createAction("feature/featureReceived");
export const featureSaved = createAction("feature/featureSaved");

const  featureSlice = createSlice({
    name: 'feature',
    initialState: featureSrv.getNewFeature(),
    reducers: {
      updateFeature(feature, action){
        return action.payload;
      },
    },
  })
  
  export const {
    updateFeature } = featureSlice.actions
  export default featureSlice.reducer

 // Action Creators

  export const loadFeature = (id) => serviceGetFeature({
    data: id,
    onSuccess: featureReceived.type
  });

  export const saveFeature = (feature) => serviceSaveFeature({
    data: feature,
    onSuccess: featureSaved.type
  });



  //createselector from reselect for cachng