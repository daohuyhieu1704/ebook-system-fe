import { Button, Col, Input, Modal, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TableLayout from "../../components/TableLayout/TableLayout";
import { theme } from "../../theme/theme";
import {
  selectFeedbackList,
  setFeedbackList,
  ComplaintInterface,
  selectResQuestion,
} from "./ComplaintSlice";
import { v4 as uuidv4 } from "uuid";
import {
  selectIsRefetch,
  selectMode,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import Item from "antd/lib/list/Item";
import axios from "axios";
import { selectUserInfo } from "../login/loginSlice";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import QnFbModal from "./QnFbModal";
import { rolePair } from "../../constants/common";
import { ComplainAPI } from "../../api/OrderAPI";
import { useLocation } from "react-router-dom";

export default function QuestionFeedback() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const mode = useAppSelector(selectMode);
  const [dataSrc, setDataSrc] = useState<any[]>([]);
  const dataFb = useAppSelector(selectFeedbackList);
  const userInfo = useAppSelector(selectUserInfo);
  const [selectedData, setSectedData] = useState<any>([]);
  const [today, setDateToday] = useState<Date>(new Date());
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const timeRes = useAppSelector(selectResQuestion);
  const columns: object[] = [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      key: "mssv",
      title: "MSSV",
      dataIndex: "mssv",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "answered",
      key: "answered",
      width: "110px",
      align: "center",
      render: (value: number, item: any) => {
        if (value !== 1) {
          if (item.thoigian > timeRes) {
            return <Tag color="red">Quá hạn</Tag>;
          } else {
            return <Tag color="blue">Đang chờ</Tag>;
          }
        } else {
          return <Tag color="green">Đã trả lời</Tag>;
        }
      },
    },
    {
      title: "Nội dung",
      dataIndex: "nd",
      key: "nd",
      render: (data: string, item: any) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              key={`data-${item.mathacmac}`}
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "300px",
              }}
            >
              {data}
            </div>
            <Button
              onClick={() => {
                setVisible(true);
                setSectedData(item);
              }}
            >
              Chi tiết
            </Button>
          </div>
        );
      },
    },
  ];
  const getData = () => {
    setLoading(true);
    ComplainAPI.getAll()
      .then((res: any) => {
        console.log("res", res);
        setLoading(false);
        let medData = res.data?.data
          ?.reverse()
          .map((item: ComplaintInterface, index: number) => ({
            ...item,
            key: item.id,
            STT: index + 1,
          }));
        dispatch(setFeedbackList(medData));
        setDataSrc(medData);
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
  const handleSetFbListUnanswered = (mathacmac: string) => {
    // dispatch(setFeedbackListUnanswered(dataUnans.find((item: any) => item?.mathacmac === mathacmac))
    // console.log(
    //   'remove',
    //   mathacmac,
    //   dataFull.find((item: any) => item?.mathacmac === mathacmac),
    //   // dataUnans.find((item: any) => {
    //   //   console.log(item?.mathacmac);
    //   //   return item?.mathacmac === mathacmac;
    //   // })
    //   dataUnans,
    //   dataAns
    // );
  };
  const convertDate = (str: string) => {
    const [dateComponents, timeComponents] = str.split(" ");
    const [day, month, year] = dateComponents.split("/");
    const [hours, minutes, seconds] = timeComponents.split(":");
    return Math.trunc(
      (today.getTime() -
        new Date(
          +year,
          +month - 1,
          +day,
          +hours,
          +minutes,
          +seconds
        ).getTime()) /
        (1000 * 3600 * 24)
    );
  };
  useEffect(() => {
    if (location.pathname === selectedTab) {
      console.log(mode, dataFb);
      if (mode === 1) {
        setDataSrc(dataFb.filter((item: any) => item.answered === 0));
      } else if (mode === 2) {
        setDataSrc(dataFb.filter((item: any) => item.answered === 1));
      } else {
        setDataSrc(dataFb);
      }
    }
  }, [mode]);
  return (
    <>
      <TableLayout
        checkbox={false}
        columns={columns}
        dataSource={dataSrc}
        loading={loading}
        total={count}
        setOffset={setOffset}
        rowClassName={(record: any, index: number) => {
          return record.answered === 0 && convertDate(record.thoigian) > timeRes
            ? "table-row-warning"
            : "";
        }}
      />
      <QnFbModal
        visible={visible}
        dataRender={selectedData}
        handleCancelModal={() => setVisible(false)}
        handleSetFbListUnanswered={handleSetFbListUnanswered}
      />
    </>
  );
}
