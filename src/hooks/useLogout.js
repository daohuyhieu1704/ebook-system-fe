import { useNavigate } from "react-router-dom";
import { NotificationCustom } from "../components/NotificationCustom/NotificationCustom";
import { PATH } from "../constants/common";
import { useDispatch } from "react-redux";
import { logout } from "../features/Login/LoginSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate(PATH.HOME);
  };
  return logoutHandler;
};
