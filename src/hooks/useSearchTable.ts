import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { NotificationCustom } from "../components/NotificationCustom/NotificationCustom";
import { MANAGEMENT_MENU, PATH } from "../constants/common";
import { logout } from "../features/Login/LoginSlice";

export const useSearchTable = (path: string) => {
  const dispatch = useAppDispatch();
  const optionsFilter = MANAGEMENT_MENU.find(
    (item) => item.path === path
  )?.filter?.map((item) => ({
    label: item.label,
    value: item.key,
  }));
  const searchTableHandler = () => {};
  return {
    optionsFilter,
    searchTableHandler,
  };
};
