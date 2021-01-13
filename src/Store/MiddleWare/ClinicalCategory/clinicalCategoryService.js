import * as actions from '../../ClinicalCategory/service';
import { ClinicalCategoryService } from '../../../Service/ClinicalCategory';

const clinicalCategoryService = ({ dispatch }) => next => async action => {
    let srv = null;
    const { data, onSuccess, onError } = action.payload;
    switch(action.type){
        case( actions.serviceGetClinicalCategory.type ):
            next(action);
            srv = new ClinicalCategoryService(dispatch, onSuccess, onError);
            srv.getClinicalCategotyWithDependents(data)
        break; 
        case( actions.serviceSaveClinicalCategory.type ):
            next(action);
            
            srv = new ClinicalCategoryService(dispatch, onSuccess, onError);
            srv.SaveClinicalCategoryWithDependents(data)
        break; 
          default:   
        return next(action);
}
}

export default clinicalCategoryService;