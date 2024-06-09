import { Avatar, Badge, Button, Card, Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CsvcAPI } from "../../api/CsvcAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import TableLayout from "../../components/TableLayout/TableLayout";
import { useLogout } from "../../hooks/useLogout";
import { theme } from "../../theme/theme";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import CsvcModal from "./CsvcModal";
import {
  selectReportCSVCList,
  setReportCSVCList,
  setSearchRoom,
} from "./CsvcSlice";
import { RoomAPI } from "../../api/RoomAPI";
import { selectUserInfo } from "../login/loginSlice";

export default function Csvc() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<any>([]);
  const [roomList, setRoomList] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>([]);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const data = useAppSelector(selectReportCSVCList);
  const userInfo = useAppSelector(selectUserInfo);
  const onSuccess = (res: any) => {
    setLoading(false);
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: `${res.data.message}`,
    });
    const data = res.data.data.reverse().map((data: any, index: number) => ({
      key: data.code_rp,
      STT: index + 1,
      ...data,
    }));
    dispatch(setReportCSVCList(data));
  };
  const onError = (err: any) => {
    setLoading(false);
    NotificationCustom({
      type: "error",
      message: "Error",
      description: err.data?.message,
    });
  };
  function handleClickRoom(id_phong: string) {
    dispatch(setSearchRoom(id_phong));
    console.log(id_phong);
    navigate(`/csvc/${id_phong}`, { replace: false });
  }
  const getData = () => {
    RoomAPI.getAll(`${userInfo.accessToken}`)
      .then((res) => {
        const roomData = res.data.data;
        const SetOfLabel = new Set(
          roomData.map((item: any) =>
            item.id_phong.substring(0, item.id_phong.search(/\d/))
          )
        );
        setRoomList(roomData);
        setLabel(Array.from(SetOfLabel));
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
      {label.map((item: string) => (
        <div key={item}>
          <Divider orientation="left">Dãy {item}</Divider>
          <Row gutter={16} key={item}>
            {roomList
              .filter((x: any) => x.id_phong.includes(item))
              .reverse()
              .map((room: any) => (
                <Col
                  key={room.id_phong}
                  className="gutter-row"
                  span={6}
                  style={{ marginTop: "1rem" }}
                >
                  <Card
                    hoverable
                    key={room.id_phong}
                    onClick={() => handleClickRoom(room.id_phong)}
                  >
                    {room.id_phong}
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      ))}
    </>
  );
}
