import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useRef } from "react";
import {
  closeDrawerRight,
  selectDrawerRightVisible,
  selectIsUpdateForm,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
} from "../layout/layoutSlice";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { BookAPI } from "../../api/BookAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../Login/LoginSlice";
import { AuthorAPI } from "../../api/AuthorAPI";

type FormProps = {
  formName: string;
};

export default function AuthorForm(props: FormProps) {
  const { formName } = props;
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const selectedRows = useAppSelector(selectSelectedRows);
  const userInfo = useAppSelector(selectUserInfo);

  const onSubmitSuccess = () => {
    form.resetFields();
    dispatch(setIsRefetch(true));
    dispatch(closeDrawerRight());
    dispatch(setIsLoadingSubmit(false));

    NotificationCustom({
      type: "success",
      message: "Success",
      description:
        selectedRows?.length > 0 ? "Update successful!" : "Create successful!",
    });
  };

  const onSubmitError = (error: any) => {
    dispatch(setIsLoadingSubmit(false));

    NotificationCustom({
      type: "error",
      message: "Error",
      description: error.response ? error.response.data.message : error.message,
    });
  };

  const onFinish = async (values: any) => {
    console.log("listUpload", values, selectedRows[0].id);
    dispatch(setIsLoadingSubmit(true));

    try {
      if (isUpdateForm) {
        await AuthorAPI.updateAuthor(
          selectedRows[0].id,
          {
            name: values.name,
            description: values.description,
            img: values.img,
          },
          `${userInfo.accessToken}`
        );
        onSubmitSuccess();
      } else {
        const res = await AuthorAPI.createAuthor(
          {
            name: values.name,
            description: values.description,
            img: values.img,
          },
          `${userInfo.accessToken}`
        );
        const { message } = res.data;
        NotificationCustom({
          type: "success",
          message: "Thành công",
          description: `${message}`,
        });
        onSubmitSuccess();
      }
    } catch (err) {
      onSubmitError(err);
    }
  };

  const onFill = (values: any) => {
    if (values?.id) {
      form.setFieldsValue({
        name: values.name,
        description: values.description,
        img: values.img,
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
    } else {
      onFill(selectedRows[0]);
    }
  }, [drawerRightVisible]);

  return (
    <Form form={form} name={formName} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} style={{ zIndex: 9999 }} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Tiểu sử"
        rules={[{ required: true }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="img" label="Ảnh" rules={[{ required: true }]}>
        <TextArea size="large" ref={inputRef} style={{ zIndex: 9999 }} />
      </Form.Item>
    </Form>
  );
}
