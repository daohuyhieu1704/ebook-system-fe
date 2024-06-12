import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { PATH } from "../constants/common";
import { selectUserInfo } from "../features/login/loginSlice";
const HomePage = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    console.log("navigate to notification", userInfo?.role);
    switch (userInfo?.role) {
      case "0":
        navigate(PATH.BOOK);
        break;
      case "1":
        navigate(PATH.NOTIFICATION);
        break;
    }
  }, []);
  return <></>;
};

export default HomePage;
