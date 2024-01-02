import { Form, Input, Button, Checkbox } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../helper/firebase/firebase.utils";

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
import { axiosPost } from "../../helper/axios";
import React, { useEffect, useState } from "react";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import colors from "../../theme/colors";
import { theme } from "../../theme/theme";
import { GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { UserAPI } from "../../api/UserAPI";

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
    axiosPost(`${process.env.REACT_APP_ENDPOINT}emp_role/login`, {
      username: values.username,
      password: values.password,
    })
      .then((data) => {
        if (data.data?.state === false) {
          setLoading(false);
          NotificationCustom({
            type: "error",
            message: "Error",
            description: data.data?.message,
          });
        } else {
          setLoading(false);
          dispatch(
            loginSuccess({
              username: values.username,
              fullname: values.username,
              accessToken: data.data?.access_token,
              remember: values.remember,
              role: data.data?.role,
            })
          );

          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: "Đăng nhập thành công",
          });
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        setLoading(false);
        NotificationCustom({
          type: "error",
          message: "Lỗi",
          description: "Đăng nhập không thành công, vui lòng thử lại",
        });
      });
  };
  useEffect(() => {
    if (userInfo.username) {
      navigate(PATH.HOME);
    }
  }, []);

  const handleSignInGoogle = async () => {
    try {
      const data = await signInWithGoogle();
      console.log(data);
      setLoading(false);

      const postResponse = await UserAPI.loginGuest({
        gmail: data.user?.fullname,
      });

      const dataLogin = postResponse.data;

      setLoading(false);

      dispatch(
        loginSuccess({
          username: data.user?.email,
          fullname: data.user?.fullname,
          accessToken: dataLogin?.access_token,
          remember: !!form.getFieldValue("remember"),
          role: 1,
        })
      );
      dispatch(setIsLoggedIn(true));
      NotificationCustom({
        type: "success",
        message: "Thành công",
        description: "Đăng nhập thành công",
      });
      navigate(from, { replace: true });

      // dispatch(loginSuccess(userData));

      // NotificationCustom({
      //   type: "success",
      //   message: "Thành công",
      //   description: "Đăng nhập thành công",
      // });

      // navigate(from, { replace: true });
    } catch (error) {
      // Handle any errors here
      console.error("Error:", error);
    }
    // signInWithGoogle().then((data) => {
    //   setLoading(false);
    //   axiosPost(
    //     `${process.env.REACT_APP_ENDPOINT}emp_role/login`,
    //     {
    //       gmail: data.user?.email,
    //     }
    //   );
    //   dispatch(
    //     loginSuccess({
    //       ...data,
    //       username: data.user?.displayName,
    //       firstName: data.user?.displayName,
    //       lastName: "",
    //       accessToken: data.user?.getIdToken(),
    //       remember: true,
    //       role: "CTSV",
    //       type: 0,
    //     })
    //   );

    //   NotificationCustom({
    //     type: "success",
    //     message: "Thành công",
    //     description: "Đăng nhập thành công",
    //   });
    //   navigate(from, { replace: true });
    //});
  };

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
              <Checkbox style={{ color: colors.primary }}>
                Nhớ mật khẩu?
              </Checkbox>
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
                onClick={handleSignInGoogle}
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
