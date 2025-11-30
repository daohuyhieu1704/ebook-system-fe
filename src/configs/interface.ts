export type Gender = 'male' | 'female';

export interface SvInfoRes {
  state: boolean;
  data: {
    mssv: String;
    ho_ten: string;
    lop: string;
    gioi_tinh: Gender;
    sdt: string;
    cccd: string;
    email: string;
    ngay_sinh: string;
    dia_chi: string;
  };
}