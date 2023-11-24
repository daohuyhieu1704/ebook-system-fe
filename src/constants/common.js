/* eslint-disable react/react-in-jsx-scope */
import {
  LaptopOutlined,
  TeamOutlined,
  PieChartOutlined,
  DollarOutlined,
  NotificationOutlined,
  QuestionOutlined,
  BookOutlined,
  PullRequestOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

export const PATH = Object.freeze({
  LOGIN: "/login",
  HOME: "/",
  DRAW: "/drawing",
  FUNC: "/function",
  NOT_FOUND: "*",
});

export const ROUTES = Object.freeze({
  ADMIN_PRIVATE: [
    {
      path: PATH.HOME,
      element: "HomePage",
    },
    {
      path: PATH.DRAW,
      element: "DrawPage",
    },
    {
      path: PATH.FUNC,
      element: "FunctionPage",
    },
  ],
  PUBLIC: [
    { path: PATH.LOGIN, element: "LoginPage" },
    { path: "*", element: "NotFoundPage" },
  ],
});

export const MANAGEMENT_MENU = [
  {
    path: PATH.DRAW,
    name: "Vẽ",
    icon: <TeamOutlined />,
  },
  {
    path: PATH.QUESTION_FEEDBACK,
    name: "Hàm",
    icon: <QuestionOutlined />,
  },
];

export const NOTIFICATION_TYPE = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
});

export const LOCAL_STORAGE_ITEM = Object.freeze({
  USER_INFO: "userInfo",
  ACCESS_TOKEN: "access_token",
});

export const AppConstant = Object.freeze({
  CANVAS_SCALE: 1,
});
