import styled from "styled-components";
import { Layout, Menu, Typography } from "antd";
import { themeGet } from "@styled-system/theme-get";
const { Content, Sider, Header } = Layout;

export const LayoutWrapper = styled.div`
  min-width: 1024px;
  background: #ececec;
`;

export const LabelWrapper = styled.div`
    background: '#fff',
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
`;

export const CustomContent = styled(Content)`
  padding: ${themeGet("spaces.fifteen")}px;
  background: #ececec;
  height: calc(100vh - ${themeGet("headerHeight")}px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomMenu = styled(Menu)`
  border-right: 1px solid ${themeGet("colors.primary")};
  height: calc(100% - ${themeGet("headerHeight")}px);
  position: relative;

  .ant-menu-item-selected {
    background-color: #4b4c4d !important;
  }
`;

export const CustomMenuItem = styled(Menu.Item)`
  font-size: ${themeGet("sizes.S")};
  /* font-weight: 700; */
  margin-top: 0 !important;
`;

export const CustomSider = styled(Sider)`
  position: fixed;
  border-right: 1px solid ${themeGet("colors.primary")};
  height: 100%;
  width: ${themeGet("sideBarWidth")}px;
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background-color: black;
  }
`;

export const CustomHeader = styled(Header)`
  height: ${themeGet("headerHeight")}px;
  background-color: white;
  padding: 0 ${themeGet("spaces.container")}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px -5px relative;
  z-index: 1;
  position: sticky;
  top: 0;

  & > span {
    color: white;
    font-size: 1.1rem;
  }
`;

export const CategoryTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
export const CustomMenuItemDropdown = styled(Menu.Item)`
  padding: 10px 30px;
`;
export const LogoText = styled(Typography.Title)``;
export const LogoPara = styled.p`
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 0;
  font-weight: 700;
  font-size: ${themeGet("sizes.Standard")};
  font-size: 0.5rem;
  margin-left: 10px;
`;

export const UserInfo = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
`;
export const Avatar = styled.img``;
export const DisplayName = styled.span`
  color: ${themeGet("colors.primary")};
  margin-right: 0.5rem;
  font-weight: 600;
  /* font-size: 1rem; */
`;

export const ImageContent = styled.div`
  padding: 5px;
  height: ${themeGet("headerHeight")}px;
  text-align: center;
  & > img {
    width: 40px;
    height: 100%;
    object-fit: contain;
  }
`;

export const Container = styled.div`
  .ant-input,
  .ant-input-search-button {
    background-color: #4b4c4d;
    border: 0;
    height: 35px;
    color: white;
    border: 0;
    box-shadow: none;
    &:focus {
      border: 0;
    }
    &:hover {
      border: 0;
    }
  }
  .anticon,
  .anticon-search {
    color: white;
  }
`;

export const ContainerSearch = styled.div`
  padding: 0 10px 5px 10px;
  margin: 5px 0;
`;

export const ButtonSendMail = styled.button`
  background-color: #1a3a8a;
  color: white;
  text-align: center;
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
`;
