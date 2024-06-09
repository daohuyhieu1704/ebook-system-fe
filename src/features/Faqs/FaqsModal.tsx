import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Image,
  Input,
  Modal,
  Row,
  Spin,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FAIL_IMG } from "../../constants/common";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function FaqsModal({
  visible,
  dataRender,
  handleCancelModal,
}: {
  visible: boolean;
  dataRender: any;
  handleCancelModal: () => void;
}) {
  return (
    <Modal
      width={600}
      title="Chi tiết câu hỏi thường gặp"
      visible={visible}
      onOk={() => handleCancelModal}
      onCancel={handleCancelModal}
      destroyOnClose
      footer={[
        <Button key="back" onClick={handleCancelModal}>
          Cancel
        </Button>,
      ]}
    >
      <>
        <Col span={24}>
          <Text strong>Mã câu hỏi:</Text> {dataRender?.id}
        </Col>
        <Col span={24}>
          <Text strong>Câu hỏi:</Text> {dataRender?.cauhoi}
        </Col>
        <Col span={24}>
          <Text strong>Câu trả lời:</Text> {dataRender?.cautraloi}
        </Col>
        <Col span={24}>
          <Text strong>Trạng thái:</Text>{" "}
          {dataRender?.active === 0 ? "Hiển thị" : "Bị ẩn"}
        </Col>
        <Col span={24}>
          <Text strong>Người tạo:</Text> {dataRender?.creator}
        </Col>
        {/* <Col span={24}>
          <Text strong>File đính kèm:</Text>{" "}
          {dataRender.list_name_file?.length === 0 ? "Không có" : ""}
        </Col> */}
        {/* {dataRender.list_name_file?.map((src: { link_file: string }) => (
          <Row
            style={{
              marginTop: "20px",
            }}
            justify="center"
            key={`${dataRender.mach}-row`}
          >
            <Col span={24}>
              <Row justify="center">
                <Image
                  src={`${src.link_file}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = FAIL_IMG;
                  }}
                />
              </Row>
            </Col>
          </Row>
        ))} */}
      </>
    </Modal>
  );
}
