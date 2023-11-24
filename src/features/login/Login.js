import { Form, Input, Button, Checkbox } from "antd";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  // ImgContent,
  LoginFormTitle,
  LoginFormWrapper,
  LoginWrapper,
  // ReForgotPass
} from "./Login.style.js";
import { loginSuccess, LoginType, selectUserInfo } from "./LoginSlice";
import { LOCAL_STORAGE_ITEM, PATH } from "../../constants/common";
import { axiosPost } from "../../helper/axios";
import { useEffect, useState } from "react";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import colors from "../../theme/colors";
import { useLogout } from "../../hooks/useLogout";
import { theme } from "../../theme/theme";

export const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
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
          console.log(localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN));

          dispatch(
            loginSuccess({
              username: values.username,
              fullname: data?.data.fullname,
              accessToken: data.data?.acess_token,
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
    console.log(userInfo);
    if (userInfo.username) {
      navigate(PATH.HOME);
    }
  }, []);
  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <div>
          <LoginFormTitle>Slide kit</LoginFormTitle>
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
              <Input.Password size={"large"} placeholder="Mật khẩu" />
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
          </Form>
        </div>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};
