import cC from "../data/ClinicalCategory";
import cI from "../data/ClinicalItem";
import cPC from "../data/ClinicalProductCategory";

import * as apiAction from '../Store/api'

import { v4 as uuidv4 } from 'uuid';

export class ClinicalCategoryService {
  constructor(dispatch, onSuccess, onError) {
    this.dispatch = dispatch;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  getClinicalCategories = async() => {
    try {
      let response = await cC.getDataList();
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


  getClinicalCategotyWithItems = async(id) => {
  try {
    let response = await cC.getItemsData(id);
    //return response.data;
    if (this.dispatch)
    this.dispatch(apiAction.apiCallSuccess(response.data));
    if (this.onSuccess)
    this.dispatch({ type: this.onSuccess, payload: response.data });
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

  getClinicalCategotyWithDependents = async(id) => {
  try {
    let response = await cC.getDependentsData(id);
    //return response.data;
    if (this.dispatch)
    this.dispatch(apiAction.apiCallSuccess(response.data[0]));
    if (this.onSuccess)
    this.dispatch({ type: this.onSuccess, payload: response.data[0] });
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


  getNewClinicalCategory = () => {
    return {
        Id: 0,
        UniqueId: uuidv4().toString(),
        Code: '',
        Name: '',
        ClinicalItems: [],
        ClinicalProductCategories: []
    };
}

  getNewClinicalItem = () => {
  return {
      Id: 0,
      UniqueId: uuidv4().toString(),
  };
}

  getNewClinicalproductCategory = () => {
  return {
      Id: 0,
      UniqueId: uuidv4().toString(),
  };
}

  SaveClinicalCategory = async (cc) => {
    try {
        let response = await cC.postData(cc);
        //return response.data;
        if (this.dispatch)
        this.dispatch(apiAction.apiCallSuccess(response.data));
        if (this.onSuccess)
        this.dispatch({ type: this.onSuccess, payload: response.data });
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

DeleteClinicalCategory = async (id) => {
  try {
      let response = await cC.removeData(id);
      //return response.data;
      if (this.dispatch)
      this.dispatch(apiAction.apiCallSuccess(response.data));
      if (this.onSuccess)
      this.dispatch({ type: this.onSuccess, payload: response.data });
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

  SaveClinicalCategoryWithClinicalItems = async (cc) => {
  try {
      let response = await cC.postDataWithClinicalItems(cc);
      //return response.data;
      if (this.dispatch)
      this.dispatch(apiAction.apiCallSuccess(response.data));
      if (this.onSuccess)
      this.dispatch({ type: this.onSuccess, payload: response.data });
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

  SaveClinicalCategoryWithDependents = async (cc) => {
  try {
      let response = await cC.postDataWithDependents(cc);
      //return response.data;
      if (this.dispatch)
      this.dispatch(apiAction.apiCallSuccess(response.data));
      if (this.onSuccess)
      this.dispatch({ type: this.onSuccess, payload: response.data });
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


  SaveClinicalItem = async (item) => {
  try {
      let response = await cI.postData(item);
      //return response.data;
      if (this.dispatch)
      this.dispatch(apiAction.apiCallSuccess(response.data));
      if (this.onSuccess)
      this.dispatch({ type: this.onSuccess, payload: response.data });
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
  SaveClinicalProductCategory = async (item) => {
  try {
      let response = await cPC.postData(item);
      //return response.data;
      if (this.dispatch)
      this.dispatch(apiAction.apiCallSuccess(response.data));
      if (this.onSuccess)
      this.dispatch({ type: this.onSuccess, payload: response.data });
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

  SaveItems = async (group) => {
  try {
      let response = await cI.postDataList(group);
      //return response.data;
      if (this.dispatch)
      this.dispatch(apiAction.apiCallSuccess(response.data));
      if (this.onSuccess)
      this.dispatch({ type: this.onSuccess, payload: response.data });
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

  SaveProductCategories = async (group) => {
  try {
      let response = await cPC.postDataList(group);
      //return response.data;
      if (this.dispatch)
      this.dispatch(apiAction.apiCallSuccess(response.data));
      if (this.onSuccess)
      this.dispatch({ type: this.onSuccess, payload: response.data });
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

