import React, { useCallback, useEffect, useState } from "react";
import {
  selectSelectedRows,
  setSelectedRows,
} from "../../features/Layout/LayoutSlice";
import { TableCustom } from "./TableLayout.style";
import { useDispatch, useSelector } from "react-redux";

export const TableLayout = ({
  columns,
  dataSource,
  pageSize = 15,
  tableHeightProp,
  checkbox,
  loading,
  bordered,
  total,
  setOffset,
  onRow,
  hasBtnCol,
  rowClassName,
}) => {
  const [tableHeight, setTableHeight] = useState(
    window?.innerHeight - 300 || 0
  );
  const dispatch = useDispatch();
  const selectedRows = useSelector(selectSelectedRows);

  const handleResize = useCallback(() => {
    setTableHeight(tableHeightProp || window?.innerHeight - 300);
  }, [tableHeightProp]);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }
    return () => window?.removeEventListener("resize", handleResize);
  }, [tableHeightProp, handleResize]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(setSelectedRows(selectedRows));
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    selectedRowKeys: selectedRows.map((item) => item.key),
  };

  return (
    <TableCustom
      onRow={onRow}
      bordered={bordered}
      loading={loading}
      rowSelection={
        checkbox
          ? {
              type: "checkbox",
              ...rowSelection,
            }
          : undefined
      }
      columns={columns}
      dataSource={dataSource}
      pagination={{
        total,
        defaultPageSize: pageSize,
        hideOnSinglePage: true,
        onChange: (page, pageSize) => setOffset((page - 1) * pageSize),
      }}
      scroll={{
        y: tableHeight,
      }}
    />
  );
};

export default TableLayout;
