import * as actions from '../error';

const errorString = ({ getState, dispatch }) => next => async action => {
 if (action.type !== actions.setErrorString.type) return next(action);

 if (action.payload !== getState().errorString ) return next(action);
 
}

export default errorString;