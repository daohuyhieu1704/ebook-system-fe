import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  openDrawerBottom,
  selectDrawerBottomVisible,
  selectSelectedRows,
  setSelectedRows,
} from "../layout/layoutSlice";
import { selectUserInfo } from "../Login/LoginSlice";
import { Avatar, Col, Divider, Image, Row, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";
import { useNavigate } from "react-router-dom";
import { FAIL_IMG } from "../../constants/common";
import { theme } from "../../theme/theme";
import { useDispatch } from "react-redux";
import TableLayout from "../../components/TableLayout/TableLayout";
import { selectDataFeedback, setDataFeedback } from "./BookSlice";
import { FeedbackAPI } from "../../api/FeedbackAPI";

export default function BookDetail() {
  const dispatch = useDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const dataFeedback = useAppSelector(selectDataFeedback);
  const userInfo = useAppSelector(selectUserInfo);
  useEffect(() => {
    if (selectedRows[0]) {
      FeedbackAPI.getAllFeedbacks(selectedRows[0].id, `${userInfo.accessToken}`)
        .then((res) => {
          console.log(res);
          dispatch(setDataFeedback(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedRows]);

  const FeedbackColumns: object[] = [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      title: "Star",
      key: "start",
      dataIndex: "hoten",
      width: "200px",
    },
    {
      title: "Comment",
      key: "Comment",
      dataIndex: "Comment",
      width: "140px",
      elipsis: true,
      render: (data: string) => {
        return <div>{data}</div>;
      },
    },
  ];
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
          {" "}
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong style={{ marginRight: "0.5rem" }}>
              Tác giả:{" "}
            </Typography.Text>
            <Typography.Text>{selectedRows[0]?.Author.name}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong style={{ marginRight: "0.5rem" }}>
              Thể loại:{" "}
            </Typography.Text>
            <Typography.Text>{selectedRows[0]?.Category.name}</Typography.Text>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Typography.Text strong style={{ marginRight: "0.5rem" }}>
              Giá:{" "}
            </Typography.Text>
            <Typography.Text>{selectedRows[0]?.Price}</Typography.Text>
          </Row>
        </Row>
      </Col>
      <Divider type="vertical" style={{ height: "100%" }} />
      <Col span={17}>
        <Row align="stretch" justify="space-between">
          <Col>
            <Row
              align="middle"
              justify="space-between"
              style={{ marginBottom: "1rem" }}
            >
              <Typography.Title>Về tác giả:</Typography.Title>
            </Row>
            <Row
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              {" "}
              <Row style={{ marginTop: "1rem" }}>
                <Typography.Text strong style={{ marginRight: "0.5rem" }}>
                  Tên:{" "}
                </Typography.Text>
                <Typography.Text>
                  {selectedRows[0]?.Author.name}
                </Typography.Text>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Typography.Text strong style={{ marginRight: "0.5rem" }}>
                  Tiểu sử:{" "}
                </Typography.Text>
                <Typography.Text>
                  {selectedRows[0]?.Author.description}
                </Typography.Text>
              </Row>
            </Row>
          </Col>
          <Col>
            <Image
              width={200}
              src={selectedRows[0]?.Author.img}
              fallback={FAIL_IMG}
            />
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
              <Typography.Text strong>Phản hồi:</Typography.Text>
            </Row>
            <Row>
              <TableLayout
                checkbox={false}
                columns={FeedbackColumns}
                dataSource={dataFeedback}
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
