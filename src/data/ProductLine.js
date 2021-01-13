import axios from 'axios'

let api = '/api/ProductLine/';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, //'http://localhost:64909/',
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