import  suite from '../data/Suite.js';
import  version from '../data/Version.js';
import category from '../data/ProductCategory.js';
import code from '../data/ProductCode';
import uuid from 'react-uuid';
import { v4 as uuidv4 } from 'uuid';

import * as apiAction from '../Store/api'

export class ProductService {
  constructor(dispatch, onSuccess, onError) {
    this.dispatch = dispatch;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

    getSuites = async () => {
      try {
        let response = await suite.getDataList();
      
        return response.data;
      } catch (err) {
        if (err.response) {
          // setError("Failure "+ err.response.status);
        } else if (err.request) {
          // setError("client never received a response, or request never left");
        } else {
          // anything else
        }
      }
    };


    getSuiteWithVersions = async (id) => {
      try {
        let response = await suite.getVersionsAndProductLinesData(id);
        if (response.data?.length > 0) {
          if (this.dispatch)
          this.dispatch(apiAction.apiCallSuccess(response.data[0]));
          if (this.onSuccess)
          this.dispatch({ type: this.onSuccess, payload: response.data[0] });
        }
        //return response.data[0];
      } catch(err) {
        if (err.response) {
         if (this.onError) this.dispatch({ type: this.onError, payload: "Failure "+ err.response.status});
         } else if (err.request) {
           if (this.onError) this.dispatch({ type: this.onError, payload: "client never received a response, or request never left"});
         } else {
           // anything else
         }
        }
    };

    getVersionWithDependents = async (id) => {
      try {
        let response = await version.getDataWithDependents(id);
        if (this.dispatch)
        this.dispatch(apiAction.apiCallSuccess(response.data[0]));
        if (this.onSuccess)
        this.dispatch({ type: this.onSuccess, payload: response.data[0] });
        return response.data[0];
      } catch(err) {
        if (err.response) {
         if (this.onError) this.dispatch({ type: this.onError, payload: err});
         } else if (err.request) {
           if (this.onError) this.dispatch({ type: this.onError, payload: "Network Error" + err.toString()});
         } else {
           // anything else
         }
      }
    };

    getProductVersion = () => {
      return {};
    };

    getNewSuite = () => {
      return {
        Id: 0,
        UniqueId: uuidv4().toString(),
        ApprovalStatus: "",
        Versions: []
      };
    };

    getNewVersion = (suiteId) => {
      return {
        Id: 0,
        UniqueId: uuidv4().toString(),
        ApprovalStatus: "",
        StartDate: "",
        EndDate: "",
        IsApproved: false,
        IsDeleted: false,
        ProductLines: [],
        SuiteId: suiteId,
      };
    };

    getNewProductLine = (versionId, productCodeId) => {
      return {
        Id: 0,
        UniqueId: uuidv4().toString(),
        ApprovalStatus: "",
        VersionId: versionId,
        ProductCodeId: productCodeId
      };
    };

    SaveSuiteWithDependents = async (s) => {
      try {
        let response = await suite.postDataWithDependents(s);
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
    };

    SaveVersion = async (v) => {
      try {
        let response = await version.postData(v);
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
    };

    SaveVersionWithDependents = async (v) => {
      try {
        let response = await version.postDataWithDependents(v);
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
    };

    getProductCategories = async () => {
      try {
        let response = await category.getDataList();
        return response.data;
      } catch (err) {
        if (err.response) {
          // setError("Failure "+ err.response.status);
        } else if (err.request) {
          // setError("client never received a response, or request never left");
        } else {
          // anything else
        }
      }
    };

    getProductCodes = async () => {
      try {
        let response = await code.getDataList();
        return response.data;
      } catch (err) {
        if (err.response) {
          // setError("Failure "+ err.response.status);
        } else if (err.request) {
          // setError("client never received a response, or request never left");
        } else {
          // anything else
        }
      }
    };

    getProductCodeWithDependents = async (id) => {
      try {
        let response = await code.getDataWithDependents(id);
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
    };

    SaveCategory = async (v) => {
      try {
        let response = await category.postData(v);
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
    };

    SaveCode = async (v) => {
      try {
        let response = await code.postData(v);
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
    };

    SaveCodeWithDependent = async (v) => {
      try {
        let response = await code.postDataWithDependent(v);
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
    };

    getNewCategory = () => {
      return {
        Id: 0,
        UniqueId: uuid(),
        Name: ""
      };
    };

    getNewCode = () => {
      return {
        Id: 0,
        UniqueId: uuid(),
        Code: ""
      };
    };
  
}

