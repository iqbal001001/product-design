import * as actions from '../../ClinicalCategory/clinicalCategory';
import { updateOriginalClinicalCategory } from '../../ClinicalCategory/originalClinicalCategory';

const clinicalCategory = ({ dispatch }) => next => async action => {
    switch(action.type){
        case( actions.clinicalCategoryReceived.type ):
        case( actions.clinicalCategorySaved.type ):
            next(action);

            dispatch(updateOriginalClinicalCategory(action.payload));
            dispatch(actions.updateClinicalCategory(action.payload));
        break; 
        
          default:   
        return next(action);
    }
}

export default clinicalCategory;