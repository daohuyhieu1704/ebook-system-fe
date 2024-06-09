import { Button, Row, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectDataBooking, setDataBooking } from "../../Booking/BookingSlice";
import {
  openDrawerBottom,
  selectIsRefetch,
  selectMode,
  selectSelectedKey,
  setIsRefetch,
  setSelectedRows,
} from "../../layout/layoutSlice";
import { selectUserInfo } from "../../login/loginSlice";
import { theme } from "../../../theme/theme";
import ButtonFeature from "../../../components/ButtonFeature/ButtonFeature";
import { NotificationCustom } from "../../../components/NotificationCustom/NotificationCustom";
import { CsvcAPI } from "../../../api/CsvcAPI";
import TableLayout from "../../../components/TableLayout/TableLayout";
import { selectDataMat, selectMaterial, setDataMat } from "../CsvcSlice";

export default function DanhMucCSVC() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const data = useAppSelector(selectDataMat);
  const [dataSrc, setDataSrc] = useState<any[]>([]);
  const mode = useAppSelector(selectMode);
  const userInfo = useAppSelector(selectUserInfo);
  const selectedTab = useAppSelector(selectSelectedKey);
  const isRefetch = useAppSelector(selectIsRefetch);
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
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
    },
    {
      title: "Tồn kho",
      dataIndex: "ton_kho",
      key: "ton_kho",
      render: (value: string, item: any) => {
        return (
          <Row justify="space-between">
            <Typography.Text>{value}</Typography.Text>
            <ButtonFeature
              value={value}
              item={item}
              changeHandler={() => changeHandler(item)}
            />
          </Row>
        );
      },
    },
    // {
    //     title: '',
    //     dataIndex: 'options',
    //     key: 'paid',
    //     align: 'center',
    //     width: 150,
    //     render: (value: any, item: any) => {
    //         return <ButtonFeature value={value} item={item} />
    //     }
    // },
  ];
  const onSuccess = (res: any) => {
    console.log(res);
    setLoading(false);
    const dataSrc = res.data?.data
      .reverse()
      .map((data: any, index: number) => ({
        ...data,
        STT: index + 1,
        key: data.id,
      }));
    dispatch(setDataMat(dataSrc));
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
    CsvcAPI.getAllMaterialFacility(`${userInfo.accessToken}`)
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
    <>
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
