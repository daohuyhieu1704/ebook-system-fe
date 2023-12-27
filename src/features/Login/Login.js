import { Form, Input, Button, Checkbox } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import {
  // ImgContent,
  LoginFormTitle,
  LoginFormWrapper,
  LoginWrapper,
  // ReForgotPass
} from "./Login.style";
import {
  loginSuccess,
  LoginType,
  selectIsLoggedIn,
  selectUserInfo,
  setIsLoggedIn,
} from "./LoginSlice";
import { PATH } from "../../constants/common";
import React, { useEffect, useState } from "react";
import colors from "../../theme/colors";
import { theme } from "../../theme/theme";
import { GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || PATH.HOME;

  const onFinish = (values) => {
    setLoading(true);
  };
  useEffect(() => {
    if (userInfo.username) {
      navigate(PATH.HOME);
    }
  }, []);

  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <div>
          <LoginFormTitle>Slide-kit</LoginFormTitle>
          <Form
            name="login"
            form={form}
            layout={"vertical"}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Đây là mục bắt buộc!",
                },
              ]}
            >
              <Input
                size={"large"}
                placeholder="Địa chỉ e-mail"
                className="input-username"
                autoComplete="true"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Đây là mục bắt buộc!",
                },
              ]}
            >
              <Input.Password
                size={"large"}
                placeholder="Mật khẩu"
                autoComplete="true"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox style={{ color: "red" }}>Nhớ mật khẩu?</Checkbox>
            </Form.Item>

            <Form.Item
              style={{ height: 0, marginBottom: 0 }}
              className="login-btn"
            >
              <Button
                loading={loading}
                size={"large"}
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: "55px",
                  position: "absolute",
                  top: "0px",
                  backgroundColor: colors.primary,
                  border: "none",
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item
              style={{ height: 0, marginBottom: 0 }}
              className="login-btn"
            >
              <Button
                loading={loading}
                size={"large"}
                type="primary"
                style={{
                  width: "100%",
                  height: "55px",
                  position: "absolute",
                  top: "80px",
                  backgroundColor: `${theme.colors.white}`,
                  border: `3px solid ${colors.primary}`,
                  color: `${colors.primary}`,
                }}
                onClick={() => {}}
              >
                <GoogleOutlined /> Đăng nhập với Google{" "}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};
