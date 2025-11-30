import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Tag,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeDrawerRight,
  selectDrawerRightVisible,
  selectIsUpdateForm,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
} from "../../layout/layoutSlice";
import { selectUserInfo } from "../../Login/LoginSlice";
import { NotificationCustom } from "../../../components/NotificationCustom/NotificationCustom";
import { current } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import { selectCategoryData } from "../CategorySlice";

type FormProps = {
  formName: string;
};

export default function CategoryDetailForm(props: FormProps) {
  const { formName } = props;
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [listLabel, setListLabel] = useState<any>([]);
  const [listItems, setListItems] = useState<any>([]);
  const [listMat, setListMat] = useState<any>([]);
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const exisitingData = useAppSelector(selectCategoryData);
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
    if (isUpdateForm) {
    } else {
    }
  };
  const onFill = (values: any) => {
    console.log("hc valuesfgfdg: ", values);
    if (values?.id) {
      form.setFieldsValue({
        id: values.id,
        loai: values.loai,
        soluong: parseInt(values.soluong),
      });
    }
  };

  const handleChangeLabel = (value: string[]) => {
    console.log(`selected ${value}`);
    setListItems(value);
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

    form.setFields([
      { name: "id_category", value: `${location.pathname.split("/").at(-1)}` },
    ]);
  }, [drawerRightVisible]);

  const removeCsvc = (item: any) => {
    const newList = listItems.filter((x: any) => x !== item);
    form.setFields([{ name: "loai", value: newList }]);
    setListItems(newList);
  };

  useEffect(() => {
    console.log(selectedRows[0]);
  }, []);

  return (
    <Form form={form} name={formName} onFinish={onFinish} layout="vertical">
      <Form.Item
        key="id_category"
        name="id_category"
        label="Tên phòng"
        rules={[{ required: true }]}
      >
        <Input size="large" ref={inputRef} disabled />
      </Form.Item>
    </Form>
  );
}
