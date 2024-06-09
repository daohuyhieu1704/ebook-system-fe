import { EllipsisOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedRows } from "../layout/layoutSlice";
import TableLayout from "../../components/TableLayout/TableLayout";
import { SinhVienAPI } from "../../api/SinhVienAPI";
import { selectUserInfo } from "../login/loginSlice";
import PieChart from "../Chart/PieChart";
import ColumnChart from "../Chart/ColumnChart";
import VpDetail from "./components/VpDetail";

export default function StudentDetail() {
  const selectedRows = useAppSelector(selectSelectedRows);
  const userInfo = useAppSelector(selectUserInfo);
  const [dataVp, setDataVp] = useState<any[]>([]);
  const [dataCutru, setDataCutru] = useState<any[]>([]);
  const [isShowVpDetail, setIsShowVpDetail] = useState<boolean>(false);
  const [sVienWithVP, setSVienWithVP] = useState<
    {
      tennganh: string;
      soluong: number;
    }[]
  >([]);
  const handleShowVp = () => {
    console.log("show");
    setIsShowVpDetail(!isShowVpDetail);
  };
  const columnCuTru: object[] = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: "40px",
    },
    {
      title: "Học kỳ",
      dataIndex: "hk",
      key: "hk",
    },
    {
      title: "Phòng",
      key: "phong",
      dataIndex: "phong",
    },
  ];
  const columnViPham: object[] = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: "40px",
    },
    {
      title: "Thời gian",
      dataIndex: "at",
      key: "at",
      width: "100px",
    },
    {
      title: "Mức độ",
      key: "mucdo",
      dataIndex: "mucdo",
      width: "70px",
    },
    {
      title: "Lí do",
      key: "title",
      dataIndex: "title",
      ellipsis: "true",
      render: (data: string) => {
        return (
          <Row justify="space-between" align="middle">
            <Typography.Text>{data}</Typography.Text>
            {/* <Button size="small" onClick={handleShowVp}>
              <EllipsisOutlined />
            </Button> */}
          </Row>
        );
      },
    },
  ];
  useEffect(() => {
    console.log(selectedRows);
    SinhVienAPI.getViolationSV(selectedRows[0]?.mssv, `${userInfo.accessToken}`)
      .then((res) => {
        const data = res.data.data
          .reverse()
          .map((item: any, index: number) => ({
            ...item,
            STT: index + 1,
            key: item.id_phat,
            at: new Date(parseInt(item.at)).toLocaleString(),
          }));
        setDataVp(data);
        console.log("dataVp", dataVp);
        setSVienWithVP(
          dataVp.map((item: any) => ({
            tennganh: `${item.at}`,
            soluong: 2,
          }))
        );
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    SinhVienAPI.getHistoryRoom(selectedRows[0]?.mssv, `${userInfo.accessToken}`)
      .then((res) => {
        const data = res.data.data
          .reverse()
          .map((item: any, index: number) => ({
            ...item,
            STT: index + 1,
            key: `${item.hk}-${item.phong}`,
          }));
        setDataCutru(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedRows, userInfo.accessToken]);
  return (
    <Row justify="start" style={{ height: "100%" }}>
      <Col
        span={6}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Row>
          <Avatar size={60} icon={<UserOutlined />} />
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Typography.Text strong>{selectedRows[0]?.hoten}</Typography.Text>
        </Row>
        <Divider style={{ width: "100%" }} />
        <Row
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>MSSV: </Typography.Text>
            <Typography.Text>{selectedRows[0]?.mssv}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>Lớp: </Typography.Text>
            <Typography.Text>{selectedRows[0]?.lop}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>Ngày sinh: </Typography.Text>
            <Typography.Text>{selectedRows[0]?.ngaysinh}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>Giới tính: </Typography.Text>
            <Typography.Text>
              {`${selectedRows[0]?.gioitinh}` === "1" ? "Nữ" : "Nam"}
            </Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>Quê quán: </Typography.Text>
            <Typography.Text>{selectedRows[0]?.diachi}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>SĐT: </Typography.Text>
            <Typography.Text>{selectedRows[0]?.sdt}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>Email: </Typography.Text>
            <Typography.Text>{selectedRows[0]?.email}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>Họ tên cha: </Typography.Text>
            <Typography.Text>{selectedRows[0]?.hotencha}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong>Họ tên mẹ: </Typography.Text>
            <Typography.Text>{selectedRows[0]?.hotenme}</Typography.Text>
          </Row>
        </Row>
      </Col>
      <Divider type="vertical" style={{ height: "100%" }} />
      <Col span={17}>
        <Row>
          <Row justify="space-around">
            <Col span={8}>
              <Row
                align="middle"
                justify="space-between"
                style={{ marginBottom: "1rem" }}
              >
                <Typography.Text strong>Lịch sử cư trú</Typography.Text>
                {/* <Button>In thông tin</Button> */}
              </Row>
              <Row>
                <TableLayout
                  checkbox={false}
                  columns={columnCuTru}
                  dataSource={dataCutru}
                  loading={false}
                  total={5}
                  setOffset={5}
                  size="small"
                />
              </Row>
            </Col>
            <Col span={14}>
              <Row
                align="middle"
                justify="space-between"
                style={{ marginBottom: "1rem" }}
              >
                <Typography.Text strong>Vi phạm</Typography.Text>
                {/* <Button>In thông tin</Button> */}
              </Row>
              <Row>
                <TableLayout
                  checkbox={false}
                  columns={columnViPham}
                  dataSource={dataVp}
                  loading={false}
                  total={5}
                  setOffset={5}
                  size="small"
                  //   expandable={{
                  //     expandedRowRender: (record: any) => <VpDetail record={record}/>,
                  //     rowExpandable: (record: any) => record.name !== 'Not Expandable',
                  //   }}
                />
              </Row>
            </Col>
          </Row>
        </Row>
        <Divider style={{ width: "100%" }} />
        {/* <Row>
                <ColumnChart height={100} width={200} data={sVienWithVP} color={'green'}/>
            </Row> */}
      </Col>
    </Row>
  );
}
