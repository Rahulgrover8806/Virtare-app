import { Col, Row, Button, Checkbox, Form, Input, notification } from "antd";
import "./Style.css";
import Logo from "../../../assets/Svg/logo.svg";
import SignupImage from "../../../assets/Svg/download.png";
import signupRightBg from "../../../assets/Svg/signupRightBg.png";
import { useState, useEffect } from "react";
import { API_URLS } from "../../../config/ApiUrls";
import API from "../../../services/Api.Services";

const SignIn = () => {
  const onFinish = (values: any) => {
    API.post(`${API_URLS.login}`, {
      email: values.username,
      password: values.password,
      deviceType: "web",
      deviceToken: null,
    })
      .then((response: any) => {
        localStorage.setItem("token", response.token);
      })
      .finally(() => {});
  };

  return (
    <>
      <div className="loginWrapper">
        <div className="logIn">
          <div className="loginInner">
            <Row>
              <Col span={12}>
                <div className="leftWrapper">
                  <div>
                    <div className="logo">
                      <img src={Logo} alt="Virtare logo" />
                    </div>
                    <h3>Welcome to Virtare Healthcare</h3>
                    <img
                      className="rightImg"
                      src={SignupImage}
                      alt="SignupImage"
                    />
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="rightWrapper">
                  <img src={signupRightBg} alt="Image" className="rightImg" />
                  <h2>Login</h2>
                  <Form
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email address!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Email"
                        // name="email"
                        // onChange={userDetails}
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        // name="password"
                        // onChange={userDetails}
                      />
                    </Form.Item>

                    <Form.Item>
                      <div className="buttons">
                        <Button type="primary" htmlType="submit">
                          Login
                        </Button>

                        <a href="#" className="">
                          Forgot Password ?
                        </a>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
