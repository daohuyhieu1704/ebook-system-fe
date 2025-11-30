import { Form, Input, Button, Checkbox } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginFormTitle, LoginFormWrapper, LoginWrapper } from "./Login.style";
import { useAppDispatch } from "../../app/hooks";
import { loginSuccess, LoginType } from "./LoginSlice";
import { LOCAL_STORAGE_ITEM, PATH } from "../../constants/common";
import { useState } from "react";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import colors from "../../theme/colors";
import { AuthenAPI } from "../../api/AuthenAPI";

export const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || PATH.HOME;

  const onFinish = (values: LoginType) => {
    setLoading(true);
    AuthenAPI.LogIn({
      email: values.username,
      password: values.password,
    })
      .then(({ data }) => {
        if (data?.status !== "success") {
          setLoading(false);
          NotificationCustom({
            type: "error",
            message: "Error",
            description: data?.message,
          });
        } else {
          console.log("Success:", data?.data);
          setLoading(false);
          dispatch(
            loginSuccess({
              username: values.username,
              fullname: data?.data.name
                ? data?.data.name
                : values.username.slice(0, values.username.indexOf("@")),
              accessToken: data.data?.accessToken,
              refreshToken: data.data?.refreshToken,
              remember: values.remember,
              role: `${data.data?.roles[0]}`,
            })
          );
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: "Đăng nhập thành công",
          });
          console.log("from: ", from);
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        setLoading(false);
        NotificationCustom({
          type: "error",
          message: "Error",
          description: error,
        });
      });
  };

  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <div>
          <LoginFormTitle>Ebook System Management</LoginFormTitle>
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
          </Form>
        </div>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};
