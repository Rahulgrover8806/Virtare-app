"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
require("./Style.css");
var logo_svg_1 = require("../../../assets/Svg/logo.svg");
var download_png_1 = require("../../../assets/Svg/download.png");
var signupRightBg_png_1 = require("../../../assets/Svg/signupRightBg.png");
var ApiUrls_1 = require("../../../config/ApiUrls");
var Api_Services_1 = require("../../../services/Api.Services");
var SignIn = function () {
    var onFinish = function (values) {
        Api_Services_1["default"].post("" + ApiUrls_1.API_URLS.login, {
            email: values.username,
            password: values.password,
            deviceType: "web",
            deviceToken: null
        })
            .then(function (response) {
            localStorage.setItem("token", response.token);
        })["finally"](function () { });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "loginWrapper" },
            React.createElement("div", { className: "logIn" },
                React.createElement("div", { className: "loginInner" },
                    React.createElement(antd_1.Row, null,
                        React.createElement(antd_1.Col, { span: 12 },
                            React.createElement("div", { className: "leftWrapper" },
                                React.createElement("div", null,
                                    React.createElement("div", { className: "logo" },
                                        React.createElement("img", { src: logo_svg_1["default"], alt: "Virtare logo" })),
                                    React.createElement("h3", null, "Welcome to Virtare Healthcare"),
                                    React.createElement("img", { className: "rightImg", src: download_png_1["default"], alt: "SignupImage" })))),
                        React.createElement(antd_1.Col, { span: 12 },
                            React.createElement("div", { className: "rightWrapper" },
                                React.createElement("img", { src: signupRightBg_png_1["default"], alt: "Image", className: "rightImg" }),
                                React.createElement("h2", null, "Login"),
                                React.createElement(antd_1.Form, { name: "basic", initialValues: {
                                        remember: true
                                    }, onFinish: onFinish, autoComplete: "off" },
                                    React.createElement(antd_1.Form.Item, { name: "username", rules: [
                                            {
                                                required: true,
                                                message: "Please input your email address!"
                                            },
                                        ] },
                                        React.createElement(antd_1.Input, { placeholder: "Email" })),
                                    React.createElement(antd_1.Form.Item, { name: "password", rules: [
                                            {
                                                required: true,
                                                message: "Please input your password!"
                                            },
                                        ] },
                                        React.createElement(antd_1.Input.Password, { placeholder: "Password" })),
                                    React.createElement(antd_1.Form.Item, null,
                                        React.createElement("div", { className: "buttons" },
                                            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Login"),
                                            React.createElement("a", { href: "#", className: "" }, "Forgot Password ?"))))))))))));
};
exports["default"] = SignIn;
