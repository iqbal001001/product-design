import axios from 'axios'

let api = '/api/ProductSuite/';

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
    getVersionsData: (id) =>
    instance({
        'method':'GET',
        'url': api + 'GetVersions/' + id
    }),
    getVersionsAndProductLinesData: (id) =>
    instance({
        'method':'GET',
        'url': api + 'GetVersionsAndProductLines/' + id
    }),
    postDataWithDependents: (data) =>
    instance({
        'method': 'POST',
        'url': api + 'Dependents/',
        'data':data
    }),
    postData: (data) =>
    instance({
        'method': 'POST',
        'url': api,
        'data':data
    }),
    removeData: (data) =>
    instance({
        'method': 'DELETE',
        'url': api,
        'data':data
    })
}