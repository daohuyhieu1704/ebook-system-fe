import React, { useEffect, useMemo } from "react";
import { Layout, Menu, Modal } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MANAGEMENT_MENU, PATH } from "../../constants/common";
import { useLogout } from "../../hooks/useLogout";
import { theme } from "../../theme/theme";
import { selectIsLoggedIn, selectUserInfo } from "../Login/LoginSlice";
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

  const createMenuItem = (item) => {
    return {
      key: item.path,
      icon: item.icon,
      label: <Link to={item.path}>{`${item.name}`}</Link>,
    };
  };

  const listRouter = useMemo(
    () =>
      MANAGEMENT_MENU.filter((item) =>
        item.permissions.includes(userInfo.role)
      ).map(createMenuItem),
    [MANAGEMENT_MENU, userInfo.role]
  );

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
            defaultSelectedKeys={[selectedKey]}
            disabledOverflow={true}
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => {
              dispatch(setSelectedRows([]));
              key !== "logout" && dispatch(changeSelectedKey(key));
            }}
            defaultOpenKeys={["userpage", "adminpage"]}
            items={listRouter}
            style={{}}
          />
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
