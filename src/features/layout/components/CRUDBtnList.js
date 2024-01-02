import React from "react";
import { useLocation } from "react-router-dom";
import { PATH } from "../../../constants/common";
import { ActionItem, ActionWrapper } from "../LayoutHeader.style";
import { Col, Row, Tooltip, Typography } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  openDrawer,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
  setIsUpdateForm,
  setSelectedRows,
} from "../LayoutSlice";
import confirm from "antd/lib/modal/confirm";
import { NotificationCustom } from "../../../components/NotificationCustom/NotificationCustom";
import { selectUserInfo } from "../../Login/LoginSlice";
import { UserAPI } from "../../../api/UserAPI";
import { FunctionAPI } from "../../../api/FunctionAPI";

const hasCRUD = [PATH.FUNC, PATH.USER];

export default function CRUDBtnList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedRows = useSelector(selectSelectedRows);
  const userInfo = useSelector(selectUserInfo);
  const deleteSuccess = () => {
    dispatch(setSelectedRows([]));
    dispatch(setIsRefetch(true));
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "success",
      message: "Success",
      description: "Delete successful!",
    });
  };

  const deleteError = (error) => {
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "error",
      message: "Error",
      description: error.response.data.message,
    });
  };

  const hideSuccess = () => {
    dispatch(setSelectedRows([]));
    dispatch(setIsLoadingSubmit(false));
    dispatch(setIsRefetch(true));
    NotificationCustom({
      type: "success",
      message: "Success",
      description: "Ẩn thành công!",
    });
  };

  const hideError = (error) => {
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "error",
      message: "Error",
      description: error.response.data.message,
    });
  };

  const deleteItem = {
    [PATH.USER]: () => {
      return new Promise((resolve, reject) => {
        dispatch(setIsLoadingSubmit(true));
        selectedRows.forEach((element) => {
          UserAPI.delete(userInfo.accessToken, element?.username)
            .then((data) => {
              deleteSuccess();
              resolve(data);
            })
            .catch((error) => {
              deleteError(error);
              reject(error);
            });
        });
      });
    },
    [PATH.FUNC]: () => {
      return new Promise((resolve, reject) => {
        dispatch(setIsLoadingSubmit(true));
        selectedRows.forEach((element) => {
          FunctionAPI.delete(userInfo.accessToken, element?.link)
            .then((data) => {
              deleteSuccess();
              resolve(data);
            })
            .catch((error) => {
              deleteError(error);
              reject(error);
            });
        });
      });
    },
  };
  const hideItem = {};

  const drawerOnOpenCreate = () => {
    dispatch(setIsUpdateForm(false));
    dispatch(openDrawer());
    dispatch(setSelectedRows([]));
  };

  const drawerOnOpenUpdate = () => {
    dispatch(setIsUpdateForm(true));
    dispatch(openDrawer());
  };

  return (
    <>
      {hasCRUD.includes(location.pathname) ? (
        <Row justify="center" align="middle" style={{ marginTop: "1rem" }}>
          <Row>
            <ActionItem
              onClick={drawerOnOpenCreate}
              disabled={userInfo.role !== 0}
            >
              <Typography
                style={{
                  color: userInfo.role !== 0 ? "gray" : "green",
                }}
              >
                Thêm
              </Typography>
            </ActionItem>
          </Row>
          <Row>
            <ActionItem
              onClick={drawerOnOpenUpdate}
              disabled={selectedRows.length !== 1 && userInfo.role !== 0}
            >
              <Typography
                style={{
                  color:
                    selectedRows.length !== 1 && userInfo.role !== 0
                      ? "gray"
                      : "blue",
                }}
              >
                Sửa
              </Typography>
            </ActionItem>
          </Row>
        </Row>
      ) : (
        <></>
      )}
    </>
  );
}
