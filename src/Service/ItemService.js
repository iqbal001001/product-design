import item from "../data/Item";

import * as apiAction from '../Store/api'
import { v4 as uuidv4 } from 'uuid';

export class ItemService {
  constructor(dispatch, onSuccess, onError) {
    this.dispatch = dispatch;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  getItems = async() => {
    try {
      let response = await item.getDataList();
      return response.data;
    } catch(err) {
            if (err.response) {
               // setError("Failure "+ err.response.status);
            } else if (err.request) {
               // setError("client never received a response, or request never left");
            } else {
              // anything else
            }
    }
}

  getItem = async(id) => {
  try {
      let response = await item.getData(id);
      if (this.dispatch)
        this.dispatch(apiAction.apiCallSuccess(response.data));
        if (this.onSuccess)
        this.dispatch({ type: this.onSuccess, payload: response.data });
        return response.data;
      } catch(err) {
        if (err.response) {
         if (this.onError) this.dispatch({ type: this.onError, payload: err.response});
         } else if (err.request) {
           if (this.onError) this.dispatch({ type: this.onError, payload: err.request});
         } else {
           // anything else
         }
 }
}

  getNewItem = () => {
    return {
        Id: 0,
        UniqueId: uuidv4().toString(),
    };
}


    SaveItem = async (cc) => {
    try {
        let response = await item.postData(cc);
        if (this.dispatch)
        this.dispatch(apiAction.apiCallSuccess(response.data));
        if (this.onSuccess)
        this.dispatch({ type: this.onSuccess, payload: response.data });
        return response.data;
      } catch(err) {
        if (err.response) {
         if (this.onError) this.dispatch({ type: this.onError, payload: err.response});
         } else if (err.request) {
           if (this.onError) this.dispatch({ type: this.onError, payload: err.request});
         } else {
           // anything else
         }
        }
      }
}
