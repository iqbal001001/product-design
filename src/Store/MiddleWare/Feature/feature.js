import * as actions from '../../Feature/feature';
import { updateOriginalFeature } from '../../Feature/originalFeature';

const feature = ({ dispatch }) => next => async action => {
    switch(action.type){
        case( actions.featureReceived.type ):
        case( actions.featureSaved.type ):
            next(action);

            dispatch(updateOriginalFeature(action.payload));
            dispatch(actions.updateFeature(action.payload));
        break; 
        
          default:   
        return next(action);
    }
}

export default feature;