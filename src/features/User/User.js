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
import { selectUserList, setUserList } from "./UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../Layout/Layout.style";
import { UserAPI } from "../../api/UserAPI";
const { Link } = Typography;
export default function User() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const isRefetch = useSelector(selectIsRefetch);
  const selectedTab = useSelector(selectSelectedKey);
  const data = useSelector(selectUserList);
  const userInfo = useSelector(selectUserInfo);
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ tên",
      dataIndex: "hoten",
      key: "hoten",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  const onSuccess = (res) => {
    setLoading(false);
    console.log("res", res.data);
    const data = res.data.map((data, index) => ({
      key: data.username,
      ...data,
    }));
    dispatch(setUserList(data));
    console.log("data", res.data, data);
  };
  const onError = (err) => {
    setLoading(false);
    console.log("err", err);
    NotificationCustom({
      type: "error",
      message: "Lỗi",
      description: "Không lấy được danh sách User, thử tải lại trang",
    });
  };
  const getData = () => {
    setLoading(true);
    UserAPI.getAll(userInfo.accessToken)
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
