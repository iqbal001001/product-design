import axios from 'axios'

let api = '/api/ProductCode/';

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
    getDataWithDependents: (id) =>
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
    postDataWithDependent: (data) =>
    instance({
        'method': 'POST',
        'url': api + "Dependents",
        'data':data
    }),
    removeData: (data) =>
    instance({
        'method': 'DELETE',
        'url': api,
        'data':data
    })
}