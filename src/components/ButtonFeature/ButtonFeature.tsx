import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation } from "react-router-dom";
import {
  openDrawerRight,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsUpdateForm,
  setSelectedRows,
} from "../../features/layout/layoutSlice";
import { NotificationCustom } from "../NotificationCustom/NotificationCustom";
import { PATH } from "../../constants/common";
import { Button, Modal } from "antd";
import { Col, Row } from "antd";
import { selectUserInfo } from "../../features/Login/LoginSlice";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { selectSearchCate } from "../../features/Category/CategorySlice";

const { confirm } = Modal;

export default function ButtonFeature({
  value,
  item,
  changeHandler,
  onlyDetail = false,
}: any) {
  const path = useLocation().pathname;
  const dispatch = useAppDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const userInfo = useAppSelector(selectUserInfo);
  const searchCate = useAppSelector(selectSearchCate);
  const [loadingQuesItem, setLoadingQuesItem] = useState(false);
  const cannotUpdate: string[] = [PATH.CATEGORY_DETAIL];
  const disableMoreInfo: string[] = [];

  const hideSuccess = () => {
    dispatch(setSelectedRows([]));
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "success",
      message: "Success",
      description: "Ẩn thành công!",
    });
  };

  const hideError = (error: any) => {
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "error",
      message: "Error",
      description: error.response.data.message,
    });
  };

  const deleteItem: any = {};

  const hideItem: any = {};

  const drawerOnOpenUpdate = () => {
    dispatch(setIsUpdateForm(true));
    dispatch(setSelectedRows([item]));
    dispatch(openDrawerRight());
  };

  const deleteHandler = () => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa lớp này?",
      onOk: () => {
        return deleteItem[path]();
      },
    });
  };
  const hideHandler = () => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn ẩn lớp này?",
      onOk: () => {
        return hideItem[path]();
      },
    });
  };

  const changeStatusQuesHandler = (value: boolean, item: any) => {
    setLoadingQuesItem(true);
    if (value) {
      // notificationAPI.hide(item.matb, `${userInfo.accessToken}`)
      //   .then((res: any) => {
      //     setLoadingQuesItem(false);
      //     dispatch(setIsRefetch(true));
      //     NotificationCustom({
      //       type: 'success',
      //       message: 'Thành công',
      //       description: `${res.data?.message}`,
      //     });
      //   })
      //   .catch((err) => {
      //     setLoadingQuesItem(false);
      //     console.log(err);
      //   })
    } else {
      // notificationAPI.show(item.matb, `${userInfo.accessToken}`)
      //   .then((res: any) => {
      //     setLoadingQuesItem(false);
      //     dispatch(setIsRefetch(true));
      //     NotificationCustom({
      //       type: 'success',
      //       message: 'Thành công',
      //       description: `${res.data?.message}`,
      //     });
      //   })
      //   .catch((err) => {
      //     setLoadingQuesItem(false);
      //     console.log(err);
      //   })
      setLoadingQuesItem(false);
    }
  };

  // const modeHide = selectedRows.map((item: any) => (item.deleted)).filter((v, i, a) => a.indexOf(v) === i);
  // const isDisabledHide = selectedRows.length > 0 && modeHide.length === 1;
  return (
    <Row justify="end" align="middle">
      {/* {hideItem.hasOwnProperty(path) ?
        <Col 
        style={{
          marginLeft: '10px',
          display: 'flex',
        }}>
            <Switch
              checkedChildren={<EyeOutlined />}
              unCheckedChildren={<EyeInvisibleOutlined />}
              defaultChecked={!!parseInt(value)}
              loading={loadingQuesItem}
              onChange={(value) => changeStatusQuesHandler(value, item)}
            />
        </Col> : <></>} */}
      {cannotUpdate.includes(path) ||
      onlyDetail ||
      (searchCate !== "" && path.includes(searchCate)) ? (
        <></>
      ) : (
        <Col>
          <Button
            style={{
              marginLeft: "10px",
            }}
            size="small"
            key={`btn-${item.key}`}
            onClick={drawerOnOpenUpdate}
          >
            <EditOutlined />
          </Button>
        </Col>
      )}
      {!disableMoreInfo.includes(path) && (
        <Col>
          <Button
            style={{
              marginLeft: "10px",
            }}
            size="small"
            key={`btn-${item.key}`}
            onClick={() => {
              changeHandler();
            }}
          >
            <EllipsisOutlined />
          </Button>
        </Col>
      )}
    </Row>
  );
}
