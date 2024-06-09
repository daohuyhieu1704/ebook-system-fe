import { DatePicker, Form, Input, InputNumber } from "antd";
import React, { useEffect, useRef } from "react";
import {
  closeDrawerRight,
  selectDrawerRightVisible,
  selectIsUpdateForm,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
} from "../../layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectUserInfo } from "../../login/loginSlice";
import { CsvcAPI } from "../../../api/CsvcAPI";
import { NotificationCustom } from "../../../components/NotificationCustom/NotificationCustom";

type FormProps = {
  formName: string;
};

export default function DmCsvcForm(props: FormProps) {
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
  const onFinish = (values: any) => {
    console.log("listUpload", values, isUpdateForm);
    dispatch(setIsLoadingSubmit(true));
    if (isUpdateForm) {
      CsvcAPI.updateMatFacility(
        {
          id: selectedRows[0].id,
          ten: values.ten,
          mota: values.mota,
          tonkho: values.tonkho,
          gia: values.gia,
        },
        `${userInfo.accessToken}`
      )
        .then(() => {
          dispatch(setIsLoadingSubmit(false));
          onSubmitSuccess();
        })
        .catch((err: any) => {
          onSubmitError(err);
        });
    } else {
      CsvcAPI.createMatFacility(
        {
          ten: values.ten,
          mota: values.mota,
          tonkho: values.tonkho,
          gia: values.gia,
        },
        `${userInfo.accessToken}`
      )
        .then((res: any) => {
          console.log("hc res: ", res.data);
          dispatch(setIsLoadingSubmit(false));
          const { message } = res.data;
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `${message}`,
          });
          onSubmitSuccess();
        })
        .catch((err: any) => {
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
  const onFill = (values: any) => {
    if (values?.id) {
      form.setFieldsValue({
        ten: values.ten,
        mota: values.mota,
        tonkho: values.ton_kho,
        gia: values.gia,
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
      <Form.Item name="ten" label="Tên" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item name="mota" label="Mô tả" rules={[{ required: true }]}>
        <TextArea size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item name="tonkho" label="Tồn kho" rules={[{ required: true }]}>
        <InputNumber size="large" ref={inputRef} style={{ zIndex: 9999 }} />
      </Form.Item>
      <Form.Item name="gia" label="Giá" rules={[{ required: true }]}>
        <InputNumber size="large" ref={inputRef} style={{ zIndex: 9999 }} />
      </Form.Item>
    </Form>
  );
}
