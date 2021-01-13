import { createAction, createSlice } from '@reduxjs/toolkit'
import { serviceGetSuite, serviceSaveSuite, serviceSaveSuiteVersion } from './service';
import { ProductService } from '../../Service/ProductService';

const productSrv = new ProductService();

export const suiteReceived = createAction("suite/suiteReceived");
export const suiteSaved = createAction("suite/suiteSaved");
export const suiteError = createAction("suite/suiteError");
export const suiteVersionSaved = createAction("suite/suiteVersionSaved");

const  suiteSlice = createSlice({
    name: 'suite',
    initialState: productSrv.getNewSuite(),
    reducers: {
      updateSuite(suite, action){
        return action.payload;
      },
      // updateVersion(suite, action){
      //   if (action.payload.Id) {
      //     let index = suite.Versions.findIndex(x => x.Id === action.payload.Id);
      //     if (index > 0) {
      //       suite.Versions[index] = action.payload
      //     }else{
      //      suite.Versions.push(action.payload)
      //     }
      //   }
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
     updateSuite, updateVersion } = suiteSlice.actions
  export default suiteSlice.reducer

 // Action Creators

  export const loadSuite = (id) => serviceGetSuite({
    data: id,
    onSuccess: suiteReceived.type,
    onError: suiteError.type
  });

  export const SaveSuite = (suite) => serviceSaveSuite({
    data: suite,
    onSuccess: suiteSaved.type
  });

  export const SaveSuiteVersion = (version) => serviceSaveSuiteVersion({
    data: version,
    onSuccess: suiteVersionSaved.type
  });



  //createselector from reselect for cachng