"use strict";
exports.__esModule = true;
exports.routes = void 0;
var react_1 = require("react");
var RoutePaths_1 = require("./RoutePaths");
exports.routes = [
    {
        path: "" + RoutePaths_1["default"].SIGNIN,
        private: false,
        element: react_1.lazy(function () { return Promise.resolve().then(function () { return require("../pages/Auth/Signin"); }); })
    },
    {
        path: "" + RoutePaths_1["default"].FORGOTPASSWORD,
        private: false,
        element: react_1.lazy(function () { return Promise.resolve().then(function () { return require("../pages/Auth/ForgotPassword/"); }); })
    },
    {
        path: "" + RoutePaths_1["default"].DASHBOARD,
        private: true,
        element: react_1.lazy(function () { return Promise.resolve().then(function () { return require("../pages/DashBoard"); }); })
    },
];
