import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { createElement, useEffect, useMemo } from "react";
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
  Breadcrumb,
  Col,
  DatePicker,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useLogout } from "../../hooks/useLogout";
import {
  changeSelectedKey,
  closeDrawer,
  selectCollapsed,
  selectDisableSubmit,
  selectDrawerVisible,
  selectIsLoadingSubmit,
  selectIsUpdateForm,
  selectSelectedKey,
  setSelectedRows,
  toggleSidebar,
} from "./LayoutSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MANAGEMENT_MENU, PATH } from "../../constants/common";
import moment from "moment";
import FuncForm from "../Func/FuncForm";
import { useDispatch, useSelector } from "react-redux";
import AppControl from "../../components/control/app-control";
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
  const selectedKey = useSelector(selectSelectedKey);
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

  const createMenuItem = (item) => {
    if (!item.children) {
      return {
        key: item.path,
        icon: item.icon,
        label: item.name,
      };
    } else {
      return {
        key: item.name,
        icon: item.icon,
        label: item.name,
        children: item.children.map(createMenuItem),
      };
    }
  };

  const listRouter = useMemo(
    () =>
      MANAGEMENT_MENU.filter((item) =>
        item.permissions.includes(userInfo.role)
      ).map(createMenuItem),
    [MANAGEMENT_MENU, userInfo.role]
  );
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
      <Row align="middle" justify="space-between">
        <Col span={1}>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: toggle,
          })}
        </Col>
        <Col span={22}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[selectedKey]}
            disabledOverflow={true}
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => {
              dispatch(setSelectedRows([]));
              key !== "logout" && dispatch(changeSelectedKey(key));
            }}
            //defaultOpenKeys={false ? [] : ['userpage', 'adminpage', 'Cơ sở vật chất', 'Kế toán', 'Đào tạo']}
            defaultOpenKeys={["userpage", "adminpage"]}
          >
            {listRouter.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.key}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col span={1}>
          <Row align="middle" justify="center">
            <Dropdown overlay={menu} trigger={["click"]}>
              <UserInfo>
                <Tooltip placement="bottom" title="Cài đặt">
                  <Avatar
                    size="small"
                    icon={<MenuOutlined />}
                    style={{ color: theme.colors.primary }}
                  />
                </Tooltip>
              </UserInfo>
            </Dropdown>
          </Row>
        </Col>
      </Row>
      {/* <Drawer
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
      </Drawer> */}
    </CustomHeader>
  );
};
