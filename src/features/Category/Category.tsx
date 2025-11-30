import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import TableLayout from "../../components/TableLayout/TableLayout";
import { useLogout } from "../../hooks/useLogout";
import { theme } from "../../theme/theme";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import { CategoryAPI } from "../../api/CategoryAPI";
import { selectUserInfo } from "../Login/LoginSlice";
import {
  selectCategoryData,
  setCategoryData,
  setSearchCate,
} from "./CategorySlice";

export default function Category() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<any>([]);
  const [cateList, setCateList] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>([]);
  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const data = useAppSelector(selectCategoryData);
  const userInfo = useAppSelector(selectUserInfo);

  const onSuccess = (data: any) => {
    setLoading(false);
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: `${data.message}`,
    });
    dispatch(
      setCategoryData(
        data.data.reverse().map((data: any, index: number) => ({
          key: data.id,
          STT: index + 1,
          ...data,
        }))
      )
    );
  };
  const onError = (err: any) => {
    setLoading(false);
    NotificationCustom({
      type: "error",
      message: "Error",
      description: err.data?.message,
    });
  };
  function handleClickRoom(id_category: string) {
    dispatch(setSearchCate(id_category));
    console.log(id_category);
    navigate(`/category/${id_category}`, { replace: false });
  }
  const getData = () => {
    CategoryAPI.getAllCategories(`${userInfo.accessToken}`)
      .then(({ data }) => {
        if (data.code !== 200) {
          throw new Error(data.message);
        }
        const cateData = data.data;
        console.log("res", cateData);
        cateData.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        const SetOfLabel = new Set(
          cateData.map((item: any) => item.name.substring(0, 1))
        );
        setCateList(cateData);
        setLabel(Array.from(SetOfLabel));
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (isRefetch && location.pathname === selectedTab) {
      getData();
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);
  return (
    <>
      {label.map((item: string) => (
        <div key={item}>
          <Divider orientation="left">{item}</Divider>
          <Row gutter={16} key={item}>
            {cateList
              .filter((x: any) => x.name.substring(0, 1) === item)
              .reverse()
              .map((cate: any) => (
                <Col
                  key={cate.id}
                  className="gutter-row"
                  span={6}
                  style={{ marginTop: "1rem" }}
                >
                  <Card
                    hoverable
                    key={cate.id}
                    onClick={() => handleClickRoom(cate.id)}
                  >
                    <Typography.Title level={5}>{cate.name}</Typography.Title>
                    {cate.description}
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      ))}
    </>
  );
}
