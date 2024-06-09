import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  openDrawerBottom,
  selectDrawerBottomVisible,
  selectSelectedRows,
  setSelectedRows,
} from "../layout/layoutSlice";
import { selectUserInfo } from "../login/loginSlice";
import { Avatar, Button, Col, Divider, Row, Typography } from "antd";
import { EllipsisOutlined, HomeOutlined } from "@ant-design/icons";
import TableLayout from "../../components/TableLayout/TableLayout";
import { SinhVienAPI } from "../../api/SinhVienAPI";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/common";
import { theme } from "../../theme/theme";
import { useDispatch } from "react-redux";
import VpDetail from "../StudentsManager/components/VpDetail";
import { CsvcAPI } from "../../api/CsvcAPI";
import { DashboardAPI } from "../../api/DashboardAPI";

export default function BookingDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const userInfo = useAppSelector(selectUserInfo);
  const isCloseBottomDrawer = useAppSelector(selectDrawerBottomVisible);
  //const [isShowVpDetail, setIsShowVpDetail] = useState<boolean>(false);
  const [dataStu, setDataStu] = useState<any[]>([]);
  const [dataVp, setDataVp] = useState<any[]>([]);
  const [dataCsvc, setDataCsvc] = useState<any[]>([]);
  const [currSemester, setCurrSemester] = useState<string>();
  function changeHandler(item: any) {
    navigate(PATH.STUDENTS);
    dispatch(openDrawerBottom());
    dispatch(setSelectedRows([item]));
  }
  const columnViPham: object[] = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: "40px",
    },
    {
      title: "MSSV",
      dataIndex: "mssv",
      key: "mssv",
    },
    {
      title: "Thời gian",
      dataIndex: "at",
      key: "at",
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
          </Row>
        );
      },
    },
  ];
  const StuColumns: object[] = [
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
      width: "120px",
    },
    {
      title: "Họ tên",
      key: "hoten",
      dataIndex: "hoten",
      width: "200px",
    },
    {
      title: "Lớp",
      key: "lop",
      dataIndex: "lop",
      width: "140px",
      elipsis: true,
      render: (data: string) => {
        return <div>{data}</div>;
      },
    },
    {
      key: "options",
      title: "",
      dataIndex: "options",
      align: "right",
      width: 160,
      render: (data: number, item: any) => {
        return (
          <ButtonFeature
            item={item}
            changeHandler={() => changeHandler(item)}
            onlyDetail={true}
          />
        );
      },
    },
  ];
  const CsvcColumns: object[] = [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      title: "Loại",
      dataIndex: "loai",
      key: "loai",
      width: "120px",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      width: "120px",
    },
    {
      title: "Giá",
      dataIndex: "gia",
      key: "gia",
      width: "120px",
    },
    {
      title: "Mô tả",
      key: "mota",
      dataIndex: "mota",
      width: "200px",
    },
    {
      key: "options",
      title: "",
      dataIndex: "options",
      align: "right",
      width: 160,
      render: (data: any, item: any) => {
        return (
          <Row justify="space-between" align="middle">
            <Typography.Text>{data}</Typography.Text>
            <ButtonFeature
              item={item}
              changeHandler={() => changeHandler(item)}
            />
          </Row>
        );
      },
    },
  ];
  useEffect(() => {
    console.log(selectedRows[0]);
    DashboardAPI.getCurrentSemester()
      .then((res) => {
        setCurrSemester(res.data.curr_semester);
      })
      .catch((err) => {});
    SinhVienAPI.GetStuInRoom(
      {
        hocki: currSemester ? currSemester : "20232",
        phong: selectedRows[0]?.id_phong,
      },
      `${userInfo.accessToken}`
    )
      .then((res) => {
        setDataStu(
          res.data.data.map((item: any, index: number) => ({
            ...item,
            key: item.mssv,
            STT: index + 1,
          }))
        );
      })
      .catch((err) => {});
    CsvcAPI.getAllRoomFacility(`${userInfo.accessToken}`)
      .then((res) => {
        setDataCsvc(
          res.data.data.map((item: any, index: number) => ({
            ...item,
            key: item.id_csvc,
            STT: index + 1,
          }))
        );
        console.log(res.data.data);
      })
      .catch((err) => {});
  }, [selectedRows]);
  useEffect(() => {
    if (dataStu.length > 0) {
      for (let student of dataStu) {
        SinhVienAPI.getViolationSV(student.mssv, `${userInfo.accessToken}`)
          .then((data: any) => {
            setDataVp([
              ...dataVp,
              ...data.data.data.map((item: any, indexA: number) => ({
                ...item,
                key: item.id_phat,
                at: new Date(parseInt(item.at)).toLocaleString(),
              })),
            ]);
          })
          .catch((err: any) => {});
      }
      setDataVp(
        dataVp.map((item: any, index: number) => ({
          ...item,
          STT: index + 1,
        }))
      );
      console.log(dataVp);
    }
  }, [dataStu]);
  useEffect(() => {
    setDataVp([]);
    setDataStu([]);
  }, [isCloseBottomDrawer]);
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
          <Avatar size={60} icon={<HomeOutlined />} />
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Typography.Text strong>{selectedRows[0]?.id_phong}</Typography.Text>
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
            <Typography.Text strong style={{ marginRight: "0.5rem" }}>
              Loại:{" "}
            </Typography.Text>
            <Typography.Text>
              {selectedRows[0]?.loai === 0 ? "Thường" : "Đặc biệt"}
            </Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong style={{ marginRight: "0.5rem" }}>
              Cho:{" "}
            </Typography.Text>
            <Typography.Text>
              {selectedRows[0]?.gioitinh === 0 ? "Nam" : "Nữ"}
            </Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong style={{ marginRight: "0.5rem" }}>
              Sức chứa:{" "}
            </Typography.Text>
            <Typography.Text>{selectedRows[0]?.succhua}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong style={{ marginRight: "0.5rem" }}>
              Giá:{" "}
            </Typography.Text>
            <Typography.Text>{selectedRows[0]?.gia}</Typography.Text>
          </Row>
        </Row>
      </Col>
      <Divider type="vertical" style={{ height: "100%" }} />
      <Col span={17}>
        <Row>
          <Col>
            <Row
              align="middle"
              justify="space-between"
              style={{ marginBottom: "1rem" }}
            >
              <Typography.Text strong>Sinh viên trọ:</Typography.Text>
              {/* <Button>In thông tin</Button> */}
            </Row>
            <Row>
              <TableLayout
                checkbox={false}
                columns={StuColumns}
                dataSource={dataStu}
                loading={false}
                total={5}
                setOffset={5}
                size="small"
                // expandable={{
                //   expandedRowRender: (record: any) => <VpDetail record={record}/>,
                //   rowExpandable: (record: any) => record.name !== 'Not Expandable',
                // }}
              />
            </Row>
          </Col>
        </Row>
        <Divider style={{ width: "100%" }} />
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <Row
              align="middle"
              justify="space-between"
              style={{ marginBottom: "1rem" }}
            >
              <Typography.Text strong>Cơ sở vật chất:</Typography.Text>
              {/* <Button>In thông tin</Button> */}
            </Row>
            <Row>
              <TableLayout
                checkbox={false}
                columns={CsvcColumns}
                dataSource={dataCsvc}
                loading={false}
                total={5}
                setOffset={5}
                size="small"
                // expandable={{
                //   expandedRowRender: (record: any) => <VpDetail record={record}/>,
                //   rowExpandable: (record: any) => record.name !== 'Not Expandable',
                // }}
              />
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
