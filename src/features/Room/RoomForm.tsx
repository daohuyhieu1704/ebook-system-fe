import { Form, Input, InputNumber, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useRef } from "react";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import {
  closeDrawerRight,
  selectDrawerRightVisible,
  selectIsUpdateForm,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
} from "../layout/layoutSlice";
import { RoomAPI } from "../../api/RoomAPI";
import { selectUserInfo } from "../login/loginSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type FormProps = {
  formName: string;
};

export default function RoomForm(props: FormProps) {
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
      RoomAPI.update(
        {
          room_id: values.id_phong,
          cost: values.loai === 0 ? "320.000" : "400.000",
          type: values?.loai,
          total: values?.succhua,
          gender: values?.gioitinh,
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
      RoomAPI.create(
        {
          room_id: values.id_phong,
          cost: values.loai === 0 ? 320000 : 400000,
          type: values.loai,
          total: values.succhua,
          gender: values.gioitinh,
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
    console.log("hc values: ", values);
    if (values?.id_phong) {
      form.setFieldsValue({
        id_phong: values.id_phong,
        loai: values.loai,
        gioitinh: values.gioitinh,
        succhua: values.succhua,
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
      <Form.Item
        key="id_phong"
        name="id_phong"
        label="Tên phòng"
        rules={[{ required: true }]}
      >
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item
        key="loai"
        name="loai"
        label="Loại phòng"
        rules={[{ required: true }]}
      >
        <Select
          size="large"
          options={[
            { value: 0, label: "Thường" },
            { value: 1, label: "Đặc biệt" },
          ]}
        />
      </Form.Item>
      <Form.Item
        key="gioitinh"
        name="gioitinh"
        label="Giới tính"
        rules={[{ required: true }]}
      >
        <Select
          size="large"
          options={[
            { value: 0, label: "Nam" },
            { value: 1, label: "Nữ" },
          ]}
        />
      </Form.Item>
      <Form.Item
        key="succhua"
        name="succhua"
        label="Sức chứa"
        rules={[{ required: true }]}
      >
        <InputNumber size="large" ref={inputRef} />
      </Form.Item>
    </Form>
  );
}
