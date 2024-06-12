import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  openDrawerBottom,
  selectDrawerBottomVisible,
  selectSelectedRows,
  setSelectedRows,
} from "../layout/layoutSlice";
import { selectUserInfo } from "../login/loginSlice";
import { Avatar, Col, Divider, Image, Row, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";
import { useNavigate } from "react-router-dom";
import { FAIL_IMG } from "../../constants/common";
import { theme } from "../../theme/theme";
import { useDispatch } from "react-redux";

export default function BookDetail() {
  const dispatch = useDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  useEffect(() => {
    console.log(selectedRows[0]);
  }, [selectedRows]);
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
      </Col>
    </Row>
  );
}
