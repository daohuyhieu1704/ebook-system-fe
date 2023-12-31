import { FileImageOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Tooltip, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import TableLayout from "../../components/TableLayout/TableLayout";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../Layout/LayoutSlice";
import { selectUserInfo } from "../Login/LoginSlice";
import { FunctionAPI } from "../../api/FunctionAPI";
import { selectFuncList, setFuncList } from "./FuncSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../Layout/Layout.style";
const { Link } = Typography;
export default function Func() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const isRefetch = useSelector(selectIsRefetch);
  const selectedTab = useSelector(selectSelectedKey);
  const data = useSelector(selectFuncList);
  const userInfo = useSelector(selectUserInfo);
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "Script",
      dataIndex: "script",
      key: "script",
    },
  ];
  const onSuccess = (res) => {
    setLoading(false);
    const data = res.data.data.map((data, index) => ({
      key: data.id,
      ...data,
    }));
    dispatch(setFuncList(data));
    console.log("data", res.data.data, data);
  };
  const onError = (err) => {
    setLoading(false);
    NotificationCustom({
      type: "error",
      message: "Lỗi",
      description: "Không lấy được danh sách function, thử tải lại trang",
    });
  };
  const getData = () => {
    setLoading(true);
    FunctionAPI.getAll(userInfo.accessToken)
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        onError(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (isRefetch && location.pathname === selectedTab) {
      getData();
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);
  return (
    <TableLayout
      checkbox={true}
      columns={columns}
      dataSource={data}
      loading={loading}
      total={count}
      setOffset={setOffset}
    />
  );
}
