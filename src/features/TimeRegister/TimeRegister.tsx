import { useEffect, useState } from "react";
import TableLayout from "../../components/TableLayout/TableLayout";
import { TimeRegisterAPI } from "../../api/TimeRegisterAPI";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { selectSchedule, setSchedule } from "./TimeRegisterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../login/loginSlice";
import { theme } from "../../theme/theme";
import { setDataBooking } from "../Booking/BookingSlice";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import { useLocation } from "react-router-dom";

export default function TimeRegister() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const data = useAppSelector(selectSchedule);
  const userInfo = useAppSelector(selectUserInfo);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const today = new Date().getTime();
  const scheduleColumns: object[] = [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      key: "hk",
      title: "Học kỳ",
      dataIndex: "hk",
      width: 100,
    },
    {
      key: "type",
      title: "Loại",
      dataIndex: "type",
      width: 200,
      render: (data: string) => (data === "0" ? "Ưu tiên" : "Thường"),
    },
    {
      key: "start",
      title: "Bắt đầu",
      dataIndex: "start",
      width: 200,
      render: (data: string) => new Date(parseInt(data)).toLocaleString(),
    },
    {
      key: "end",
      title: "Kết thúc",
      dataIndex: "end",
      width: 200,
      render: (data: string) => new Date(parseInt(data)).toLocaleString(),
    },
  ];
  const getData = () => {
    setLoading(true);
    TimeRegisterAPI.getAll(`${userInfo?.accessToken}`)
      .then((res: any) => {
        onSuccess(res);
      })
      .catch((err) => {
        onError(err);
      });
  };
  const onSuccess = (res: any) => {
    setLoading(false);
    const { data } = res.data;
    const schedule = [...data].reverse().map((item: any, index: number) => ({
      ...item,
      STT: index + 1,
      key: item.id_dangky,
    }));
    dispatch(setSchedule(schedule));

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
        return record.end < today ? "table-row-gray" : "table-row-dark";
      }}
      checkbox={false}
      columns={scheduleColumns}
      dataSource={data}
      loading={loading}
      total={count}
      setOffset={setOffset}
    />
  );
}
