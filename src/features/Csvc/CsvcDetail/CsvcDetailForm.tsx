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
import { selectUserInfo } from "../../login/loginSlice";
import { NotificationCustom } from "../../../components/NotificationCustom/NotificationCustom";
import { selectDataCSVC, selectMaterial } from "../CsvcSlice";
import { CsvcAPI } from "../../../api/CsvcAPI";
import { DashOutlined, DeleteOutlined } from "@ant-design/icons";
import { current } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";

type FormProps = {
  formName: string;
};

export default function CsvcDetailForm(props: FormProps) {
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
  const exisitingData = useAppSelector(selectDataCSVC);
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
    // dispatch(setIsLoadingSubmit(true));
    if (isUpdateForm) {
      CsvcAPI.updateRoomFacility(
        {
          id_phong: values.id_phong,
          id_csvc: selectedRows[0].id,
          soluong: values.soluong,
        },
        `${userInfo.accessToken}`
      )
        .then((res: any) => {
          console.log("hc res: ", res.data);
          dispatch(setIsLoadingSubmit(false));
          const { message } = res.data;
          NotificationCustom({
            type: "success",
            message: "Thêm thành công CSVC cho phòng",
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
    } else {
      for (const item of values.loai) {
        CsvcAPI.createRoomFacility(
          {
            id_phong: `${location.pathname.split("/").at(-1)}`,
            id_csvc: item,
            soluong: values[item],
          },
          `${userInfo.accessToken}`
        )
          .then((res: any) => {
            console.log("hc res: ", res.data);
            dispatch(setIsLoadingSubmit(false));
            const { message } = res.data;
            NotificationCustom({
              type: "success",
              message: "Thêm thành công CSVC cho phòng",
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
    }
  };
  const onFill = (values: any) => {
    console.log("hc valuesfgfdg: ", values);
    if (values?.id) {
      form.setFieldsValue({
        id_phong: values.id_phong,
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
      { name: "id_phong", value: `${location.pathname.split("/").at(-1)}` },
    ]);

    CsvcAPI.getAllMaterialFacility(`${userInfo.accessToken}`)
      .then((res) => {
        setListMat(res.data?.data);
        const exceptData = exisitingData.map((x: any) => x.id);
        const labelData = res.data?.data
          .filter((x: any) => !exceptData.includes(x.id))
          .map((data: any) => ({
            label: `${data.id} - ${data.ten}`,
            value: data.id,
          }));
        setListLabel(labelData);
      })
      .catch((err) => {});
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
        key="id_phong"
        name="id_phong"
        label="Tên phòng"
        rules={[{ required: true }]}
      >
        <Input size="large" ref={inputRef} disabled />
      </Form.Item>
      {isUpdateForm ? (
        <Form.Item
          key="soluong"
          name="soluong"
          label={`${
            exisitingData?.find((x: any) => x.id === `${selectedRows[0]?.id}`)
              ?.ten
          } - Số lượng`}
          rules={[{ required: true }]}
        >
          <InputNumber
            size="large"
            min={1}
            style={{ width: "100%", marginRight: "1rem" }}
            ref={inputRef}
          />
        </Form.Item>
      ) : (
        <>
          <Form.Item
            key="loai"
            name="loai"
            label="Mã đồ dùng"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              size="large"
              options={listLabel}
              onChange={handleChangeLabel}
              ref={inputRef}
            />
          </Form.Item>
        </>
      )}

      {!isUpdateForm &&
        listItems.map((item: any) => (
          <Row align="bottom" key={item}>
            <Form.Item
              key={item}
              name={item}
              label={`${
                listLabel?.find((x: any) => x.value === item)?.label
              } - Số lượng`}
              rules={[{ required: true }]}
            >
              <InputNumber
                size="middle"
                min={1}
                max={listMat.find((x: any) => x.id === item).ton_kho}
                style={{ width: "90%", marginRight: "1rem" }}
                ref={inputRef}
              />
            </Form.Item>
            <Form.Item>
              <Button
                danger
                shape="circle"
                size="small"
                onClick={() => removeCsvc(item)}
              >
                <DeleteOutlined />
              </Button>
            </Form.Item>
          </Row>
        ))}
    </Form>
  );
}
