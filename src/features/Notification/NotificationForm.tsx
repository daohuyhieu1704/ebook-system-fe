import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Tag,
  Tooltip,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import type { InputRef } from "antd";
import React, {
  useTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  setSelectedRows,
} from "../layout/layoutSlice";
import {
  listNotiInterface,
  NotiLabelAndValue,
  NotiType,
  selectListNotifi,
  selectListNotiType,
  selectMode,
  selectNienkhoa,
  setListNotifi,
  setMode,
  setNienkhoa,
} from "./NotificationSlice";
import type { UploadFile } from "antd/es/upload/interface";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { selectUserInfo } from "../login/loginSlice";
import { notificationAPI } from "../../api/OrderAPI";
import { TweenOneGroup } from "rc-tween-one";
import { overflow } from "styled-system";
import { CustomTagSelect, DatePickerContainer } from "./Notification.style";
import moment from "moment";
import {
  selectDataStu,
  setDataStu,
} from "../StudentsManager/StudentsManagerSlice";
import { SinhVienAPI } from "../../api/SinhVienAPI";
import { debounce } from "../../helper/commonFunc";
import { DashboardAPI } from "../../api/DashboardAPI";
import { selectDataKhoa, setDataKhoa } from "../dashboard/DashboardSlice";
type FormProps = {
  formName: string;
};

const { Title, Text } = Typography;

let uuid = uuidv4();

export default function NotificationForm(props: FormProps) {
  const { formName } = props;
  const inputRef = useRef(null);
  const inputRefMSSV = useRef(null);
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  const notiTypeSelected = useAppSelector(selectMode);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const dataTable = useAppSelector(selectListNotifi);
  const selectedRows = useAppSelector(selectSelectedRows);
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const [updateData, setupdateData] = useState<listNotiInterface>(() =>
    selectedRows.length === 0
      ? {
          STT: 0,
          thesis: "",
          type: "",
          content: "",
          to: "",
          attached: [],
          key: "",
        }
      : selectedRows[0]
  );

  const [tagsRender, setTagsRender] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const userInfo = useAppSelector(selectUserInfo);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const [filterReceiveText, setFilterReceiveText] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const editInputRef = useRef<InputRef>(null);
  const [listUpload, setListUpload] = useState<any>([]);

  const onSubmitSuccess = () => {
    form.resetFields();
    dispatch(setIsRefetch(true));
    dispatch(closeDrawerRight());
    dispatch(setIsLoadingSubmit(false));
    setTagsRender([]);
    setListUpload([]);
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

  const ConvertToFormData = (values: any) => {
    const formData = new FormData();
    formData.append(
      "title",
      `${
        isUpdateForm && !values?.title.includes("[Cập nhật]")
          ? "[Cập nhật]"
          : ""
      }${values?.title}`
    );
    formData.append("content", values?.content);
    if (listUpload.length > 0) {
      for (let file of listUpload) {
        formData.append("files", file.originFileObj);
      }
    }
    return formData;
  };

  const onFinish = (values: any) => {
    const formData = ConvertToFormData(values);
    dispatch(setIsLoadingSubmit(true));
    notificationAPI
      .send(formData, `${userInfo.accessToken}`)
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
  };
  const onFill = (values: any) => {
    console.log("hc values: ", values);
    if (values?.id_thongbao) {
      form.setFieldsValue({
        title: values.title,
        content: values.content,
      });
      setListUpload(values.list_name_file.map((x: any) => x.linkImage));
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

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tagsRender.filter((tag) => tag !== removedTag);
    setTagsRender(newTags);
    console.log(newTags);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tagsRender];
    newTags[editInputIndex] = editInputValue;
    setTagsRender(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };

  return (
    <Form form={form} name={formName} onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
        <Input size="large" ref={inputRef} />
      </Form.Item>
      <Form.Item
        key="content"
        name="content"
        label={"Nội dung"}
        rules={[{ required: true }]}
      >
        <TextArea
          size="large"
          rows={6}
          ref={inputRef}
          value={updateData.content}
        />
      </Form.Item>
      <Form.Item name="attached" label="Các tệp đính kèm">
        <Upload
          accept="image/x-png,image/gif,image/jpeg,image/jpg,.pdf,.docx"
          listType="picture"
          fileList={listUpload}
          onChange={(rs: any) => {
            setListUpload(rs.fileList);
          }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}
