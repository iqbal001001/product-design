import feature from "../data/Feature";
import featureGroup from "../data/FeatureGroup";
import featureType from "../data/FeatureType";
import featureItem from "../data/FeatureItem";

import * as apiAction from '../Store/api'
import { v4 as uuidv4 } from 'uuid';

export class FeatureService {
  constructor(dispatch, onSuccess, onError) {
    this.dispatch = dispatch;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  getFeatures = async() => {
    try {
      let response = await feature.getDataList();
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

  getFeatureWithDependents = async(id) => {
  try {
    let response = await feature.getDataWithDependents(id);
    if (this.dispatch)
    this.dispatch(apiAction.apiCallSuccess(response.data[0]));
    if (this.onSuccess)
    this.dispatch({ type: this.onSuccess, payload: response.data[0] });
    return response.data[0];
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

getFeatureListWithDependents = async() => {
  try {
    let response = await feature.getDataListWithDependents();
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

  getFeature = async(id) => {
  try {
    let response = await feature.getData(id);
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

  getFeatureWithItem = async(id) => {
  try {
    let response = await feature.getItemsData(id);
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

  getGroups = async() => {
  try {
    let response = await featureGroup.getDataList();
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

  getTypes = async() => {
  try {
    let response = await featureType.getDataList();
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

  getNewFeature = () => {
    return {
        Id: 0,
        UniqueId: uuidv4().toString(),
        GroupId: 1,
        TypeId: 1,
        Items: []
    };
}

getNewFeatureItem = (featureId,itemId) => {
  return {
    Id: 0, 
    FeatureId: featureId,
    ItemId: itemId,
    UniqueId: uuidv4().toString()
  };
}

  getNewGroup = () => {
  return {
      Id: 0,
      UniqueId: uuidv4().toString(),
  };
}

  getNewType = () => {
  return {
      Id: 0,
      UniqueId: uuidv4().toString(),
  };
}


  SaveFeature = async (cc) => {
    try {
        let response = await feature.postData(cc);
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

  SaveFeatures = async (cc) => {
  try {
      let response = await feature.postListData(cc);
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

  SaveFeatureWithItems = async (f) => {
  try {
      let response = await feature.postDataWithItem(f);
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

  SaveItems = async (group) => {
  try {
      let response = await featureItem.postDataList(group);
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

DeleteFeature = async (id) => {
  try {
      let response = await feature.removeData(id);
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

  SaveGroup = async (cc) => {
  try {
      let response = await featureGroup.postData(cc);
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

    DeleteGroup = async (id) => {
      try {
          let response = await featureGroup.removeData(id);
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

  SaveType = async (cc) => {
  try {
      let response = await featureType.postData(cc);
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

  DeleteType = async (id) => {
    try {
        let response = await featureType.removeData(id);
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
