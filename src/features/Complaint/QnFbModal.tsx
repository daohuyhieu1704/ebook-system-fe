import {
  CheckOutlined,
  EditOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
} from "antd";
import axios from "axios";
import Select from "rc-select";
import React, { useEffect, useRef, useState } from "react";
import { ComplainAPI } from "../../api/OrderAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { ROLE, rolePair } from "../../constants/common";
import { selectUserInfo } from "../login/loginSlice";
import { NotiType } from "../Notification/NotificationSlice";
import type { RcFile } from "antd/es/upload/interface";
import { setIsRefetch } from "../layout/layoutSlice";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function QnFbModal({
  visible,
  dataRender,
  handleCancelModal,
  handleSetFbListUnanswered,
}: {
  visible: boolean;
  dataRender: any;
  handleCancelModal: () => void;
  handleSetFbListUnanswered: (x: string) => void;
}) {
  const dispatch = useAppDispatch();
  const [header, setHeader] = useState<any>();
  const userInfo = useAppSelector(selectUserInfo);
  const [textFeedback, setTextFeedback] = useState("");
  const usetInfo = useAppSelector(selectUserInfo);
  const [isDisableNewFeedback, setIsDisableNewFeedback] =
    useState<boolean>(false);
  const [donePost, setDonePost] = useState<boolean>(false);
  const [editRole, setEditRole] = useState<Boolean>(false);
  const BanRev = useRef(rolePair);
  const [receiver, setReceiver] = useState<number>(0);
  const [listUpload, setListUpload] = useState<any>([]);
  const [isUploadFile, setIsUploadFile] = useState<boolean>(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const handleSubmitFeedback = () => {
    setIsDisableNewFeedback(true);
    const formData = new FormData();
    formData.append("mathacmac", dataRender?.id);
    formData.append("mssv", dataRender?.mssv);
    formData.append("noidungtraloi", textFeedback);
    for (let x of listUpload) {
      formData.append("files", x.originFileObj);
    }
    ComplainAPI.send({
      id_rp: dataRender?.id,
      ndtl: textFeedback,
    })
      .then((res) => {
        setIsDisableNewFeedback(false);
        NotificationCustom({
          type: "success",
          message: "Success",
          description: "Gửi phản hồi thành công!",
        });
        handleSetFbListUnanswered(dataRender.mathacmac);
      })
      .then(() => {
        setIsDisableNewFeedback(true);
        setDonePost(true);
        dispatch(setIsRefetch(true));
        setTextFeedback("");
      })
      .catch((err) => {
        console.log("ee", err);
      });
  };

  const changeRoleHandler = (e: any) => {
    console.log("e", e.value);
    // ComplainAPI.changeRole({
    //   mathacmac: dataRender.mathacmac,
    //   role_changed: `${receiver}`,
    // })
    //   .then((res: any) => {
    //     NotificationCustom({
    //       type: "success",
    //       message: "Success",
    //       description: "Chuyển thắc mắc thành công!",
    //     });
    //     setIsRefetch(true);
    //   })
    //   .catch((err) => {
    //     console.log("ee", err);
    //   });
    // setEditRole(false);
  };

  const beforeUpload = (file: RcFile) => {
    setIsUploadFile(true);
    const isJPG = file.type === "image/jpeg";
    return false;
  };
  useEffect(() => {
    console.log(listUpload);
  }, [listUpload]);
  return (
    <Modal
      width={600}
      title="Chi tiết thắc mắc"
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
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Col span={24}>
                  <Text strong>Mã thắc mắc:</Text> {dataRender?.mathacmac}
                </Col>
                <Col span={24}>
                  <Text strong>Tên thắc mắc:</Text> {dataRender?.tenthacmac}
                </Col>
                <Col span={24}>
                  <Text strong>Thời gian:</Text> {dataRender?.thoigian}
                </Col>
                <Col span={24}>
                  <Text strong>Tình trạng:</Text>{" "}
                  {dataRender?.answered === 1 ? "Đã phản hồi" : "Chưa phản hồi"}
                </Col>
              </Col>
              <Col span={12}>
                <Col span={24}>
                  <Text strong>Người gửi:</Text> {dataRender?.hoten}
                </Col>
                <Col span={24}>
                  <Text>- MSSV:</Text> {dataRender?.mssv}
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={20}>
                      <Text strong>Tiếp nhận:</Text>{" "}
                      {editRole === true ? (
                        <select
                          name="banrev"
                          id="banrev"
                          defaultValue={dataRender?.role}
                          onChange={(e: any) => {
                            console.log("val", e.target.value);
                            setReceiver(e.target.value);
                          }}
                        >
                          {BanRev.current?.map((item) => (
                            <option key={item[1]} value={item[1]}>
                              {item[0]}
                            </option>
                          ))}
                        </select>
                      ) : (
                        `${
                          dataRender?.role >= 0
                            ? rolePair[dataRender?.role][0]
                            : ""
                        }`
                      )}
                    </Col>
                    <Col span={4}>
                      {usetInfo.role === ROLE.ADMIN &&
                      dataRender?.answered !== 1 ? (
                        editRole === true ? (
                          <Button size="small" onClick={changeRoleHandler}>
                            <CheckOutlined />
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            shape="circle"
                            onClick={() => setEditRole(true)}
                          >
                            <EditOutlined />
                          </Button>
                        )
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider orientation="left">Nội dung</Divider>
        <Row>
          <Col span={24}>{dataRender?.nd}</Col>
        </Row>
        <Divider orientation="left">Phản hồi</Divider>
        <Row gutter={16} justify="space-around" align="middle">
          <Col span={20}>
            <TextArea
              value={textFeedback}
              onChange={(e) => setTextFeedback(e.target.value)}
              placeholder="Trả lời..."
              autoSize={{ minRows: 1, maxRows: 5 }}
              disabled={isDisableNewFeedback || dataRender?.answered === 1}
            ></TextArea>
          </Col>
          <Col span={3}>
            <Row justify="space-between">
              <Col span={12}>
                <Button
                  type="primary"
                  onClick={handleSubmitFeedback}
                  disabled={
                    isDisableNewFeedback ||
                    dataRender?.answered === 1 ||
                    textFeedback.length === 0
                  }
                >
                  Gửi
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={1}>
            <Spin
              indicator={antIcon}
              spinning={isDisableNewFeedback}
              style={donePost === true ? { display: "none" } : {}}
            />
          </Col>
        </Row>
      </>
    </Modal>
  );
}
