import { Form, Input, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaqsAPI } from "../../api/TemplateAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import {
  closeDrawerRight,
  selectDrawerRightVisible,
  selectIsUpdateForm,
  selectSelectedRows,
  setDisableSubmit,
  setIsLoadingSubmit,
  setIsRefetch,
} from "../layout/layoutSlice";
import { selectUserInfo } from "../login/loginSlice";

type FormProps = {
  formName: string;
};

export default function FaqsForm(props: FormProps) {
  const { formName } = props;
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const selectedRows = useAppSelector(selectSelectedRows);
  const userInfo = useAppSelector(selectUserInfo);
  const [listUpload, setListUpload] = useState<any>([]);

  const ConvertToFormData = (values: any) => {
    const formData = new FormData();
    formData.append("id", selectedRows[0]?.id);
    formData.append("cauhoi", values?.cauhoi);
    formData.append("cautraloi", values?.cautraloi);
    formData.append("active", values?.active ? "0" : "1");
    // if (listUpload.length > 0) {
    //   for (let file of listUpload) {
    //     formData.append("files", file.originFileObj);
    //   }
    // }
    return formData;
  };
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
    const formData = ConvertToFormData(values);
    console.log("fdf", selectedRows, values);
    dispatch(setIsLoadingSubmit(true));
    if (isUpdateForm) {
      FaqsAPI.update(formData, `${userInfo.accessToken}`)
        .then(() => {
          dispatch(setIsLoadingSubmit(false));
          onSubmitSuccess();
        })
        .catch((err: any) => {
          onSubmitError(err);
        });
    } else {
      FaqsAPI.create(formData, `${userInfo.accessToken}`)
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
    if (values?.id) {
      form.setFieldsValue({
        cauhoi: values.cauhoi,
        cautraloi: values.cautraloi,
        active: values.active === 1 ? false : true,
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
      <Form.Item name="cauhoi" label="Câu hỏi" rules={[{ required: true }]}>
        <TextArea size="large" rows={4} ref={inputRef} />
      </Form.Item>
      <Form.Item
        key="cautraloi"
        name="cautraloi"
        label="Câu trả lời"
        rules={[{ required: true }]}
      >
        <TextArea size="large" rows={6} ref={inputRef} />
      </Form.Item>
      {isUpdateForm ? (
        <Form.Item name="active" label="Ẩn câu hỏi?" valuePropName="checked">
          <Switch
            defaultChecked={selectedRows[0]?.active === 0 ? false : true}
          />
        </Form.Item>
      ) : (
        <></>
      )}
    </Form>
  );
}
