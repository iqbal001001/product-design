import * as actions from '../../Item/item';
import { updateOriginalItem } from '../../Item/originalItem';

const item = ({ dispatch }) => next => async action => {
    switch(action.type){
        case( actions.itemReceived.type ):
        case( actions.itemSaved.type ):
            next(action);

            dispatch(actions.updateItem(action.payload));
            dispatch(updateOriginalItem(action.payload));
        break; 
        
          default:   
        return next(action);
    }
}

export default item;