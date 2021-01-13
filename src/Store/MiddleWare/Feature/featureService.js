import * as actions from '../../Feature/service';
import { FeatureService } from '../../../Service/FeatureService';

const featureService = ({ dispatch }) => next => async action => {
    let srv = null;
    const { data, onSuccess, onError } = action.payload;
    switch(action.type){
        case( actions.serviceGetFeature.type ):
            next(action);
            srv = new FeatureService(dispatch, onSuccess, onError);
            srv.getFeatureWithDependents(data)
        break; 
        case( actions.serviceSaveFeature.type ):
            next(action);
            
            srv = new FeatureService(dispatch, onSuccess, onError);
            srv.SaveFeatureWithItems(data)
        break; 
          default:   
        return next(action);
}
}

export default featureService;