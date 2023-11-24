import { useNavigate } from "react-router-dom";
import { PATH } from "../constants/common";
import { logout } from "../features/login/LoginSlice";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate(PATH.HOME);
  };
  return logoutHandler;
};
