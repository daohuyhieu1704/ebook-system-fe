import React, { useEffect, useMemo } from "react";
import { Layout, Menu, Modal } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MANAGEMENT_MENU, PATH } from "../../constants/common";
import { useLogout } from "../../hooks/useLogout";
import { theme } from "../../theme/theme";
import { selectIsLoggedIn, selectUserInfo } from "../Login/LoginSlice";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  CustomContent,
  CustomSider,
  ImageContent,
  LayoutWrapper,
  LogoText,
  LogoWrapper,
} from "./Layout.style";
import { LayoutHeader } from "./LayoutHeader";
import {
  changeSelectedKey,
  selectCollapsed,
  selectSelectedKey,
  setSelectedRows,
} from "./LayoutSlice";
import { useDispatch, useSelector } from "react-redux";

const { confirm } = Modal;

const ignoreAppLayout = [PATH.LOGIN];

export const AdminLayout = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const collapsed = useSelector(selectCollapsed);
  const selectedKey = useSelector(selectSelectedKey);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const logout = useLogout();

  useEffect(() => {
    if (location) {
      dispatch(changeSelectedKey(location.pathname));
    }
  }, [location]);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem("Navigation One", "1", <MailOutlined />),
    getItem("Navigation Two", "2", <CalendarOutlined />),
    getItem("Navigation Two", "sub1", <AppstoreOutlined />, [
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
      getItem("Submenu", "sub1-2", null, [
        getItem("Option 5", "5"),
        getItem("Option 6", "6"),
      ]),
    ]),
    getItem("Navigation Three", "sub2", <SettingOutlined />, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
    ]),
    getItem(
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>,
      "link",
      <LinkOutlined />
    ),
  ];

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

  console.log("listRouter", listRouter);

  useEffect(() => {
    if (!isLoggedIn) {
      logout();
    }
  }, []);
  return ignoreAppLayout.includes(location.pathname) ? (
    <LayoutWrapper>{children}</LayoutWrapper>
  ) : (
    <LayoutWrapper>
      <Layout>
        <CustomSider
          collapsed={collapsed}
          width={theme.sideBarWidth}
          style={!isLoggedIn ? { display: "none" } : {}}
        >
          {collapsed ? (
            <></>
          ) : (
            <LogoWrapper>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LogoText>Slide-kit</LogoText>
              </div>
            </LogoWrapper>
          )}
          <Menu
            theme="dark"
            mode="vertical"
            //inlineCollapsed={false}
            defaultSelectedKeys={[selectedKey]}
            disabledOverflow={true}
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => {
              dispatch(setSelectedRows([]));
              key !== "logout" && dispatch(changeSelectedKey(key));
            }}
            //defaultOpenKeys={false ? [] : ['userpage', 'adminpage', 'Cơ sở vật chất', 'Kế toán', 'Đào tạo']}
            defaultOpenKeys={["userpage", "adminpage"]}
            items={listRouter}
            style={{}}
          >
            {listRouter.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.key}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </CustomSider>
        <Layout
          className="site-layout"
          style={{
            transitionDuration: "0.25s",
            marginLeft: collapsed ? 80 : theme.sideBarWidth,
          }}
        >
          <LayoutHeader />
          <CustomContent>{children}</CustomContent>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};
