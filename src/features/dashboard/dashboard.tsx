import {
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Card,
  Divider,
  Col,
  Row,
  Button,
  Input,
  Form,
  InputNumber,
} from "antd";
import Item from "antd/lib/list/Item";
import { useEffect, useState } from "react";
import { DashboardAPI } from "../../api/DashboardAPI";
import { ComplainAPI } from "../../api/ComplainAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { useLogout } from "../../hooks/useLogout";
import colors from "../../theme/colors";
import ColumnChart from "../Chart/ColumnChart";
import { CliToSerLogin, selectUserInfo } from "../login/loginSlice";
import {
  setTotalAccount,
  selectTotalAccount,
  selectFeedback,
  setTotalNotification,
  selectTotalNotification,
} from "./DashboardSlice";
import TopCard from "./components/TopCard";

const { Title, Text } = Typography;

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [cVien, setCVien] = useState<number>(0);
  const [sVien, setSVien] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [sVienWithSpec, setSVienWithSpec] = useState<
    {
      tennganh: string;
      soluong: number;
    }[]
  >([]);
  const [sVienWithHC, setSVienWithHC] = useState<
    {
      tennganh: string;
      soluong: number;
    }[]
  >([]);
  const [sVienWithTC, setSVienWithTC] = useState<
    {
      tennganh: string;
      soluong: number;
    }[]
  >([]);
  const [petitionPending, setPetitionPending] = useState<number>(0);
  const [petitionConsidered, setPetitionConsidered] = useState<number>(0);
  const [qPending, setQPending] = useState<number>(0);
  const [qConsidered, setQConsidered] = useState<number>(0);
  const [tcNoti, setTcNoti] = useState<number>(0);
  const [hcNoti, setHcNoti] = useState<number>(0);
  const totalAccount = useAppSelector(selectTotalAccount);
  const totalFeedback = useAppSelector(selectFeedback);
  const totalNotification = useAppSelector(selectTotalNotification);
  const [resQ, setResQ] = useState<any[]>([]);
  const [resBM, setResBM] = useState<any[]>([]);
  const [form] = Form.useForm();
  const userInfo = useAppSelector(selectUserInfo);

  const getData = () => {
    setLoading(true);
    // DashboardAPI.getTotalSVCV()
    //   .then((data) => {
    //     setCVien(data?.data.slcv);
    //     setSVien(data?.data.slsv);
    //     setLoading(true);
    //     dispatch(
    //       setTotalAccount({
    //         cVien,
    //         sVien,
    //       })
    //     );
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     NotificationCustom({
    //       type: 'error',
    //       message: 'Error',
    //       description: error.response.data.message,
    //     });

    //   });
    // DashboardAPI.getTotalQ()
    //   .then((data) => {
    //     setQPending(data?.data.numAnswered);
    //     setQConsidered(data?.data.numNotAnsweredYet);
    //     dispatch(setTotalQ(data?.data.numNotAnsweredYet));
    //     setLoading(true);
    //     // dispatch(
    //     //   setTotalAccount({
    //     //     cVien,
    //     //     sVien,
    //     //   })
    //     // );
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     NotificationCustom({
    //       type: 'error',
    //       message: 'Error',
    //       description: error.response.data.message,
    //     });
    //   });
    // DashboardAPI.getTotalPetition()
    //   .then((data) => {
    //     setPetitionPending(data?.data.notSolvedYet);
    //     setPetitionConsidered(data?.data.solved);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     NotificationCustom({
    //       type: 'error',
    //       message: 'Error',
    //       description: error.response.data.message,
    //     });

    //   });
    // DashboardAPI.getSVWithSpecialized()
    //   .then((data) => {
    //     setSVienWithSpec([...data?.data?.data])
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     NotificationCustom({
    //       type: 'error',
    //       message: 'Error',
    //       description: error.response.data.message,
    //     });

    //   });
    // DashboardAPI.getSVWithSpecializedHC()
    //   .then((data) => {
    //     const newVal = data?.data?.data.map((item: any) => ({
    //       tennganh: item.tenlop,
    //       soluong: item.slsv,
    //     }))
    //     setSVienWithHC(newVal);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     NotificationCustom({
    //       type: 'error',
    //       message: 'Error',
    //       description: error.response.data.message,
    //     });

    //   });
    // DashboardAPI.getSVWithSpecializedTC()
    //   .then((data) => {
    //     const newVal = data?.data?.data.map((item: any) => ({
    //       soluong: item.slsv,
    //       tennganh: item.tenlop,
    //     }))
    //     setSVienWithTC(newVal)
    //     setLoading(true);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     NotificationCustom({
    //       type: 'error',
    //       message: 'Error',
    //       description: error.response.data.message,
    //     });

    //   });
    // QuestionFeedbackAPI.getTimeResQ().then((data) => {
    //   console.log('res dfwrfwg', data.data.time);
    //   setLoading(true);
    //   setResQ([{
    //     ma_loai_yeu_cau: 'phtm',
    //     ten_loai_yeu_cau: 'Thời gian phản hồi',
    //     thoi_gian_phan_hoi: data?.data?.time
    //   }]);
    //   dispatch(setResQuestion(data.data.time));
    // }).catch((error) => {
    //   setLoading(false);
    //   NotificationCustom({
    //     type: 'error',
    //     message: 'Error',
    //     description: error.response.data.message,
    //   });
    // });
    // DashboardAPI.resBM().then((data) => {
    //   console.log('resee', data.data.data);
    //   setLoading(true);
    //   setResBM(data.data.data);
    // }).catch((error) => {
    //   setLoading(false);
    //   NotificationCustom({
    //     type: 'error',
    //     message: 'Error',
    //     description: error.response.data.message,
    //   });
    // });
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const onFinish = (values: any) => {
    for (let item of Object.entries(values)) {
      let [key, value]: [string, any] = item;
      // DashboardAPI.
      //   chageRes(key, value).then(res => {
      //   }).catch(error => {

      //   })
    }
  };

  const onFill = () => {
    form.setFieldsValue(
      resBM.reduce((acc, item) => {
        acc[item.ma_loai_yeu_cau] = parseInt(item.thoi_gian_phan_hoi);
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16} justify="space-between">
          <TopCard
            value={2}
            title={"Tổng số phòng"}
            icon={"a"}
            stroke={colors.sortBlue}
          />
          <TopCard
            value={2}
            title={"Phản hồi"}
            icon={"a"}
            stroke={colors.sortBlue}
          />
          <TopCard
            value={2}
            title={"Lỗi vi phạm trong tuần"}
            icon={"a"}
            stroke={colors.sortBlue}
          />
          <TopCard
            value={2}
            title={"Lỗi vi phạm trong tuần"}
            icon={"a"}
            stroke={colors.sortBlue}
          />
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
