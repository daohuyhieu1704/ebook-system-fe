import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { NotificationCustom } from "../components/NotificationCustom/NotificationCustom";
import { PATH } from "../constants/common";
import { logout } from "../features/Login/LoginSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate(PATH.HOME);
    NotificationCustom({
      type: "success",
      message: "Success",
      description: "Đăng xuất thành công!",
    });
  };
  return logoutHandler;
};
