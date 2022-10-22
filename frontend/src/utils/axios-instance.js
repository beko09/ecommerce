import axios from 'axios';
// const host = location.hostname
const instance = axios.create();
instance.defaults.withCredentials = true;
// instance.defaults.baseURL = `${host}:4000/`;
instance.defaults.baseURL = 'http://127.0.0.1:4000';
instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
instance.defaults.headers.post['Accept'] = 'multipart/form-data';
export default instance;
// ,
// "proxy": "http://127.0.0.1:4000"
