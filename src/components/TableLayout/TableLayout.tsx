import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectIsRefetch,
  selectSearchParams,
  selectSelectedRows,
  selectStatusFilter,
  setSelectedRows,
} from "../../features/layout/layoutSlice";
import { TableCustom } from "./TableLayout.style";

interface dataProps {
  columns: object[];
  dataSource: object[];
  pageSize?: number;
  tableHeightProp?: number;
  checkbox?: boolean;
  bordered?: boolean;
  loading: boolean;
  total?: number;
  setOffset?: any;
  onRow?: any;
  hasBtnCol?: any;
  rowClassName?: any;
  size?: "middle" | "small";
  expandable?: any;
}

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
  rowClassName,
  size = "middle",
  expandable,
}: dataProps) => {
  const [tableHeight, setTableHeight] = useState<number>();
  const dispatch = useAppDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const filter = useAppSelector(selectStatusFilter);
  const searchParams = useAppSelector(selectSearchParams);
  const isRefetch = useAppSelector(selectIsRefetch);
  const [dataRender, setDataRender] = useState(dataSource);
  const handleResize = () => {
    setTableHeight(
      tableHeightProp ? tableHeightProp : window?.innerHeight - 214
    );
  };
  const colForSearch = Object.entries(columns);
  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    // if (filter !== null) {
    //   const vovo: any = colForSearch[filter + 1][1];
    //   const newData = dataSource.filter((item: any) => {
    //     console.log("kio", item[vovo["key"]], filter);
    //     //console.log('kio', item[vovo["key"]], searchParams, String(item[vovo["key"]]).toUpperCase().indexOf(searchParams.toUpperCase()));
    //     return `${item[vovo["key"]]?.toUpperCase()}`.includes(
    //       `${searchParams.toUpperCase()}`
    //     );
    //   });
    //   setDataRender(newData);
    //   console.log("data", dataRender);
    // }
  }, [searchParams, filter]);

  useEffect(() => {
    setDataRender(dataSource);
  }, [dataSource]);

  useEffect(() => {
    window?.addEventListener("resize", handleResize);
  }, [tableHeightProp]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: object[]) => {
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
      rowClassName={rowClassName}
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
      dataSource={dataRender}
      pagination={{
        total,
        defaultPageSize: pageSize,
        hideOnSinglePage: true,
        onChange: (page, pageSize) => setOffset((page - 1) * pageSize),
      }}
      scroll={{
        y: tableHeight,
      }}
      size={size}
      expandable={expandable}
    />
  );
};

export default TableLayout;
