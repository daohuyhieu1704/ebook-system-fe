import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { createElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../theme/theme";
import {
  selectIsLoggedIn,
  selectUserInfo,
  setIsLoggedOut,
} from "../features/login/LoginSlice";
import {
  CustomHeader,
  CustomMenuItemDropdown,
  DisplayName,
  HeaderConfirm,
  UserInfo,
} from "./LayoutHeaderStyle.js";
import {
  Avatar,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Tooltip,
  Typography,
} from "antd";
import { useLogout } from "../hooks/useLogout";
import {
  closeDrawer,
  selectCollapsed,
  selectDisableSubmit,
  selectDrawerVisible,
  selectIsLoadingSubmit,
  selectIsUpdateForm,
  toggleSidebar,
} from "../layout/LayoutSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../constants/common";
const { confirm } = Modal;
const { Text, Title } = Typography;

export const LayoutHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo = useSelector(selectUserInfo);
  const logout = useLogout();
  const collapsed = useSelector(selectCollapsed);
  const drawerVisible = useSelector(selectDrawerVisible);
  const isUpdateForm = useSelector(selectIsUpdateForm);
  const isLoadingSubmit = useSelector(selectIsLoadingSubmit);
  const disableSubmit = useSelector(selectDisableSubmit);
  const location = useLocation();
  const from = location.state?.from?.pathname || PATH.HOME;

  const forms = {
    // [PATH.NOTIFICATION]: {
    //   formTitle: !isUpdateForm ? "Tạo thông báo" : "Cập nhật thông báo",
    //   formRender: <NotificationForm formName={"Thông báo"} />,
    //   formName: "Thông báo",
    // },
  };

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const drawerOnClose = () => {
    dispatch(closeDrawer());
  };

  const logoutHandler = () => {
    dispatch(setIsLoggedOut(true));
    confirm({
      title: "Xác nhận",
      content: "Bạn chắc chắn muốn đăng xuất tài khoản?",
      onOk: () => {
        logout();
      },
    });
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
        onClick={logoutHandler}
        key="2"
        icon={<LogoutOutlined />}
      >
        Đăng xuất
      </CustomMenuItemDropdown>
    </Menu>
  );

  return (
    <CustomHeader style={!isLoggedIn ? { display: "none" } : {}}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          onClick: toggle,
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* <Dropdown overlay={menuNoti} trigger={['click']}>
            <Button shape="circle" type="link">
              <BellOutlined />
            </Button>
          </Dropdown> */}
        <HeaderConfirm>
          <Dropdown menu={menu} trigger={["click"]}>
            <UserInfo>
              <DisplayName>{userInfo?.fullname}</DisplayName>
              <Avatar
                size="default"
                icon={<MenuOutlined />}
                style={{ color: theme.colors.primary }}
              />
            </UserInfo>
          </Dropdown>
        </HeaderConfirm>
      </div>
      {/* <Drawer
        title={forms[location?.pathname]?.formTitle}
        width={500}
        maskClosable={false}
        placement="right"
        onClose={drawerOnClose}
        open={drawerVisible}
        footer={[
          <DrawerFooterButton
            disabled={disableSubmit}
            type="primary"
            form={forms[location?.pathname]?.formName}
            key="submit"
            htmlType="submit"
            size="large"
            loading={isLoadingSubmit}
          >
            {"Xác nhận"}
          </DrawerFooterButton>,
          <DrawerFooterButton key="back" onClick={drawerOnClose} size="large">
            Hủy bỏ
          </DrawerFooterButton>,
        ]}
        styles={{
          header: {
            background: theme.colors.primary,
            color: "white",
            borderRadius: 0,
          },
          footer: {
            height: "60px",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
      >
        {forms[location?.pathname]?.formRender}
      </Drawer> */}
    </CustomHeader>
  );
};
