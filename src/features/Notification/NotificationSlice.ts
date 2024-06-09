import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { UploadFile } from 'antd/es/upload/interface';
import moment from 'moment';

export interface SerToCliNotifiEvents {
  hi: (arg?: string) => void;
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}
export interface CliToSerNotifiEvents {
  hi: () => void;
}

export enum NotiType {
  all = 'all',
  //lopTC = 'tc_',
  khoa = 'kh_',
  lopHC = 'hc_',
  spec = 'specific',
}

export const NotiLabelAndValue = [
  {
    value: 'all',
    label: 'Gửi cho tất cả',
  },
  // {
  //   value: 'tc_',
  //   label: 'Gửi theo lớp tín chỉ',
  // },
  {
    value: 'kh_',
    label: 'Gửi theo khoa',
  },
  {
    value: 'hc_',
    label: 'Gửi theo lớp hành chính',
  },
  {
    value: 'specific',
    label: 'Gửi theo MSSV',
  },
];

export interface listNotiInterface {
  STT?: number;
  thesis?: string;
  type?: NotiType;
  content?: string;
  to?: string;
  attached?: UploadFile[] | undefined;
  key: string;
}
export interface NotificationType {
  listNoti: listNotiInterface;
  notiType: NotiType[];
  Receiver: string[];
}

export interface NotiState {
  listNoti: listNotiInterface[];
  type: NotiType[];
  receiver: string[];
  mode: NotiType;
  nienkhoa: string;
}

const initialState: NotiState = {
  listNoti: [],
  type: [NotiType.all, NotiType.khoa, NotiType.lopHC, NotiType.spec],
  receiver: [],
  mode: NotiType.all,
  nienkhoa: `${moment().toDate().getFullYear()}`,
};

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setListNotifi: (state, action) => {
      state.listNoti = action.payload;
    },
    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setNienkhoa: (state, action) => {
      state.nienkhoa = action.payload;
    },
  },
});

export const { setListNotifi, setReceiver, setMode, setNienkhoa } = NotificationSlice.actions;

export const selectListNotifi = (state: RootState) => state.notification.listNoti;
export const selectListNotiType = (state: RootState) => state.notification.type;
export const selectReceiver = (state: RootState) => state.notification.receiver;
export const selectMode = (state: RootState) => state.notification.mode;
export const selectNienkhoa = (state: RootState) => state.notification.nienkhoa;

export default NotificationSlice.reducer;
