import { Button, Form, Input } from "antd";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SaveOutlined,
} from "@ant-design/icons";
import { ChuyenVienAPI } from "../../api/EmailAPI";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { setIsRefetch } from "../layout/layoutSlice";
import { selectUserInfo, setIsLoggedOut } from "../Login/LoginSlice";

export default function ChangePWForm() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  const onSubmitSuccess = (res: any) => {
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: `${res.data.message}`,
    });
    form.resetFields();
    dispatch(setIsLoggedOut(true));
    dispatch(setIsRefetch(true));
  };
  const onSubmitError = (err: any) => {
    NotificationCustom({
      type: "error",
      message: "Error",
      description: err.data?.message,
    });
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="ChangePWForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="old_password"
        label="Mật khẩu cũ"
        rules={[{ required: true }]}
      >
        <Input.Password
          size="large"
          ref={inputRef}
          iconRender={(visiblePW) =>
            visiblePW ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item
        name="new_password"
        label="Mật khẩu mới"
        rules={[{ required: true }]}
      >
        <Input.Password
          size="large"
          ref={inputRef}
          iconRender={(visiblePW) =>
            visiblePW ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu mới"
        rules={[
          { required: true },
          {
            validator: async (_, value: string) => {
              if (value !== form.getFieldValue("new_password")) {
                return Promise.reject(new Error("Không khớp với mật khẩu mới"));
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input.Password
          size="large"
          ref={inputRef}
          iconRender={(visiblePW) =>
            visiblePW ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item>
        <Button key="submit" type="primary" htmlType="submit">
          <SaveOutlined /> Lưu mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
}
