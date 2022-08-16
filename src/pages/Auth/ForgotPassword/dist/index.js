"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
require("../Signin/Style.css");
var logo_svg_1 = require("../../../assets/Svg/logo.svg");
var download_png_1 = require("../../../assets/Svg/download.png");
var signupRightBg_png_1 = require("../../../assets/Svg/signupRightBg.png");
var ApiUrls_1 = require("../../../config/ApiUrls");
var Api_Services_1 = require("../../../services/Api.Services");
var ForgotPassword = function () {
    var onFinish = function (values) {
        // const formData = values;
        // const asString = new URLSearchParams(formData).toString();
        // console.log("asString",asString);
        console.log(values, "values");
        var token = localStorage.getItem('token');
        Api_Services_1["default"].post("" + ApiUrls_1.API_URLS.forgot, { 'token': token }, { params: { email: values.email } })
            .then(function (response) {
            console.log("response", response);
            // localStorage.setItem("token", response.token);
        })["finally"](function () { });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "loginWrapper" },
            react_1["default"].createElement("div", { className: "logIn" },
                react_1["default"].createElement("div", { className: "loginInner" },
                    react_1["default"].createElement(antd_1.Row, null,
                        react_1["default"].createElement(antd_1.Col, { span: 12 },
                            react_1["default"].createElement("div", { className: "leftWrapper" },
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("div", { className: "logo" },
                                        react_1["default"].createElement("img", { src: logo_svg_1["default"], alt: "Virtare logo" })),
                                    react_1["default"].createElement("h3", null, "Welcome to Virtare Healthcare"),
                                    react_1["default"].createElement("img", { className: "rightImg", src: download_png_1["default"], alt: "SignupImage" })))),
                        react_1["default"].createElement(antd_1.Col, { span: 12 },
                            react_1["default"].createElement("div", { className: "rightWrapper" },
                                react_1["default"].createElement("img", { src: signupRightBg_png_1["default"], alt: "Image", className: "rightImg" }),
                                react_1["default"].createElement("h2", null, "Forgot Password"),
                                react_1["default"].createElement(antd_1.Form, { name: "basic", initialValues: {
                                        remember: true
                                    }, onFinish: onFinish, autoComplete: "off", method: "post" },
                                    react_1["default"].createElement(antd_1.Form.Item, { name: "email", rules: [
                                            {
                                                required: true,
                                                message: "Please input your email address!"
                                            },
                                        ] },
                                        react_1["default"].createElement(antd_1.Input, { placeholder: "Email" })),
                                    react_1["default"].createElement(antd_1.Form.Item, null,
                                        react_1["default"].createElement("div", { className: "buttons" },
                                            react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Send"))))))))))));
};
exports["default"] = ForgotPassword;
