import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
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
import { CategoryAPI } from "../../api/CategoryAPI";
import { AuthorAPI } from "../../api/AuthorAPI";

type FormProps = {
  formName: string;
};

export default function BookForm(props: FormProps) {
  const { formName } = props;
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const selectedRows = useAppSelector(selectSelectedRows);
  const userInfo = useAppSelector(selectUserInfo);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [authorOptions, setAuthorOptions] = useState<any>([]);

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
    console.log("listUpload", values, isUpdateForm);
    dispatch(setIsLoadingSubmit(true));
    try {
      if (isUpdateForm) {
        await BookAPI.updateBook(
          selectedRows[0].id,
          {
            title: values.title,
            description: values.description,
            image: values.image,
            price: values.price,
            author_ID: values.author_ID,
            category_ID: values.category_ID,
          },
          `${userInfo.accessToken}`
        );
        onSubmitSuccess();
      } else {
        const res = await BookAPI.createBook(
          {
            title: values.title,
            description: values.description,
            image: values.image,
            price: values.price,
            author_ID: values.author_ID,
            category_ID: values.category_ID,
          },
          `${userInfo.accessToken}`
        );
        console.log("hc res: ", res.data);
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
        title: values.title,
        description: values.description,
        image: values.image,
        price: values.price,
        author_ID: values.author_ID,
        category_ID: values.category_ID,
      });
    }
  };
  const handleChangeCategory = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  const handleChangeAuthor = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
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
      CategoryAPI.getAllCategories(`${userInfo.accessToken}`).then((res) => {
        if (res.data.code !== 200) {
          throw new Error(res.data.message);
        }
        const cateData = res.data.data;
        cateData.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        const SetOfLabel = new Set(
          cateData.map((item: any) => item.name.substring(0, 1))
        );
        setCategoryOptions(
          Array.from(SetOfLabel).map((item: any) => ({
            label: item,
            options: cateData
              .filter((cate: any) => cate.name.substring(0, 1) === item)
              .map((cate: any) => ({
                value: cate.id,
                label: cate.name,
              })),
          }))
        );
      });
      AuthorAPI.getAllAuthors(`${userInfo.accessToken}`).then((res) => {
        if (res.data.code !== 200) {
          throw new Error(res.data.message);
        }
        const authorData = res.data.data;
        setAuthorOptions(
          authorData.map((author: any) => ({
            value: author.id,
            label: author.name,
          }))
        );
      });
    }
  }, [drawerRightVisible]);

  return (
    <Form form={form} name={formName} onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} style={{ zIndex: 9999 }} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} style={{ zIndex: 9999 }} />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber size="large" ref={inputRef} style={{ zIndex: 9999 }} />
      </Form.Item>
      <Form.Item name="author_ID" label="Tác giả" rules={[{ required: true }]}>
        <Select
          size="large"
          onChange={handleChangeAuthor}
          options={authorOptions}
        />
      </Form.Item>
      <Form.Item
        name="category_ID"
        label="Thể loại"
        rules={[{ required: true }]}
      >
        <Select
          size="large"
          onChange={handleChangeCategory}
          options={categoryOptions}
        />
      </Form.Item>
    </Form>
  );
}
