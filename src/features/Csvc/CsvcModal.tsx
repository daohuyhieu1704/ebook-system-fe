import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Col,
  Divider,
  Image,
  Input,
  Modal,
  Row,
  Spin,
  Typography,
  Upload,
} from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { petitionAPI } from '../../api/PetitionAPI';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NotificationCustom } from '../../components/NotificationCustom/NotificationCustom';
import { FAIL_IMG } from '../../constants/common';
import { useLogout } from '../../hooks/useLogout';
import { selectUserInfo } from '../login/loginSlice';
const { Title, Text } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

export default function CsvcModal({
  visible,
  dataRender,
  handleCancelModal,
  handleSetPetitionList,
}: {
  visible: boolean;
  dataRender: any;
  handleCancelModal: () => void;
  handleSetPetitionList: (x: string) => void;
}) {
  const dispatch = useAppDispatch();
  const [header, setHeader] = useState<any>();
  const userInfo = useAppSelector(selectUserInfo);
  const [textFeedback, setTextFeedback] = useState('');
  const [isDisableNewFeedback, setIsDisableNewFeedback] =
    useState<boolean>(false);
  const [donePost, setDonePost] = useState<boolean>(false);
  const [listUpload, setListUpload] = useState<any>([]);
  const [isUploadFile, setIsUploadFile] = useState<boolean>(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  useEffect(() => {
    // axios({
    //     method: 'get',
    //     url: `${process.env.REACT_APP_ENDPOINT}emp_role/student/get_stu`,
    //     headers: {
    //         'authorization': `Bearer ${userInfo?.accessToken}`
    //     },
    //     params: {
    //         mssv: dataRender?.mssv
    //     }
    // }).then(res => {
    //     console.log('res mssv', res)
    // }).catch(err => {
    //         console.log('ee',err);
    //     });
    console.log('dataRender', dataRender);
    setHeader(
      <Row>
        <Col span={12}>
          <Col span={24}>
            <Text strong>Mã yêu cầu:</Text> {dataRender?.code_rp}
          </Col>
          <Col span={24}>
            <Text strong>Tên yêu cầu:</Text> {dataRender?.name}
          </Col>
          <Col span={24}>
            <Text strong>Thời gian:</Text> {dataRender?.thoigian}
          </Col>
        </Col>
      </Row>
    );
  }, [dataRender]);

  const handleSubmitFeedback = () => {
    setIsDisableNewFeedback(true);
    console.log('dataRender', dataRender);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_ENDPOINT}emp_role/question/answer`,
      headers: {
        authorization: `Bearer ${userInfo?.accessToken}`,
      },
      data: {
        mathacmac: dataRender?.mathacmac,
        mssv: dataRender?.mssv,
        noidungtraloi: textFeedback,
      },
    })
      .then((res) => {
        setIsDisableNewFeedback(false);
        NotificationCustom({
          type: 'success',
          message: 'Success',
          description: 'Gửi phản hồi thành công!',
        });
        handleSetPetitionList(dataRender.mathacmac);
      })
      .then(() => {
        setIsDisableNewFeedback(true);
        setDonePost(true);
      })
      .catch((err) => {

        console.log('ee', err);
      });
  }

  const beforeUpload = (file: RcFile) => {
    setIsUploadFile(true);
    const isJPG = file.type === 'image/jpeg';
    return false;
  }

  const confirmResolvedHandler = () => {
    confirm({
      title: 'Xác nhận',
      content: 'Bạn chắc chắn đã giải quyết xong biểu mẫu này?',
      onOk: () => {
        axios({
          method: 'POST',
          url: `${process.env.REACT_APP_ENDPOINT}emp_role/form/solved`,
          headers: {
            authorization: `Bearer ${userInfo?.accessToken}`,
          },
          data: {
            ma_yeu_cau: `${dataRender?.ma_yeu_cau}`,
          },
        })
          // petitionAPI
          //   .resolved(
          //     {
          //       authorization: `Bearer ${userInfo?.accessToken}`,
          //     },
          //     {
          //       ma_yeu_cau: `${dataRender?.ma_yeu_cau}`,
          //     }
          //   )
          .then((res: any) => {
            console.log('res', res);
            handleSetPetitionList(dataRender?.ma_yeu_cau);
            NotificationCustom({
              type: 'success',
              message: 'Thành công',
              description: `${res.data?.message}`,
            });
          })
          .catch((err: any) => {
            console.log('err', err);
          });
      },
    });
  };
  return (
    <Modal
      width={800}
      style={{ top: 40 }}
      title='Nội dung chi tiết'
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
        <Divider orientation='left'>Nội dung báo cáo</Divider>
        <Row>
          <Col span={24}>{dataRender?.noi_dung}</Col>
        </Row>
        {dataRender.list_name_file?.map(
          (src: { link_file: string }, index: number) => (
            <Row
              key={`row-${dataRender.key}-${index}`}
              style={{
                marginTop: '20px',
              }}
              justify='center'
            >
              <Col span={24} key={`col-${dataRender.key}-${index}`}>
                <Image
                  key={`img-${dataRender.key}-${index}`}
                  src={`${src.link_file}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = FAIL_IMG;
                  }}
                />
              </Col>
            </Row>
          )
        )}
      </>
    </Modal>
  );
}
