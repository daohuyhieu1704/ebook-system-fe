import { Button, Modal, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EmployeeManagerAPI } from "../../api/EmployeeManagerAPI";
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
import { selectUserInfo } from "../Login/LoginSlice";
import { selectDataEmp, setDataEmp } from "./EmployeeManagerSlice";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";
import { UserAPI } from "../../api/UserAPI";

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
      EmployeeManagerAPI.activate(item.username, `${userInfo.accessToken}`)
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
      EmployeeManagerAPI.deactive(item.username, `${userInfo.accessToken}`)
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "SDT",
      dataIndex: "phone_number",
      key: "phone_number",
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
    UserAPI.admin
      .getAllAccount(`${userInfo?.accessToken}`)
      .then(({ data }) => {
        setLoading(false);
        NotificationCustom({
          type: "success",
          message: "Thành công",
          description: `${data.message}`,
        });
        const dataSrc = data?.data.data
          .reverse()
          .map((data: any, index: number) => ({
            ...data,
            key: `${data.id}`,
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
          return record.enable === 0 ? "table-row-gray" : "table-row-dark";
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
