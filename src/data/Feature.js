import axios from 'axios'

let api = '/api/Feature/';

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
    getDataWithDependents: (id) =>
    instance({
        'method':'GET',
        'url': api + 'Dependents/' + id
    }),
    getDataListWithDependents: () =>
    instance({
        'method':'GET',
        'url': api + 'Dependents/' 
    }),
    postData: (data) =>
    instance({
        'method': 'POST',
        'url': api,
        'data':data
    }),
    postListData: (data) =>
    instance({
        'method': 'POST',
        'url': api + 'List/',
        'data':data
    }),
    postDataWithItem: (data) =>
    instance({
        'method': 'POST',
        'url': api + '/Items',
        'data':data
    }),
    removeData: (data) =>
    instance({
        'method': 'DELETE',
        'url': api + data
    })
}