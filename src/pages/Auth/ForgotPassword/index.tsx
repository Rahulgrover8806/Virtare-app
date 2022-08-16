import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import "../Signin/Style.css";
import Logo from "../../../assets/Svg/logo.svg";
import SignupImage from "../../../assets/Svg/download.png";
import signupRightBg from "../../../assets/Svg/signupRightBg.png";
import { API_URLS } from "../../../config/ApiUrls";
import API from "../../../services/Api.Services";

const ForgotPassword = () => {
  const onFinish = (values: any) => {
  // const formData = values;
  // const asString = new URLSearchParams(formData).toString();
  // console.log("asString",asString);

    console.log(values, "values");
    let token=localStorage.getItem('token');
    API.post(`${API_URLS.forgot}`,{'token': token }, {params:{email:values.email}})
      .then((response: any) => {
        console.log("response", response);

        // localStorage.setItem("token", response.token);
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
                  <h2>Forgot Password</h2>
                  <Form
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    method="post"
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email address!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item>
                      <div className="buttons">
                        <Button type="primary" htmlType="submit">
                          Send
                        </Button>
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

export default ForgotPassword;
