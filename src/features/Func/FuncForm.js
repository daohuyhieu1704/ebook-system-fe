import { Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import {
  closeDrawer,
  selectDrawerVisible,
  selectIsUpdateForm,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
} from "../Layout/LayoutSlice";
import { selectUserInfo } from "../Login/LoginSlice";
import { FunctionAPI } from "../../api/FunctionAPI";
import { useDispatch, useSelector } from "react-redux";

export default function FuncForm(props) {
  const { formName } = props;
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const drawerVisible = useSelector(selectDrawerVisible);
  const isUpdateForm = useSelector(selectIsUpdateForm);
  const selectedRows = useSelector(selectSelectedRows);
  const userInfo = useSelector(selectUserInfo);

  const onSubmitSuccess = () => {
    form.resetFields();
    dispatch(setIsRefetch(true));
    dispatch(closeDrawer());
    dispatch(setIsLoadingSubmit(false));

    NotificationCustom({
      type: "success",
      message: "Success",
      description:
        selectedRows?.length > 0 ? "Update successful!" : "Create successful!",
    });
  };
  const onSubmitError = (error) => {
    dispatch(setIsLoadingSubmit(false));

    NotificationCustom({
      type: "error",
      message: "Error",
      description: error.response ? error.response.data.message : error.message,
    });
  };
  const onFinish = (values) => {
    dispatch(setIsLoadingSubmit(true));
    if (isUpdateForm) {
      FunctionAPI.update(userInfo.accessToken, selectedRows[0].id, {
        icon: values.icon,
        script: values.script,
      })
        .then((res) => {
          dispatch(setIsLoadingSubmit(false));
          onSubmitSuccess();
        })
        .catch((err) => {
          onSubmitError(err);
        });
    } else {
      FunctionAPI.create(userInfo.accessToken, {
        icon: values.icon,
        script: values.script,
      })
        .then((res) => {
          dispatch(setIsLoadingSubmit(false));
          const { message } = res.data;
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `${message}`,
          });
          onSubmitSuccess();
        })
        .catch((err) => {
          dispatch(setIsLoadingSubmit(false));
          NotificationCustom({
            type: "error",
            message: "Error",
            description: err.data?.message,
          });
          onSubmitError(err);
        });
    }
  };
  const onFill = (values) => {
    if (values?.id) {
      form.setFieldsValue({
        icon: values.icon,
        script: values.script,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      inputRef.current.focus({
        cursor: "start",
      });
    }, 100);

    if (!drawerVisible) {
      form.resetFields();
    } else {
      onFill(selectedRows[0]);
    }
  }, [drawerVisible]);
  return (
    <Form form={form} name={formName} onFinish={onFinish} layout="vertical">
      <Form.Item name="icon" label="Icon" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item
        key="script"
        name="script"
        label="Script"
        rules={[{ required: true }]}
      >
        <TextArea size="large" rows={6} ref={inputRef} />
      </Form.Item>
    </Form>
  );
}
