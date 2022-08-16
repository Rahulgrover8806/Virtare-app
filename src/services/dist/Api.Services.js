"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var antd_1 = require("antd");
var API = axios_1["default"].create({ baseURL: "https://dev.icc-health.com/dev/" });
API.interceptors.request.use(function (conf) {
    // you can add some information before send it.
    // let token=localStorage.getItem('token');
    conf.headers["Authorization"] = "Bearer " + localStorage.getItem('token');
    return conf;
}, function (error) {
    return Promise.reject(error);
});
API.interceptors.response.use(function (next) {
    return Promise.resolve(next.data);
}, function (error) {
    // You can handle error here and trigger warning message without get in the code inside
    //   store.dispatch({ 
    //     type: env.actionsTypes.openModal,
    //     message: error.message,
    //   });
    antd_1.notification.open({
        message: 'Error',
        description: error.message
    });
    return Promise.reject(error);
});
exports["default"] = API;
function token(token) {
    throw new Error('Function not implemented.');
}
