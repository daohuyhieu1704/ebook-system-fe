import React, { useEffect, useState } from "react";
import TableLayout from "../../components/TableLayout/TableLayout";
import { selectListRoom, setListRoom } from "./RoomSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RoomAPI } from "../../api/RoomAPI";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { theme } from "../../theme/theme";
import { selectUserInfo } from "../login/loginSlice";
import { intToVND } from "../../helper/commonFunc";
import { Button, Row, Typography } from "antd";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";
import {
  openDrawerBottom,
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
  setSelectedRows,
} from "../layout/layoutSlice";
import { useLocation } from "react-router-dom";

export default function Room() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const data = useAppSelector(selectListRoom);
  const userInfo = useAppSelector(selectUserInfo);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const [listLabelName, setListLabelName] = useState<any>([]);
  function changeHandler(item: any) {
    setVisible(true);
    dispatch(openDrawerBottom());
    dispatch(setSelectedRows([item]));
  }
  const notiColumns: object[] = [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      key: "id_phong",
      title: "Tên",
      dataIndex: "id_phong",
      width: 100,
      filters: listLabelName,
      onFilter: (value: string, record: any) => record.id_phong.includes(value),
    },
    {
      key: "gioitinh",
      title: "Giới tính",
      dataIndex: "gioitinh",
      width: 100,
      render: (data: any) => (data === 0 ? "Nam" : "Nữ"),
      filters: [
        {
          text: "Nam",
          value: 0,
        },
        {
          text: "Nữ",
          value: 1,
        },
      ],
      onFilter: (value: string, record: any) => record.gioitinh === value,
    },
    {
      key: "succhua",
      title: "Sức chứa",
      dataIndex: "succhua",
      width: 100,
      sorter: (a: any, b: any) => a.succhua - b.succhua,
    },
    {
      key: "gia",
      title: "Giá",
      dataIndex: "gia",
      width: 100,
      filters: [
        {
          text: "320K",
          value: "330.000",
        },
        {
          text: "420K",
          value: "420.000",
        },
      ],
      sorter: (a: any, b: any) =>
        parseInt(a.gia.replaceAll(".", "")) -
        parseInt(b.gia.replaceAll(".", "")),
      onFilter: (value: string, record: any) => record.gia.includes(value),
      render: (data: any, item: any) => {
        return (
          <Row justify="space-between" align="middle">
            <Typography.Text>{data}</Typography.Text>
            <ButtonFeature
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
    const { data } = res.data;
    const roomList = [...data].reverse().map((item: any, index: number) => ({
      ...item,
      STT: index + 1,
      key: item.id_phong,
    }));
    dispatch(setListRoom(roomList));
    const lab: Set<{ text: string; value: string }> = new Set(
      data.map((item: any) =>
        item.id_phong.substring(
          0,
          item.id_phong.indexOf(item.id_phong.match(/\d+/g)[0])
        )
      )
    );
    setListLabelName(
      Array.from(lab).map((item) => ({ text: item, value: item }))
    );
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
    setLoading(true);
    RoomAPI.getAll(`${userInfo?.accessToken}`)
      .then((res: any) => {
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
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    if (isRefetch && location.pathname === selectedTab) {
      getData();
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);

  return (
    <TableLayout
      rowClassName={(record: any, index: number) => {
        return record.deleted === 1 ? "table-row-gray" : "table-row-dark";
      }}
      checkbox={false}
      columns={notiColumns}
      dataSource={data}
      loading={loading}
      total={count}
      setOffset={setOffset}
    />
  );
}
