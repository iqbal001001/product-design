import _ from 'lodash'; 
import * as suiteActions from '../../Product/suite';
import * as versionActions from '../../Product/version';
import * as codeActions from '../../Product/code';
import * as categoryActions from '../../Product/category';
import * as error from '../../error';
import { updateOriginalSuite } from '../../Product/originalSuite';
import { updateOriginalVersion } from '../../Product/originalVersion';
import { updateOriginalCode } from '../../Product/originalCode';
import { updateOriginalCategory } from '../../Product/originalCategory';

const product = (store) => next => async action => {
    switch(action.type){
        //  case( versionActions.updateVersion.type):
        //      next(action);
        //      let state = store.getState();
        //      let suite = _.cloneDeep(state.entities.suite);
        //      if (action.payload.Id && 
        //         action.payload.Mode && !(action.payload.Mode === "new" && action.payload.Mode === "clone")) {
        //         let index = suite.Versions.findIndex(x => x.Id === action.payload.Id);
        //         if (index > -1) {
        //             suite.Versions[index] = action.payload
        //         }else{
        //             suite.Versions.push(action.payload)
        //         }
        //         if (!_.isEqual(state.entities.suite, suite))
        //             store.dispatch(suiteActions.updateSuite(suite));
        //       }
        //  break;
        case( suiteActions.suiteReceived.type ):
        case( suiteActions.suiteSaved.type ):
            next(action);

            store.dispatch(updateOriginalSuite(action.payload));
            store.dispatch(suiteActions.updateSuite(action.payload));
        break; 
        case( versionActions.versionReceived.type ):
        case( versionActions.versionSaved.type ):
            next(action);

            store.dispatch(updateOriginalVersion(action.payload));
            store.dispatch(versionActions.updateVersion(action.payload));
        break; 
        case( codeActions.codeReceived.type ):
        case( codeActions.codeSaved.type ):
            next(action);

            store.dispatch(updateOriginalCode(action.payload));
            store.dispatch(codeActions.updateCode(action.payload));
        break; 
        case( categoryActions.categoryReceived.type ):
        case( categoryActions.categorySaved.type ):
            next(action);

            store.dispatch(updateOriginalCategory(action.payload));
            store.dispatch(categoryActions.updateCategory(action.payload));
        break; 
        case( suiteActions.suiteError.type ):
            next(action);

            store.dispatch(error.setErrorString(action.payload));
        break; 
        
          default:   
        return next(action);
}
}

export default product;