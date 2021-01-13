import * as actions from '../../Product/service';
import { ProductService } from '../../../Service/ProductService';

const productService = ({ dispatch }) => next => async action => {
    let productSrv = null;
    const { data, onSuccess, onError } = action.payload?? {};
    if(data)
     productSrv = new ProductService(dispatch, onSuccess, onError);
    switch(action.type){
        case( actions.serviceGetSuite.type ):
            next(action);
           // productSrv = new ProductService(dispatch, onSuccess, onError);
            productSrv.getSuiteWithVersions(data)
        break; 
        case( actions.serviceSaveSuite.type ):
            next(action);
            
            //productSrv = new ProductService(dispatch, onSuccess, onError);
            productSrv.SaveSuiteWithDependents(data)
        break; 
        case( actions.serviceGetVersion.type ):
            next(action);

            //productSrv = new ProductService(dispatch, onSuccess, onError);
            productSrv.getVersionWithDependents(action.payload)
        break; 
        case( actions.serviceSaveVersion.type ):
            next(action);

            //productSrv = new ProductService(dispatch, onSuccess, onError);
            productSrv.SaveSuiteWithDependents(action.payload)
        break; 
        case( actions.serviceGetCode.type ):
            next(action);

            //productSrv = new ProductService(dispatch, onSuccess, onError);
            productSrv.getVersionWithDependents(action.payload)
        break; 
        case( actions.serviceSaveCode.type ):
            next(action);

            //productSrv = new ProductService(dispatch, onSuccess, onError);
            productSrv.SaveSuiteWithDependents(action.payload)
        break;
        case( actions.serviceGetCategory.type ):
            next(action);

            //productSrv = new ProductService(dispatch, onSuccess, onError);
            productSrv.getVersionWithDependents(action.payload)
        break; 
        case( actions.serviceSaveCategory.type ):
            next(action);

            //productSrv = new ProductService(dispatch, onSuccess, onError);
            productSrv.SaveSuiteWithDependents(action.payload)
        break; 
        
          default:   
        return next(action);
}
}

export default productService;