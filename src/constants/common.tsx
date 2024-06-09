/* eslint-disable react/react-in-jsx-scope */
import {
  TeamOutlined,
  PieChartOutlined,
  NotificationOutlined,
  QuestionOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";

export const PATH = Object.freeze({
  LOGIN: "/login",
  HOME: "/",
  DASHBOARD: "/dashboard",
  NOTIFICATION: "/notification",
  ROOM: "/room",
  BOOKING: "/booking",
  TIME_REGISTER: "/time_register",
  STUDENTS: "/students",
  EMPLOYEES: "/employees",
  COMPLAINT: "/complaint",
  FAQS: "/faqs",
  PROFILE: "/profile",
  CSVC: "/csvc",
  DM_CSVC: "/dm_csvc",
  CSVC_DETAIL: "/csvc/:id_phong",
  NOT_FOUND: "*",
});

export const ROLE = Object.freeze({
  SUPER_ADMIN: 0,
  ADMIN: 1,
});
export const rolePair = Object.entries(ROLE);
export const ROUTES = Object.freeze({
  ADMIN_PRIVATE: [
    {
      path: PATH.HOME,
      element: "HomePage",
      permission: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    },
    {
      path: PATH.DASHBOARD,
      element: "DashboardPage",
      permission: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    },
    {
      path: PATH.NOTIFICATION,
      element: "NotificationPage",
      permission: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    },
    {
      path: PATH.ROOM,
      element: "RoomPage",
      permission: [ROLE.ADMIN],
    },
    {
      path: PATH.BOOKING,
      element: "BookingPage",
      permission: [ROLE.ADMIN],
    },
    {
      path: PATH.TIME_REGISTER,
      element: "TimeRegisterPage",
      permission: [ROLE.ADMIN],
    },
    {
      path: PATH.STUDENTS,
      element: "StudentsManagerPage",
      permission: [ROLE.ADMIN],
    },
    {
      path: PATH.EMPLOYEES,
      element: "EmployeeManagerPage",
      permission: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    },
    {
      path: PATH.COMPLAINT,
      element: "ComplaintPage",
      permission: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    },
    {
      path: PATH.FAQS,
      element: "FaqsPage",
      permission: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    },
    {
      path: PATH.CSVC,
      element: "CSVCPage",
      permission: [ROLE.ADMIN],
    },
    {
      path: PATH.DM_CSVC,
      element: "DanhMucCSVCPage",
      permission: [ROLE.ADMIN],
    },
    {
      path: PATH.CSVC_DETAIL,
      element: "CSVCDetailPage",
      permission: [ROLE.ADMIN],
    },
    {
      path: PATH.PROFILE,
      element: "ProfilePage",
      permission: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    },
  ],
  PUBLIC: [
    { path: PATH.LOGIN, element: "LoginPage" },
    { path: "*", element: "NotFoundPage" },
  ],
});

enum SearchType {
  input = 0,
  select = 1,
  calendar = 2,
}

export const MANAGEMENT_MENU = [
  // {
  //   path: PATH.DASHBOARD,
  //   name: 'Dashboard',
  //   permissions: [ROLE.ADMIN],
  //   icon: <PieChartOutlined />,
  //   filter: null,
  //   children: undefined
  // },
  {
    path: PATH.NOTIFICATION,
    name: "Thông báo",
    permissions: [ROLE.ADMIN, ROLE.SUPER_ADMIN],
    icon: <NotificationOutlined />,
    filter: [
      {
        key: 0,
        label: "Loại",
        type: SearchType.select,
      },
      {
        key: 1,
        label: "Tiêu đề",
        type: SearchType.input,
      },
      {
        key: 2,
        label: "Nội dung",
        type: SearchType.input,
      },
    ],
    children: undefined,
  },
  {
    path: PATH.STUDENTS,
    name: "Sinh viên",
    permissions: [ROLE.ADMIN],
    icon: <TeamOutlined />,
    filter: [
      {
        key: 0,
        label: "MSSV",
        type: SearchType.input,
      },
      {
        key: 1,
        label: "Họ tên",
        type: SearchType.input,
      },
      {
        key: 2,
        label: "Lớp",
        type: SearchType.input,
      },
    ],
  },
  {
    path: PATH.EMPLOYEES,
    name: "Chuyên viên",
    permissions: [ROLE.SUPER_ADMIN],
    icon: <TeamOutlined />,
    filter: [
      {
        key: 0,
        label: "Tên",
        type: SearchType.input,
      },
      {
        key: 1,
        label: "Phòng/Ban",
        type: SearchType.select,
      },
      {
        key: 2,
        label: "email",
        type: SearchType.input,
      },
    ],
    children: undefined,
  },
  {
    path: PATH.COMPLAINT,
    name: "Khiếu nại",
    permissions: [ROLE.ADMIN],
    icon: <QuestionOutlined />,
    filter: [
      {
        key: 0,
        label: "MSSV",
        type: SearchType.input,
      },
      {
        key: 1,
        label: "Nơi nhận",
        type: SearchType.select,
      },
      {
        key: 2,
        label: "Tên thắc mắc",
        type: SearchType.input,
      },
      {
        key: 3,
        label: "Nội dung",
        type: SearchType.input,
      },
      {
        key: 4,
        label: "Tên người gửi",
        type: SearchType.input,
      },
    ],
    children: undefined,
  },
  {
    path: PATH.FAQS,
    name: "Câu hỏi thường gặp",
    permissions: [ROLE.ADMIN],
    icon: <QuestionCircleOutlined />,
    filter: [
      {
        key: 0,
        label: "Câu hỏi",
        type: SearchType.input,
      },
      {
        key: 1,
        label: "Câu trả lời",
        type: SearchType.select,
      },
    ],
    children: undefined,
  },
  {
    path: "",
    name: "Quản lí phòng",
    permissions: [ROLE.ADMIN],
    icon: <HomeOutlined />,
    children: [
      {
        path: PATH.ROOM,
        name: "Danh sách phòng",
        permissions: [ROLE.ADMIN],
        icon: <NotificationOutlined />,
        filter: [
          {
            key: 0,
            label: "Loại",
            type: SearchType.select,
          },
          {
            key: 1,
            label: "Tiêu đề",
            type: SearchType.input,
          },
          {
            key: 2,
            label: "Nội dung",
            type: SearchType.input,
          },
        ],
      },
      {
        path: PATH.CSVC,
        name: "Cơ sở vật chất",
        permissions: [ROLE.ADMIN],
        icon: <NotificationOutlined />,
        filter: [],
      },
      {
        path: PATH.DM_CSVC,
        name: "Danh mục CSVC",
        permissions: [ROLE.ADMIN],
        icon: <NotificationOutlined />,
        filter: [],
      },
      {
        path: PATH.TIME_REGISTER,
        name: "Thời gian đăng kí",
        permissions: [ROLE.ADMIN],
        icon: <NotificationOutlined />,
        filter: [
          {
            key: 0,
            label: "Loại",
            type: SearchType.select,
          },
          {
            key: 1,
            label: "Tiêu đề",
            type: SearchType.input,
          },
          {
            key: 2,
            label: "Nội dung",
            type: SearchType.input,
          },
        ],
      },
    ],
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
  ROLE: "role",
});

export const hasHeaderBtn = [
  PATH.NOTIFICATION,
  PATH.FAQS,
  PATH.EMPLOYEES,
  PATH.TIME_REGISTER,
  PATH.ROOM,
  PATH.DM_CSVC,
];
export const notHasSearchFilter = [PATH.DASHBOARD, PATH.PROFILE, PATH.ROOM];

export const hasModeView = [PATH.COMPLAINT, PATH.BOOKING];
export const hasDatePicker = [PATH.STUDENTS];

export const FAIL_IMG =
  "data:image/png;base64,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";
