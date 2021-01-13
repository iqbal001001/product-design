import { combineReducers } from 'redux';
 import  entitiesReducer  from './entities';
 import  errorStringReducer  from './error';
 import  isLoadingReducer  from './isLoading';
// import  isDirtyReducer from './isDirty';

export default combineReducers({
     entities: entitiesReducer,
     errorString: errorStringReducer,
     isLoading: isLoadingReducer,
    // isDirty: isDirtyReducer
});