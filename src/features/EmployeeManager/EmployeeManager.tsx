import { Button, Modal, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChuyenVienAPI } from "../../api/EmailAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import TableLayout from "../../components/TableLayout/TableLayout";
import { rolePair } from "../../constants/common";
import { theme } from "../../theme/theme";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import { selectUserInfo } from "../login/loginSlice";
import { selectDataEmp, setDataEmp } from "./EmployeeManagerSlice";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";

export default function EmployeeManager() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const userInfo = useAppSelector(selectUserInfo);
  const data = useAppSelector(selectDataEmp);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const [loadingEmpItem, setLoadingEmpItem] = useState(false);
  function changeHandler(item: any) {
    setVisible(true);
  }
  const changeStatusEmpHandler = (value: boolean, item: any) => {
    console.log(value, item);
    if (value) {
      console.log("restore");
      ChuyenVienAPI.activate(item.username, `${userInfo.accessToken}`)
        .then((res: any) => {
          setLoadingEmpItem(false);
          dispatch(setIsRefetch(true));
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `${res.data?.message}`,
          });
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      console.log("stop");
      ChuyenVienAPI.deactive(item.username, `${userInfo.accessToken}`)
        .then((res: any) => {
          setLoadingEmpItem(false);
          dispatch(setIsRefetch(true));
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `${res.data?.message}`,
          });
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
  const EmpColumns: object[] = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      title: "Tên",
      dataIndex: "hoten",
      key: "hoten",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (value: string) => {
        return rolePair[parseInt(value)][0];
      },
    },
    {
      title: "Email",
      dataIndex: "username",
      key: "username",
    },
    {
      key: "options",
      title: "",
      dataIndex: "options",
      width: 200,
      align: "center",
      render: (_: any, item: any) => {
        return (
          <ButtonFeature
            item={item}
            changeHandler={() => changeHandler(item)}
          />
        );
      },
    },
  ];

  const getData = () => {
    setLoading(true);
    ChuyenVienAPI.getAll(`${userInfo?.accessToken}`)
      .then((res) => {
        setLoading(false);
        console.log("hc res: ", res.data?.data);
        NotificationCustom({
          type: "success",
          message: "Thành công",
          description: `${res.data.message}`,
        });
        const dataSrc = res.data?.data
          .reverse()
          .map((data: any, index: number) => ({
            ...data,
            key: `${data.username}`,
            STT: index + 1,
          }));
        dispatch(setDataEmp(dataSrc));
      })
      .catch((err) => {
        setLoading(false);
        NotificationCustom({
          type: "error",
          message: "Error",
          description: err.data?.message,
        });
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
        rowClassName={(record: any, index: number) => {
          return record.active === 0 ? "table-row-gray" : "table-row-dark";
        }}
        checkbox={false}
        columns={EmpColumns}
        dataSource={data}
        loading={loading}
        total={count}
        setOffset={setOffset}
      />
      {/* <Button type="primary" style={{
        marginTop: '1rem'
      }}>Xuất file</Button> */}
    </>
  );
}
