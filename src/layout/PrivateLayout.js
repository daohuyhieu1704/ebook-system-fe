import { useEffect } from "react";
import { Layout, Menu, Modal } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MANAGEMENT_MENU, PATH } from "../constants/common";
import { theme } from "../theme/theme";
import { selectIsLoggedIn, selectUserInfo } from "../features/login/LoginSlice";
import {
  CustomContent,
  CustomSider,
  LayoutWrapper,
  LogoText,
  LogoWrapper,
} from "./AppLayoutStyle.js";
import { LayoutHeader } from "./LayoutHeader";
import {
  changeSelectedKey,
  selectCollapsed,
  selectSelectedKey,
  setSelectedRows,
} from "./LayoutSlice";
import { useDispatch, useSelector } from "react-redux";

const ignoreAppLayout = [PATH.LOGIN];
export const PrivateLayout = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const collapsed = useSelector(selectCollapsed);
  const selectedKey = useSelector(selectSelectedKey);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location) {
      dispatch(changeSelectedKey(location.pathname));
    }
  }, [location]);

  const listRouter = [
    ...MANAGEMENT_MENU.map((item) => {
      return getItem(
        <Link to={item.path}>{`${item.name}`}</Link>,
        item.path,
        item.icon
      );
    }),
  ];

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

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
              <LogoText>Slide-kit</LogoText>
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
          }}
        >
          <LayoutHeader />
          <CustomContent>{children}</CustomContent>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};
