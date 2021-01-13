import axios from 'axios'

let api = '/api/ClinicalCategory/';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default {
    getDataList: () =>
    instance({
        'method':'GET',
        'url': api
    }),
    getData: (id) =>
    instance({
        'method':'GET',
        'url': api + id
    }),
    getItemsData: (id) =>
    instance({
        'method':'GET',
        'url': api + 'GetItems/' + id
    }),
    getDependentsData: (id) =>
    instance({
        'method':'GET',
        'url': api + 'Dependents/' + id
    }),
    postData: (data) =>
    instance({
        'method': 'POST',
        'url': api,
        'data':data
    }),
    postDataWithClinicalItems: (data) =>
    instance({
        'method': 'POST',
        'url': api + "ClinicalItems/",
        'data':data
    }),
    postDataWithDependents: (data) =>
    instance({
        'method': 'POST',
        'url': api + "Dependents/",
        'data':data
    }),
    removeData: (data) =>
    instance({
        'method': 'DELETE',
        'url': api + data
    })
}