import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../app/hooks";
import { PATH, hasHeaderBtn } from "../../../constants/common";
import { ActionItem, ActionWrapper } from "../LayoutHeader.style";
import {
  openDrawerRight,
  setIsUpdateForm,
  setSelectedRows,
} from "../layoutSlice";

export default function CRUDButtonList({ path }: { path: string }) {
  const dispatch = useAppDispatch();

  const drawerOnOpenCreate = () => {
    dispatch(setIsUpdateForm(false));
    dispatch(openDrawerRight());
    dispatch(setSelectedRows([]));
  };

  return (
    <>
      {`${hasHeaderBtn}`.includes(path) || path.includes("/csvc/") ? (
        <ActionWrapper>
          <ActionItem onClick={drawerOnOpenCreate}>
            <PlusOutlined style={{ color: "green" }} />
          </ActionItem>
        </ActionWrapper>
      ) : (
        <></>
      )}
    </>
  );
}
