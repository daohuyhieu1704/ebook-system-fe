import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CsvcAPI } from "../../../api/CsvcAPI";
import { selectUserInfo } from "../../login/loginSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NotificationCustom } from "../../../components/NotificationCustom/NotificationCustom";
import {
  selectDataCSVC,
  selectMaterial,
  setDataCSVC,
  setMaterial,
  setSearchRoom,
} from "../CsvcSlice";
import TableLayout from "../../../components/TableLayout/TableLayout";
import { theme } from "../../../theme/theme";
import { Badge, Col, Row, Typography } from "antd";
import ButtonFeature from "../../../components/ButtonFeature/ButtonFeature";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../../layout/layoutSlice";

export default function CsvcDetail() {
  const param = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>([]);
  const userInfo = useAppSelector(selectUserInfo);
  const data = useAppSelector(selectDataCSVC);
  const material = useAppSelector(selectMaterial);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  function changeHandler(item: any) {
    setSelectedData(item);
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
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
      elipsis: true,
      render: (data: number, item: any) => {
        return (
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Text>{data}</Typography.Text>
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
    },
  ];
  const getData = () => {
    //setLoading(true);
    const { id_phong } = param;
    if (id_phong) {
      CsvcAPI.getAllMaterialFacility(`${userInfo?.accessToken}`)
        .then((res) => {
          const dataMat = res.data.data;
          const material: { [key: string]: any } = {};
          for (const item of dataMat) {
            material[`${item.id}`] = item;
          }
          dispatch(setMaterial(material));
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    CsvcAPI.getAllRoomFacility(`${userInfo?.accessToken}`).then((res2) => {
      setLoading(false);
      const idFalList = res2.data.data.filter(
        (item: any) => item.id_phong === param.id_phong
      );
      const listCSVC = idFalList.map((item: any, index: number) => ({
        ...material[item.id_csvc],
        soluong: item.soluong,
        STT: index + 1,
        key: item.id_csvc,
      }));
      console.log("kikiki", listCSVC);
      dispatch(setDataCSVC(listCSVC));
      NotificationCustom({
        type: "success",
        message: "Thành công",
        description: `${res2.data.message}`,
      });
    });
  }, [material]);

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
    <TableLayout
      checkbox={false}
      columns={columns}
      dataSource={data}
      loading={loading}
      total={count}
      setOffset={setOffset}
    />
  );
}
