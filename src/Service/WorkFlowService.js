import wFItem from "../data/WorkFlowItem";

export const  getItems = async() => {
    try {
      let response = await wFItem.getDataList();
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

export const getItem = async(id) => {
  try {
      let response = await wFItem.getData(id);
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

export const getNewItem = () => {
    return {
        Id: 0
    };
}


export const SaveItem = async (cc) => {
    try {
        let response = await wFItem.postData(cc);
        return response.data;
      } catch(err) {
          console.log(err);
              if (err.response) {
                 // setError("Failure "+ err.response.status);
              } else if (err.request) {
                 // setError("client never received a response, or request never left");
              } else {
                // anything else
              }
      }
}

