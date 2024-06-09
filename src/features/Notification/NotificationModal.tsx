import { LoadingOutlined } from '@ant-design/icons';
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
} from 'antd';
import axios from 'axios';
import React, { useEffect, useId, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import AttachedImg from '../../components/ModalContainer/AttachedImg';
import { NotificationCustom } from '../../components/NotificationCustom/NotificationCustom';
import DPFInstance from '../../components/PDFView/DPFInstance';
import { FAIL_IMG } from '../../constants/common';
import { selectUserInfo } from '../login/loginSlice';
import { NotiType } from '../Notification/NotificationSlice';

const { Title, Text, Paragraph } = Typography;

export default function NotificationModal({
  visible,
  dataRender,
  handleCancelModal,
}: {
  visible: boolean;
  dataRender: any;
  handleCancelModal: () => void;
}) {
  const dispatch = useAppDispatch();
  const [header, setHeader] = useState<any>();
  const [textFeedback, setTextFeedback] = useState('');
  const [isDisableNewFeedback, setIsDisableNewFeedback] = useState<boolean>(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    setHeader(
      <Row>
        <Col span={24}>
          <Col span={24}>
            <Text strong>Mã thông báo:</Text> {dataRender?.matb}
          </Col>

          <Col span={24}>
            <Text strong>Thời gian:</Text> {dataRender?.at}
          </Col>
          <Row>
            <Col span={24}>
              <Text strong>Tiêu đề:</Text> {dataRender?.title}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }, [dataRender]);
  useEffect(() => {
    console.log('dfdfd11',dataRender);

  }, [])
  return (
    <Modal
      width={1000}
      title='Chi tiết thông báo'
      visible={visible}
      onOk={() => handleCancelModal}
      onCancel={handleCancelModal}
      destroyOnClose
      footer={[
        <Button key='back' onClick={handleCancelModal}>
          Thoát
        </Button>,
      ]}
    >
      <>
        <Row>
          <Col span={24}>{header}</Col>
        </Row>
        <Divider orientation='left'>Nội dung</Divider>
        {dataRender?.content?.split('\n').map((item: string, index: number) => (
          <Row key={`content-${index}`}>
            <Col span={24}>
              <Paragraph>
                {item}
              </Paragraph>
            </Col>
          </Row>
        ))}
        <Divider orientation='left'>Tệp đính kèm</Divider>
        <AttachedImg imgList={dataRender?.list_name_file} />
      </>
    </Modal>
  );
}
