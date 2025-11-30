import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { DatePicker, Form, Input, Select, Spin, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EmployeeManagerAPI } from "../../api/EmployeeManagerAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { ROLE } from "../../constants/common";
import {
  closeDrawerRight,
  selectDrawerRightVisible,
  selectIsUpdateForm,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
} from "../layout/layoutSlice";
import { selectUserInfo } from "../Login/LoginSlice";
import { selectDataEmp, setDataEmp } from "./EmployeeManagerSlice";
import moment from "moment";
import { UserAPI } from "../../api/UserAPI";

type FormProps = {
  formName: string;
};

export default function EmployeeManagerForm(props: FormProps) {
  const ROLEFORM = Object.keys(ROLE).map((item: string, index: number) => ({
    value: `${index}`,
    label: item,
  }));
  const { formName } = props;
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const selectedRows = useAppSelector(selectSelectedRows);
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const userInfo = useAppSelector(selectUserInfo);
  const dataTable = useAppSelector(selectDataEmp);
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const onSubmitSuccess = (res: any) => {
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: `${res.data.message}`,
    });
    form.resetFields();
    dispatch(setIsRefetch(true));
    dispatch(closeDrawerRight());
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: `${res.data.message}`,
    });
  };
  const onSubmitError = (err: any) => {
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "error",
      message: "Error",
      description: err.data?.message,
    });
  };
  const onFill = (values: any) => {
    if (values?.email) {
      form.setFieldsValue({
        firstName: values?.first_name,
        lastName: values?.last_name,
        password: values?.password,
        email: values?.email,
        phoneNumber: values?.phoneNumber,
        birthday: moment(values?.birthday, "DD/MM/YYYY"),
        enable: values?.enable === 1,
      });
    }
  };
  function formatDateToDdMmYyyy(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoadingSubmit(true));

      const fullname = `${values?.firstName} ${values?.lastName}`;

      if (isUpdateForm) {
        const res = await UserAPI.admin.updateAccount(
          {
            id: selectedRows[0]?.key,
            first_name: values?.firstName,
            last_name: values?.lastName,
            email: values?.email,
            phone_number: values?.phoneNumber,
            birthday: formatDateToDdMmYyyy(new Date(values?.birthday)),
            enable: values?.enable === true ? 1 : 0,
          },
          `${userInfo.accessToken}`
        );
        dispatch(setIsLoadingSubmit(false));
        onSubmitSuccess(res);
      } else {
        const res1 = await UserAPI.admin.signUp(
          {
            full_name: fullname,
            email: values?.email,
            password: values?.password,
          },
          `${userInfo.accessToken}`
        );
        if (res1.data.code !== 200) {
          dispatch(setIsLoadingSubmit(false));
          NotificationCustom({
            type: "error",
            message: "Error",
            description: res1.data.message,
          });
        } else {
          const res2 = await UserAPI.admin.updateAccount(
            {
              id: res1.data.data.user.id,
              first_name: values?.firstName,
              last_name: values?.lastName,
              phone_number: values?.phoneNumber,
              birthday: formatDateToDdMmYyyy(new Date(values?.birthday)),
              enable: values?.enable === true ? 1 : 0,
            },
            `${userInfo.accessToken}`
          );
          onSubmitSuccess(res2);
        }
      }
    } catch (err) {
      dispatch(setIsLoadingSubmit(false));
      onSubmitError(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      inputRef.current!.focus({
        cursor: "start",
      });
    }, 100);

    if (!drawerRightVisible) {
      form.resetFields();
      form.setFieldsValue({
        gender: 0,
      });
    } else {
      onFill(selectedRows[0]);
    }
  }, [drawerRightVisible]);

  return (
    <Form form={form} name={formName} onFinish={onFinish} layout="vertical">
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      {isUpdateForm ? (
        <></>
      ) : (
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true }]}
        >
          <Input.Password
            placeholder="input password"
            ref={inputRef}
            iconRender={(visiblePW) =>
              visiblePW ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      )}
      <Form.Item name="firstName" label="Họ" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item name="lastName" label="Tên" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[{ required: true }]}
      >
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item name="birthday" label="Ngày sinh" rules={[{ required: true }]}>
        <DatePicker
          size="large"
          format={"DD/MM/YYYY"}
          getPopupContainer={(triggerNode: any) => {
            return triggerNode.parentElement;
          }}
        />
      </Form.Item>
      {isUpdateForm ? (
        <Form.Item
          name="enable"
          label="Kích hoạt"
          rules={[{ required: false }]}
          valuePropName="checked"
        >
          <Switch defaultChecked={selectedRows[0]?.enable === 1} />
        </Form.Item>
      ) : (
        <></>
      )}
    </Form>
  );
}
