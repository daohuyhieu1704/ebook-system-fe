import { useEffect, useMemo } from "react";
import {
  AppstoreOutlined,
  DashboardOutlined,
  DollarCircleFilled,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Badge, Collapse, Divider, Layout, Menu, Modal } from "antd";
import { Link, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MANAGEMENT_MENU, PATH, ROLE } from "../../constants/common";
import { useLogout } from "../../hooks/useLogout";
import { theme } from "../../theme/theme";
import type { MenuProps } from "antd";
import {
  CliToSerLogin,
  selectIsLoggedIn,
  selectRole,
  selectUserInfo,
} from "../Login/LoginSlice";
import {
  CustomContent,
  CustomMenuItem,
  CustomSider,
  ImageContent,
  LayoutWrapper,
  LogoPara,
  LogoText,
  LogoWrapper,
  UserInfo,
} from "./Layout.style";
import { LayoutHeader } from "./LayoutHeader";
import {
  changeSelectedKey,
  selectCollapsed,
  selectSelectedKey,
  setIsRefetch,
  setSelectedRows,
} from "./layoutSlice";

import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import colors from "../../theme/colors";

const { confirm } = Modal;

const ignoreAppLayout = [PATH.LOGIN];
export const AdminLayout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const logout: any = useLogout();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const collapsed = useAppSelector(selectCollapsed);
  const selectedKey = useAppSelector(selectSelectedKey);
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location) {
      dispatch(changeSelectedKey(location.pathname));
    }
  }, [location]);

  function getKeyByValue(object: any, value: number | undefined): string {
    const str = Object.keys(object).find((key) => object[key] === value);
    return str ? str : "";
  }

  const logoutHandler = () => {
    confirm({
      title: "Xác nhận",
      content: "Bạn chắc chắn muốn đăng xuất tài khoản?",
      onOk: () => {
        logout();
      },
    });
  };
  type MenuItem = Required<MenuProps>["items"][any];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  // const totalVal: { [x: string]: number } = {
  //   [`${PATH.COMPLAINT}`]: totalQ,
  // }

  const listRouter = useMemo(
    () => [
      ...MANAGEMENT_MENU.filter((item: any) =>
        item.permissions.includes(
          userInfo.role === "1" ? ROLE.admin : ROLE.shop
        )
      ).map((item) => {
        if (!item.children) {
          return getItem(
            <>
              <Link to={item.path}></Link>
              <Link to={item.path}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "98%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {`${item.name}`}
                  {/* {
                    totalVal[`${item.path}`] > 0 ?
                      <Badge size="small" count={totalVal[`${item.path}`]} offset={[-6, 0]}></Badge>
                      :
                      <></>
                  } */}
                </div>
              </Link>
            </>,
            item.path,
            item.icon
          );
        } else {
          return getItem(
            item.name,
            item.name,
            item.icon
            // item.children.map((item) =>
            //   getItem(
            //     <>
            //       <Link to={item.path}></Link>
            //       <Link to={item.path}>
            //         <div
            //           style={{
            //             display: "flex",
            //             flexDirection: "row",
            //             width: "98%",
            //             justifyContent: "space-between",
            //             alignItems: "center",
            //           }}
            //         >
            //           {`${item.name}`}
            //           {/* {
            //           totalVal[`${item.path}`] > 0 ?
            //             <Badge size="small" count={totalVal[`${item.path}`]} offset={[-6, 0]}></Badge>
            //             :
            //             <></>
            //         } */}
            //         </div>
            //       </Link>
            //     </>,
            //     item.path,
            //     item.icon
            //   )
            // ),
            // "group"
          );
        }
      }),
    ],
    [userInfo.role]
  );

  return `${ignoreAppLayout}`.includes(location.pathname) ? (
    <LayoutWrapper>{children}</LayoutWrapper>
  ) : (
    <LayoutWrapper>
      <Layout hasSider>
        <CustomSider
          collapsed={collapsed}
          width={theme.sideBarWidth}
          style={
            !isLoggedIn
              ? { display: "none" }
              : {
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
                }
          }
        >
          {collapsed ? (
            <ImageContent>
              <img src="/ptit.png" alt="logo" />
            </ImageContent>
          ) : (
            <LogoWrapper>
              <img src="/ptit.png" alt="logo" />
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LogoText>EBook</LogoText>
                <LogoPara>Admin</LogoPara>
              </div>
            </LogoWrapper>
          )}
          <Menu
            //theme='dark'
            mode="inline"
            defaultSelectedKeys={[selectedKey]}
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
            marginLeft: `${collapsed ? 80 : 220}px`,
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
