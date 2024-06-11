import React, { useEffect, useId, useState } from "react";
import { theme } from "../../theme/theme";
import TableLayout from "../../components/TableLayout/TableLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectListNotifi,
  setListNotifi,
  selectListNotiType,
} from "./NotificationSlice";
import { selectUserInfo } from "../login/loginSlice";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { Avatar, Badge, Button, Col, Row, Switch, Typography } from "antd";
import { notificationAPI } from "../../api/OrderAPI";
import NotificationModal from "./NotificationModal";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import { useLocation } from "react-router-dom";
import {
  EditOutlined,
  EllipsisOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";

export default function Notification() {
  const location = useLocation();
  const [selectedData, setSelectedData] = useState<any>([]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const data = useAppSelector(selectListNotifi);
  const userInfo = useAppSelector(selectUserInfo);
  const notiType = useAppSelector(selectListNotiType);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);

  const [loadingQuesItem, setLoadingQuesItem] = useState(false);

  function changeHandler(item: any) {
    setVisible(true);
    console.log("item", item);
    setSelectedData(item);
  }

  const changeStatusQuesHandler = (value: boolean, item: any) => {
    setLoadingQuesItem(true);
    console.log(value, item);
    if (!value) {
      notificationAPI
        .deactivate(
          {
            id_thongbao: item.id_thongbao,
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
      notificationAPI
        .activate(
          {
            id_thongbao: item.id_thongbao,
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

  const notiColumns: object[] = [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      key: "at",
      title: "Thời gian tạo",
      dataIndex: "at",
      width: 200,
    },
    {
      key: "title",
      title: "Tiêu đề",
      dataIndex: "title",
      width: 200,
      ellipsis: true,
    },
    {
      key: "content",
      title: "Nội dung",
      dataIndex: "content",
      ellipsis: true,
    },
    {
      key: "deleted",
      title: "Trạng thái",
      dataIndex: "deleted",
      width: 220,
      align: "left",
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
      render: (value: number, item: any) => {
        return (
          <Row justify="space-between" align="middle">
            <Col>
              <Switch
                checkedChildren={<EyeOutlined />}
                unCheckedChildren={<EyeInvisibleOutlined />}
                defaultChecked={value === 0 ? true : false}
                loading={loadingQuesItem}
                onChange={(value) => changeStatusQuesHandler(value, item)}
              />
            </Col>
            <Col>
              <Row justify="end">
                {item.list_name_file?.length !== 0 ? (
                  <Badge count={item.list_name_file?.length} size="small">
                    <Avatar shape="square" size="small">
                      file
                    </Avatar>
                  </Badge>
                ) : (
                  <></>
                )}
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
  const onSuccess = (res: any) => {
    setLoading(false);
    const { list_notifi } = res.data;
    console.log(list_notifi);
    const notifi = [...list_notifi]
      .reverse()
      .map((item: any, index: number) => ({
        ...item,
        STT: index + 1,
        key: item.id_thongbao,
      }));
    dispatch(setListNotifi(notifi));
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
    notificationAPI
      .getAll(`${userInfo.accessToken}`)
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
    if (isRefetch && location.pathname === selectedTab) {
      getData();
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);

  return (
    <>
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
      <NotificationModal
        visible={visible}
        dataRender={selectedData}
        handleCancelModal={() => setVisible(false)}
      />
    </>
  );
}
