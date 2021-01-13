import * as actions from '../../Item/service';
import { ItemService } from '../../../Service/ItemService';

const itemService = ({ dispatch }) => next => async action => {
    let itemSrv = null;
    const { data, onSuccess, onError } = action.payload;
    switch(action.type){
        case( actions.serviceGetItem.type ):
            next(action);
            itemSrv = new ItemService(dispatch, onSuccess, onError);
            itemSrv.getItem(data)
        break; 
        case( actions.serviceSaveItem.type ):
            next(action);
            
            itemSrv = new ItemService(dispatch, onSuccess, onError);
            itemSrv.SaveItem(data)
        break; 
          default:   
        return next(action);
}
}

export default itemService;