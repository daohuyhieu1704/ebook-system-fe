import { Avatar, Badge, Col, Modal, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import { SinhVienAPI } from "../../api/SinhVienAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import TableLayout from "../../components/TableLayout/TableLayout";
import { theme } from "../../theme/theme";
import { selectYear, setHasStu } from "./StudentsManagerSlice";
import { selectUserInfo } from "../login/loginSlice";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";
import {
  openDrawerBottom,
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
  setSelectedRows,
} from "../layout/layoutSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

export default function StudentsManager() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [dataSrc, setDataSrc] = useState<any[]>([]);
  const [count, setCount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const year = useAppSelector(selectYear);
  const userInfo = useAppSelector(selectUserInfo);
  const [loadingQuesItem, setLoadingQuesItem] = useState(false);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  function changeHandler(item: any) {
    setVisible(true);
    dispatch(openDrawerBottom());
    dispatch(setSelectedRows([item]));
  }
  const changeStatusQuesHandler = (value: boolean, item: any) => {
    setLoadingQuesItem(true);
    console.log(value, item);
    if (!value) {
      SinhVienAPI.deactivate(
        {
          mssv: item.mssv,
        },
        `${userInfo.accessToken}`
      )
        .then((res: any) => {
          setLoadingQuesItem(false);
          dispatch(setIsRefetch(true));
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `${res.data?.message}`,
          });
        })
        .catch((err) => {
          setLoadingQuesItem(false);
          console.log(err);
        });
    } else {
      SinhVienAPI.activate(
        {
          mssv: item.mssv,
        },
        `${userInfo.accessToken}`
      )
        .then((res: any) => {
          setLoadingQuesItem(false);
          dispatch(setIsRefetch(true));
          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `${res.data?.message}`,
          });
        })
        .catch((err) => {
          setLoadingQuesItem(false);
          console.log(err);
        });
      setLoadingQuesItem(false);
    }
  };
  const columns: object[] = [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      title: "MSSV",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "Họ tên",
      key: "hoten",
      dataIndex: "hoten",
    },
    {
      title: "Lớp",
      key: "lop",
      dataIndex: "lop",
      elipsis: true,
      render: (data: string) => {
        return <div>{data}</div>;
      },
    },
    {
      key: "status",
      title: "Trạng thái",
      dataIndex: "status",
      align: "left",
      filters: [
        {
          text: "Hoạt động",
          value: 0,
        },
        {
          text: "Bị cấm",
          value: 1,
        },
      ],
      render: (value: number, item: any) => {
        return (
          <Row justify="space-between" align="middle">
            <Col>
              <Switch
                checkedChildren={<EyeOutlined />}
                unCheckedChildren={<EyeInvisibleOutlined />}
                defaultChecked={value === 1 ? true : false}
                loading={loadingQuesItem}
                onChange={(value) => changeStatusQuesHandler(value, item)}
              />
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
      onFilter: (value: number, record: any) => record.deleted === value,
    },
  ];
  const getData = () => {
    setLoading(true);
    console.log("userInfo.accessToken", userInfo.accessToken);
    SinhVienAPI.getAllSV(`${userInfo.accessToken}`)
      .then((data) => {
        console.log("data", data);
        setLoading(false);
        dispatch(setHasStu(data.data?.data?.length > 0));
        setDataSrc(
          data.data?.data.map((item: any, index: number) => ({
            ...item,
            key: item.mssv,
            STT: index + 1,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        NotificationCustom({
          type: "error",
          message: "Error",
          description: error.response.data.message,
        });
      });
  };
  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log("error", error);
    }
  }, [year]);

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
          return record.status === 0 ? "table-row-gray" : "table-row-dark";
        }}
        checkbox={false}
        columns={columns}
        dataSource={dataSrc}
        loading={loading}
        total={count}
        setOffset={setOffset}
      />
    </>
  );
}
