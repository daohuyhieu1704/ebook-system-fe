/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { createElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { theme } from "../../theme/theme";
import { selectIsLoggedIn, selectUserInfo } from "../login/loginSlice";
import {
  CustomHeader,
  CustomMenuItemDropdown,
  DrawerFooterButton,
  HeaderConfirm,
  UserInfo,
} from "./LayoutHeader.style";
import {
  Avatar,
  Button,
  DatePicker,
  DatePickerProps,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Typography,
} from "antd";
import { useLogout } from "../../hooks/useLogout";
import {
  closeDrawerBottom,
  closeDrawerRight,
  openDrawerRight,
  selectCollapsed,
  selectDisableSubmit,
  selectDrawerBottomVisible,
  selectDrawerRightVisible,
  selectIsLoadingSubmit,
  selectIsUpdateForm,
  toggleSidebar,
} from "./layoutSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { hasDatePicker, PATH } from "../../constants/common";
import NotificationForm from "../Notification/NotificationForm";
import FaqsForm from "../Faqs/FaqsForm";
import moment from "moment";
import { selectYear, setYear } from "../StudentsManager/StudentsManagerSlice";
import SearchFilter from "./components/SearchFilter";
import ViewMode from "./components/ViewMode";
import CRUDButtonList from "./components/CRUDButtonList";
import EmployeeManagerForm from "../EmployeeManager/EmployeeManagerForm";
import BookingForm from "../Booking/BookingForm";
import StudentDetail from "../StudentsManager/StudentDetail";
import RoomForm from "../Room/RoomForm";
import RoomDetail from "../Room/RoomDetail";
import BookingDetail from "../Booking/BookingDetail";
import TimeRegisterForm from "../TimeRegister/TimeRegisterForm";
import CsvcDetailForm from "../Csvc/CsvcDetail/CsvcDetailForm";
import { selectSearchRoom } from "../Csvc/CsvcSlice";
import DmCsvcForm from "../Csvc/DanhMucCSVC/DmCsvcForm";
const { confirm } = Modal;
const { Text, Title } = Typography;

interface FormsType {
  [key: string]: {
    formTitle: string;
    formRender?: JSX.Element;
    formName: string;
  };
}

interface DetailType {
  [key: string]: {
    detailTitle: string;
    cpnRender?: JSX.Element;
    cpnName: string;
  };
}

export const LayoutHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userInfo = useAppSelector(selectUserInfo);
  const logout = useLogout();
  const collapsed = useAppSelector(selectCollapsed);
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const drawerBottomVisible = useAppSelector(selectDrawerBottomVisible);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const isLoadingSubmit = useAppSelector(selectIsLoadingSubmit);
  const disableSubmit = useAppSelector(selectDisableSubmit);
  const searchRoom = useAppSelector(selectSearchRoom);
  const year = useAppSelector(selectYear);
  const location: any = useLocation();
  const [formTitle, setFormTitle] = useState<string>(location?.pathname);

  const details: DetailType = {
    [PATH.STUDENTS]: {
      detailTitle: "Chi tiết sinh viên",
      cpnRender: <StudentDetail />,
      cpnName: "Students",
    },
    [PATH.ROOM]: {
      detailTitle: "Chi tiết phòng",
      cpnRender: <RoomDetail />,
      cpnName: "Rooms",
    },
    [PATH.BOOKING]: {
      detailTitle: "Chi tiết lịch đặt phòng",
      cpnRender: <BookingDetail />,
      cpnName: "Booking",
    },
  };

  const forms: FormsType = {
    [PATH.NOTIFICATION]: {
      formTitle: !isUpdateForm ? "Tạo thông báo" : "Cập nhật thông báo",
      formRender: <NotificationForm formName={"Thông báo"} />,
      formName: "Thông báo",
    },
    [PATH.FAQS]: {
      formTitle: !isUpdateForm ? "Tạo câu hỏi" : "Sửa câu hỏi",
      formRender: <FaqsForm formName={"Faqs"} />,
      formName: "Faqs",
    },
    [PATH.EMPLOYEES]: {
      formTitle: !isUpdateForm ? "Tạo nhân viên" : "Sửa nhân viên",
      formRender: <EmployeeManagerForm formName={"Employees"} />,
      formName: "Employees",
    },
    [PATH.TIME_REGISTER]: {
      formTitle: !isUpdateForm ? "Tạo lịch đặt phòng" : "Sửa lịch đặt phòng",
      formRender: <TimeRegisterForm formName={"Time Register"} />,
      formName: "Time Register",
    },
    [PATH.ROOM]: {
      formTitle: !isUpdateForm ? "Tạo phòng" : "Sửa phòng",
      formRender: <RoomForm formName={"Room"} />,
      formName: "Room",
    },
    [PATH.DM_CSVC]: {
      formTitle: !isUpdateForm
        ? "Thêm danh mục cơ sở vật chất"
        : "Sửa danh mục cơ sở vật chất",
      formRender: <DmCsvcForm formName={"DmCsvc"} />,
      formName: "DmCsvc",
    },
    [PATH.CSVC_DETAIL]: {
      formTitle: !isUpdateForm
        ? "Thêm cơ sở vật chất"
        : "Sửa thông tin cơ sở vật chất",
      formRender: <CsvcDetailForm formName={"Csvc"} />,
      formName: "Csvc",
    },
  };

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const drawerRightOnClose = () => {
    dispatch(closeDrawerRight());
  };

  const drawerBottomOnClose = () => {
    dispatch(closeDrawerBottom());
  };

  const menu = (
    <Menu style={{ padding: "0" }}>
      <CustomMenuItemDropdown
        onClick={() => navigate(PATH.PROFILE)}
        key="1"
        icon={<UserOutlined />}
      >
        Cá nhân
      </CustomMenuItemDropdown>
      <CustomMenuItemDropdown
        danger={true}
        onClick={() => logout()}
        key="2"
        icon={<LogoutOutlined />}
      >
        Đăng xuất
      </CustomMenuItemDropdown>
    </Menu>
  );

  const menuNoti: any = [];

  const onChangeYear: DatePickerProps["onChange"] = (date, dateString) => {
    dispatch(setYear(dateString));
  };

  useEffect(() => {
    const loc = `${location?.pathname}`.split("/");
    if (loc.length >= 3) {
      setFormTitle(`/${loc[1]}/:id_phong`);
    } else {
      setFormTitle(location?.pathname);
    }
  }, [drawerRightVisible, location?.pathname]);

  return (
    <CustomHeader style={!isLoggedIn ? { display: "none" } : {}}>
      {location?.pathname === PATH.DASHBOARD ? (
        <>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: toggle,
          })}
          <div
            style={{
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <Title>Dashboard</Title>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: toggle,
          })}
          {location?.pathname && <CRUDButtonList path={location?.pathname} />}
          <SearchFilter path={location?.pathname} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Dropdown overlay={menuNoti} trigger={["click"]}>
          <Button shape="circle" type="link">
            <BellOutlined />
          </Button>
        </Dropdown>
        <Text code style={{ color: theme.colors.primary }}>
          {userInfo?.fullname}
        </Text>
        <HeaderConfirm>
          <Dropdown overlay={menu} trigger={["click"]}>
            <UserInfo>
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{ color: theme.colors.primary }}
              />
            </UserInfo>
          </Dropdown>
        </HeaderConfirm>
      </div>
      <Drawer
        title={forms[formTitle]?.formTitle}
        width={500}
        maskClosable={false}
        placement="right"
        onClose={drawerRightOnClose}
        visible={drawerRightVisible}
        footer={[
          <DrawerFooterButton
            disabled={disableSubmit}
            type="primary"
            form={forms[formTitle]?.formName}
            key="submit"
            htmlType="submit"
            size="large"
            loading={isLoadingSubmit}
          >
            {"Xác nhận"}
          </DrawerFooterButton>,
          <DrawerFooterButton
            key="back"
            onClick={drawerRightOnClose}
            size="large"
          >
            Hủy bỏ
          </DrawerFooterButton>,
        ]}
        headerStyle={{
          background: theme.colors.primary,
          color: "white",
          borderRadius: 0,
        }}
        footerStyle={{
          height: "70px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {forms[formTitle]?.formRender}
      </Drawer>
      <Drawer
        title={details[location?.pathname]?.detailTitle}
        height={"100vh"}
        placement="bottom"
        onClose={drawerBottomOnClose}
        visible={drawerBottomVisible}
        footer={[
          <Button key="back" onClick={drawerBottomOnClose} size="large">
            Hủy bỏ
          </Button>,
        ]}
        headerStyle={{
          background: theme.colors.primary,
          color: "white",
          borderRadius: 0,
        }}
        footerStyle={{
          height: "70px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {details[location?.pathname]?.cpnRender}
      </Drawer>
    </CustomHeader>
  );
};
