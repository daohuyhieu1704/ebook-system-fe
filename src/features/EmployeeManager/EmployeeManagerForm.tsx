import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { DatePicker, Form, Input, Select, Spin, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ChuyenVienAPI } from "../../api/EmailAPI";
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
import { selectUserInfo } from "../login/loginSlice";
import { selectDataEmp, setDataEmp } from "./EmployeeManagerSlice";
import moment from "moment";

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
    if (values?.username) {
      form.setFieldsValue({
        username: values.username,
        email: values.email,
        fullname: values.hoten,
        password: values.password,
        gender: values.gioitinh,
        ngaysinh: moment(values.ngaysinh),
        role: values.role,
        sdt: values.sdt,
        active: values.active === 1 ? true : false,
      });
    }
  };
  function formatDateToDdMmYyyy(date: Date) {
    const day = String(date.getDate()); // Get the day and pad with leading zero if needed
    const month = String(date.getMonth() + 1); // Get the month (0-11) and add 1, then pad with leading zero if needed
    const year = date.getFullYear(); // Get the full year (4 digits)

    return `${day}/${month}/${year}`;
  }
  const onFinish = (values: any) => {
    console.log("fddfdf", formatDateToDdMmYyyy(new Date(values?.ngaysinh)));
    if (isUpdateForm) {
      const formData = new FormData();
      formData.append("username", values?.username);
      const list_field: {
        name_field: string;
        content: any;
      }[] = [];
      for (let [key, value] of Object.entries(values)) {
        if (value !== selectedRows[0][key]) {
          list_field.push({
            name_field: key,
            content: value,
          });
        }
      }
      ChuyenVienAPI.update(
        {
          username: values?.username,
          password: values?.password,
          email: values?.email,
          role: values?.role,
          gender: values?.gender,
          sdt: values?.sdt,
          ngaysinh: formatDateToDdMmYyyy(new Date(values?.ngaysinh)),
          fullname: values?.fullname,
          active: values?.active === true ? 1 : 0,
        },
        `${userInfo.accessToken}`
      )
        .then((res: any) => {
          dispatch(setIsLoadingSubmit(false));
          onSubmitSuccess(res);
        })
        .catch((err: any) => {
          onSubmitError(err);
        });
    } else {
      dispatch(setIsLoadingSubmit(true));
      ChuyenVienAPI.create(
        {
          username: values?.username,
          password: values?.password,
          email: values?.email,
          role: values?.role,
          gender: values?.gender,
          sdt: values?.sdt,
          ngaysinh: formatDateToDdMmYyyy(new Date(values?.ngaysinh)),
          fullname: values?.fullname,
        },
        `${userInfo.accessToken}`
      )
        .then((res: any) => {
          console.log(res);
          onSubmitSuccess(res);
        })
        .catch((err: any) => {
          onSubmitError(err);
        });
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
        gioiTinh: 0,
      });
    } else {
      onFill(selectedRows[0]);
    }
  }, [drawerRightVisible]);

  return (
    <Form form={form} name={formName} onFinish={onFinish} layout="vertical">
      <Form.Item name="username" label="Tài khoản" rules={[{ required: true }]}>
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
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item name="role" label="Quyền" rules={[{ required: true }]}>
        <Select
          allowClear
          filterOption={false}
          showSearch
          size="large"
          ref={inputRef}
          notFoundContent={searchLoading ? <Spin size="small" /> : null}
          options={ROLEFORM}
          onSelect={(value: any) => {
            setRole(value);
          }}
        ></Select>
      </Form.Item>
      <Form.Item name="fullname" label="Tên" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
        <Select
          allowClear
          filterOption={false}
          showSearch
          size="large"
          ref={inputRef}
          notFoundContent={searchLoading ? <Spin size="small" /> : null}
          options={[
            {
              value: 0,
              label: "Nam",
            },
            {
              value: 1,
              label: "Nữ",
            },
          ]}
          onSelect={(value: any) => {
            setGender(value);
          }}
        ></Select>
      </Form.Item>
      <Form.Item name="sdt" label="Số điện thoại" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item name="ngaysinh" label="Ngày sinh" rules={[{ required: true }]}>
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
          name="active"
          label="Kích hoạt"
          rules={[{ required: false }]}
          valuePropName="checked"
        >
          <Switch defaultChecked={selectedRows[0]?.active === 1} />
        </Form.Item>
      ) : (
        <></>
      )}
    </Form>
  );
}
