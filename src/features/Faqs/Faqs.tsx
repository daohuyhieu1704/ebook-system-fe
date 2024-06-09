import { Avatar, Badge, Button, Col, Row, Switch, Typography } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaqsAPI } from "../../api/FaqsAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import TableLayout from "../../components/TableLayout/TableLayout";
import { theme } from "../../theme/theme";
import {
  selectIsRefetch,
  selectSelectedKey,
  selectSelectedRows,
  setIsRefetch,
} from "../layout/layoutSlice";
import FaqsModal from "./FaqsModal";
import { selectDataFaqs, setDataFaqs } from "./FaqsSlice";
import { selectUserInfo } from "../login/loginSlice";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";

export default function Faqs() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const data = useAppSelector(selectDataFaqs);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const userInfo = useAppSelector(selectUserInfo);
  const [visible, setVisible] = useState(false);
  const [loadingFaqItem, setLoadingFaqItem] = useState(false);
  const [selectedData, setSelectedData] = useState<any>([]);
  const selectedRows = useAppSelector(selectSelectedRows);
  const changeStatusFaqHandler = (value: boolean, item: any) => {
    console.log(value, item);
    setLoadingFaqItem(true);
    if (value) {
      FaqsAPI.hide(item.mach, `${userInfo.accessToken}`)
        .then((res: any) => {
          setLoadingFaqItem(false);
          dispatch(setIsRefetch(true));
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `${res.data?.message}`,
          });
        })
        .catch((err) => {
          setLoadingFaqItem(false);
          console.log(err);
        });
    } else {
      FaqsAPI.show(item.mach, `${userInfo.accessToken}`)
        .then((res: any) => {
          setLoadingFaqItem(false);
          dispatch(setIsRefetch(true));
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `${res.data?.message}`,
          });
        })
        .catch((err) => {
          setLoadingFaqItem(false);
          console.log(err);
        });
    }
  };
  function changeHandler(item: any) {
    setVisible(true);
    setSelectedData(item);
  }

  const [columns, setColumns] = useState<object[]>(() => [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      key: "cauhoi",
      title: "Câu hỏi",
      dataIndex: "cauhoi",
      width: 200,
    },
    {
      key: "cautraloi",
      title: "Câu trả lời",
      dataIndex: "cautraloi",
      ellipsis: true,
    },
    {
      key: "active",
      title: "Trạng thái",
      dataIndex: "active",
      width: 200,
      filters: [
        {
          text: "Hiển thị",
          value: 0,
        },
        {
          text: "Bị ẩn",
          value: 1,
        },
      ],
      render: (data: number, item: any) => {
        return (
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Text>
                {data === 0 ? "Ẩn" : "Hiển thị"}
              </Typography.Text>
            </Col>
            <Col>
              <Row justify="end">
                <ButtonFeature
                  item={item}
                  changeHandler={() => changeHandler(item)}
                />
              </Row>
            </Col>
          </Row>
        );
      },
      onFilter: (value: number, record: any) => record.active === value,
    },
  ]);
  const getData = () => {
    setLoading(true);
    FaqsAPI.getAll(`${userInfo.accessToken}`)
      .then((res) => {
        setLoading(false);
        console.log("hc res: ", res.data);
        NotificationCustom({
          type: "success",
          message: "Thành công",
          description: `${res.data.message}`,
        });
        const dataSrc = res.data?.data
          .reverse()
          .map((data: any, index: number) => ({
            ...data,
            STT: index + 1,
            key: data.id,
          }));
        dispatch(setDataFaqs(dataSrc));
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
        columns={columns}
        dataSource={data}
        loading={loading}
        total={count}
        setOffset={setOffset}
      />
      <FaqsModal
        visible={visible}
        dataRender={selectedData}
        handleCancelModal={() => setVisible(false)}
      />
    </>
  );
}
