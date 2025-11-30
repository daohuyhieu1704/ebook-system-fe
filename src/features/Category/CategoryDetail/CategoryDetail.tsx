import { Button, Card, Row, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookAPI } from "../../../api/BookAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NotificationCustom } from "../../../components/NotificationCustom/NotificationCustom";
import TableLayout from "../../../components/TableLayout/TableLayout";
import { theme } from "../../../theme/theme";
import {
  openDrawerBottom,
  selectIsRefetch,
  selectMode,
  selectSelectedKey,
  setIsRefetch,
  setSelectedRows,
} from "../../layout/layoutSlice";
import { selectDataBook, setDataBook } from "../../Book/BookSlice";
import { selectUserInfo } from "../../Login/LoginSlice";
import ButtonFeature from "../../../components/ButtonFeature/ButtonFeature";
import { ROLE } from "../../../constants/common";
import { selectSearchCate } from "../CategorySlice";

export default function CategoryDetail() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const data = useAppSelector(selectDataBook);
  const [dataSrc, setDataSrc] = useState<any[]>([]);
  const mode = useAppSelector(selectMode);
  const userInfo = useAppSelector(selectUserInfo);
  const selectedTab = useAppSelector(selectSelectedKey);
  const isRefetch = useAppSelector(selectIsRefetch);
  const searchCate = useAppSelector(selectSearchCate);
  function changeHandler(item: any) {
    setVisible(true);
    dispatch(openDrawerBottom());
    dispatch(setSelectedRows([item]));
  }
  const columns: object[] = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: theme.indexWidth,
      align: "right",
    },
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: "200px",
    },
    {
      title: "Tác giả",
      dataIndex: "Author",
      key: "Author",
      width: "200px",
      render: (value: any, item: any) => {
        return (
          <Row justify="space-between">
            <Typography.Text ellipsis={true} style={{ width: "100px" }}>
              {value.name}
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "right",
      width: "80px",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (value: string, item: any) => {
        return (
          <Row justify="space-between">
            <Typography.Text ellipsis={true} style={{ width: "300px" }}>
              {value}
            </Typography.Text>
            <ButtonFeature
              value={value}
              item={item}
              changeHandler={() => changeHandler(item)}
            />
          </Row>
        );
      },
    },
  ];
  const onSuccess = (res: any) => {
    setLoading(false);
    console.log("res", res);
    const dataSrc = res.data?.data
      .reverse()
      .filter((item: any) => item.Category?.id === searchCate)
      .map((data: any, index: number) => ({
        STT: index + 1,
        key: data.id,
        ...data,
      }));
    dispatch(setDataBook(dataSrc));
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: `${res.data.message}`,
    });
  };
  const onError = (err: any) => {
    setLoading(false);
    NotificationCustom({
      type: "error",
      message: "Error",
      description: err.data?.message,
    });
  };
  const getData = () => {
    console.log("userInfo", userInfo);
    if (!userInfo) return;
    setLoading(true);
    const role = userInfo.role === "1" ? ROLE.admin : ROLE.shop;
    if (role === ROLE.admin) {
      BookAPI.getAllBooks(`${userInfo.accessToken}`)
        .then((res) => {
          onSuccess(res);
        })
        .catch((err) => {
          onError(err);
        });
    } else {
    }
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
    <>
      {data && data[0] && (
        <Card
          hoverable
          key={data[0].Category.id}
          style={{ marginBottom: "1rem" }}
        >
          <Typography.Title level={5}>
            {data[0].Category?.name}
          </Typography.Title>
          {data[0].Category?.description}
        </Card>
      )}
      <TableLayout
        checkbox={false}
        bordered={true}
        columns={columns}
        dataSource={data}
        loading={loading}
        total={count}
        setOffset={setOffset}
      />
    </>
  );
}
