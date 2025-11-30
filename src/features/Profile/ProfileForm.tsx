import { Button, Form, Input } from "antd";
import type { MenuProps } from "antd";
import { useState, useEffect, useRef } from "react";
import { selectUserInfo } from "../Login/LoginSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { ChuyenVienAPI } from "../../api/EmailAPI";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import { useLocation } from "react-router-dom";

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [selectedKeyMode, setSelectedKeyMode] = useState<string>("0");
  const userInfo = useAppSelector(selectUserInfo);
  const [dataSrc, setDataSrc] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // const data = useAppSelector(selectDataEmp);
  const data: any[] = [];
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  const itemsTest: any = [
    { key: "0", label: "Thông tin" },
    { key: "1", label: "Đổi mật khẩu" },
  ];
  const getData = () => {};
  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKeyMode(e.key);
  };
  const onFill = () => {
    if (dataSrc?.username) {
      form.setFieldsValue({
        username: dataSrc?.username,
        fullname: dataSrc?.hoten,
        role: dataSrc?.role,
        email: dataSrc?.email,
      });
    }
  };
  const onSubmitSuccess = (res: any) => {
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: "Cập nhật thông tin cá nhân thành công",
    });
    onFill();
    setIsEdit(false);
    dispatch(setIsRefetch(true));
  };
  const onSubmitError = (err: any) => {
    NotificationCustom({
      type: "error",
      message: "Lỗi",
      description: "Cập nhật thông tin cá nhân không thành công",
    });
  };
  const onFinish = (values: any) => {
    // const formData = new FormData();
    // formData.append('username', values?.username);
    // const list_field: {
    //     name_field: string;
    //     content: any;
    // }[] = [];
    // for (let [key, value] of Object.entries(values)) {
    //     list_field.push({
    //         name_field: key,
    //         content: value
    //     })
    // }
    // ChuyenVienAPI.update({
    //     username: values?.username,
    //     list_field: list_field,
    // },`${userInfo.accessToken}`).then((res: any) => {
    //     onSubmitSuccess(res);
    // })
    //     .catch((err: any) => {
    //         onSubmitError(err);
    //     });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    onFill();
  }, [dataSrc]);

  useEffect(() => {
    if (isRefetch && location.pathname === selectedTab) {
      getData();
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);
  return (
    <Form
      form={form}
      layout="vertical"
      name="ProfileForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item name="username" label="Tài khoản" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} disabled />
      </Form.Item>
      <Form.Item name="hoten" label="Tên" rules={[{ required: false }]}>
        <Input size="large" ref={inputRef} disabled={!isEdit} />
      </Form.Item>
      <Form.Item name="sdt" label="Số điện thoại" rules={[{ required: false }]}>
        <Input size="large" ref={inputRef} disabled={!isEdit} />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: false }]}>
        <Input size="large" ref={inputRef} disabled={!isEdit} />
      </Form.Item>
      {isEdit ? (
        <Form.Item>
          <Button key="submit" type="primary" htmlType="submit">
            <SaveOutlined /> Lưu
          </Button>
          <Button
            key="close"
            style={{
              marginLeft: "1rem",
            }}
            onClick={() => {
              setIsEdit(false);
              onFill();
            }}
          >
            <CloseOutlined /> Hủy
          </Button>
        </Form.Item>
      ) : (
        <Form.Item>
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <EditOutlined /> Chỉnh sửa
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}
