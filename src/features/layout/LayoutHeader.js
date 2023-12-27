import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { createElement, useEffect } from "react";
import { theme } from "../../theme/theme";
import {
  selectIsLoggedIn,
  selectUserInfo,
  setIsLoggedOut,
} from "../Login/LoginSlice";
import {
  CustomHeader,
  CustomMenuItemDropdown,
  DisplayName,
  DrawerFooterButton,
  HeaderConfirm,
  UserInfo,
} from "./LayoutHeader.style";
import {
  Avatar,
  DatePicker,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Tooltip,
  Typography,
} from "antd";
import { useLogout } from "../../hooks/useLogout";
import {
  closeDrawer,
  selectCollapsed,
  selectDisableSubmit,
  selectDrawerVisible,
  selectIsLoadingSubmit,
  selectIsUpdateForm,
  toggleSidebar,
} from "./LayoutSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/common";
import moment from "moment";
import FuncForm from "../Func/FuncForm";
import { useDispatch, useSelector } from "react-redux";
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

  const forms = {
    [PATH.FUNC]: {
      formTitle: !isUpdateForm ? "Create Function" : "Update Function",
      formRender: <FuncForm formName={"Function"} />,
      formName: "Function",
    },
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
      <div style={{ display: "flex", alignItems: "center" }}>
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
          <Dropdown overlay={menu} trigger={["click"]}>
            <UserInfo>
              <DisplayName>{userInfo.fullname}</DisplayName>
              <Tooltip placement="bottom" title="Cài đặt">
                <Avatar
                  size="default"
                  icon={<MenuOutlined />}
                  style={{ color: theme.colors.primary }}
                />
              </Tooltip>
            </UserInfo>
          </Dropdown>
        </HeaderConfirm>
      </div>
      <Drawer
        title={forms[location?.pathname]?.formTitle}
        width={500}
        maskClosable={false}
        placement="right"
        onClose={drawerOnClose}
        visible={drawerVisible}
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
        headerStyle={{
          background: theme.colors.primary,
          color: "white",
          borderRadius: 0,
        }}
        footerStyle={{
          height: "60px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {forms[location?.pathname]?.formRender}
      </Drawer>
    </CustomHeader>
  );
};
