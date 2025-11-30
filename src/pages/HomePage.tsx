import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { PATH } from "../constants/common";
import { selectUserInfo } from "../features/Login/LoginSlice";
const HomePage = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    switch (userInfo?.role) {
      case "1":
        navigate(PATH.EMPLOYEES);
        break;
      case "2":
        navigate(PATH.BOOK);
        break;
    }
  }, []);
  return <></>;
};

export default HomePage;
