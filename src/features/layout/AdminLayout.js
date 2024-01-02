import React, { useEffect, useMemo } from "react";
import { Col, Divider, Layout, Menu, Modal, Row } from "antd";
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
import AppControl from "../Canvas/components/control/app-control";
import colors from "../../theme/colors";
import CRUDBtnList from "./components/CRUDBtnList";

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
          theme="light"
          collapsed={collapsed}
          width={theme.sideBarWidth}
          style={!isLoggedIn ? { display: "none" } : {}}
        >
          {collapsed ? (
            <></>
          ) : (
            <>
              <Row
                align="middle"
                justify="center"
                style={{ borderBottom: `1px solid ${colors.gray}` }}
              >
                <LogoText underline>Slide-kit</LogoText>
              </Row>
              <AppControl />
              <CRUDBtnList />
            </>
          )}
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
