import { Input, Select, Typography } from "antd";
import React, { startTransition, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  hasModeView,
  MANAGEMENT_MENU,
  notHasSearchFilter,
  PATH,
} from "../../../constants/common";
import { selectMode, selectStatusFilter, setMode } from "../layoutSlice";

const { Text } = Typography;

export default function ViewMode({ path }: { path: string }) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectStatusFilter);
  const mode = useAppSelector(selectMode);
  useEffect(() => {
    console.log("filter", mode);
  }, [mode]);
  return `${hasModeView}`.includes(path) ? (
    <>
      {/* <Text strong style={{ width: 80, marginLeft: '4rem' }}>
                Chế độ xem:
            </Text> */}
      {/* <Select
                style={{ width: 140, marginLeft: '1rem' }}
                defaultValue={ViewModeList[path].full}
                allowClear
                options={ViewModeOpt[path].map(
                    (item: string, idx: string) => ({
                        label: item,
                        value: idx,
                    })
                )}
                placeholder='Loại thắc mắc...'
                onClear={() => {
                    dispatch(setMode(0));
                }}
                onSelect={(value: number) => {
                    dispatch(setMode(value));
                }}
            ></Select> */}
    </>
  ) : (
    <></>
  );
}
