import { combineReducers } from 'redux';
import suiteReducer  from './Product/suite';
import originalSuiteReducer from './Product/originalSuite';
import versionReducer  from './Product/version';
import originalVersionReducer from './Product/originalVersion';
//import CodeReducer  from './code';
import originalCodeReducer from './Product/originalCode';
//import CategoryReducer  from './category';
import originalCategoryReducer from './Product/originalCategory';
import FeatureReducer  from './Feature/feature';
import originalFeatureReducer from './Feature/originalFeature';
import ItemReducer  from './Item/item';
import originalItemReducer from './Item/originalItem';
import ClinicalCategoryReducer  from './ClinicalCategory/clinicalCategory';
import originalClinicalCategoryReducer from './ClinicalCategory/originalClinicalCategory';
//import selectedCellReducer  from './selectedCell';

//import  authReducer  from './auth';

export default combineReducers({
    suite: suiteReducer,
    originalSuite: originalSuiteReducer,
    version: versionReducer,
    originalVersion: originalVersionReducer,
    //code: CodeReducer,
    originalCode: originalCodeReducer,
   // category: CategoryReducer,
    originalCategory: originalCategoryReducer,
    feature: FeatureReducer,
    originalFeature: originalFeatureReducer,
    item: ItemReducer,
    originalItem: originalItemReducer,
    clinicalCategory: ClinicalCategoryReducer,
    originalClinicalCategory: originalClinicalCategoryReducer
    //selectedCell: selectedCellReducer
    
});