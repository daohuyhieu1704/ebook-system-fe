import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.less';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }

  .ant-modal-wrap, .ant-popover, .ant-modal-mask {
    z-index: 100000001;
  }
  .ant-select-dropdown {
    z-index: 100000001;
  }
  .ant-image-preview-wrap {
    z-index: 100000003;
  }
  .ant-image-preview-mask {
    z-index: 100000002;
  }

  .upload-video {
    .ant-upload {
      width: 100%;
    }
  }

  .ant-drawer-title, .ant-drawer-close {
    color: white;
  }

  .ant-drawer-title--black, .ant-drawer-close--black {
    color: #000 !important
  }

  .ant-message-notice-content {
    background: #F0FBDA;
    border: 1px solid #ddd;
  }

  .ant-image-preview-img {
    background-color: white;
  }

  .ant-image-preview-operations-operation:not(:first-child) {
    display: none;
  }

  .ant-drawer {
    z-index: 100000001;
  }

  .ant-notification {
    z-index: 100000002;
  }

  .drawer-marker {
    .ant-drawer-body{
      background: #f1f1f1;
    }
  }
`;
