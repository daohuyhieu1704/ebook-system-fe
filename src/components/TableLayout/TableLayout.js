import { Col, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  selectSelectedRows,
  setSelectedRows,
} from "../../features/layout/LayoutSlice";
import { TableCustom } from "./TableLayout.style";
import { theme } from "../../theme/theme";
import { useDispatch, useSelector } from "react-redux";

export const TableLayout = ({
  columns,
  dataSource,
  pageSize = 20,
  tableHeightProp,
  checkbox,
  loading,
  bordered,
  onRow,
  rowClassName,
  scrollX,
}) => {
  const [tableHeight, setTableHeight] = useState();
  const dispatch = useDispatch();
  const selectedRows = useSelector(selectSelectedRows);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      setTableHeight(
        tableHeightProp ? tableHeightProp : window?.innerHeight - 300
      );
    };
    // eslint-disable-next-line no-unused-expressions
    window?.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      // eslint-disable-next-line no-unused-expressions
      window?.removeEventListener("resize", handleResize);
    };
  }, [tableHeightProp]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(setSelectedRows(selectedRows));
    },
    selectedRowKeys: selectedRows.map((item) => item.key),
  };

  function paginate(data, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }

  function onChangePagination(page, pageSize) {
    setCurrentPage(page);
  }

  return (
    <>
      <Row>
        <TableCustom
          size="small"
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
          columns={[
            {
              title: "STT",
              dataIndex: "STT",
              key: "STT",
              width: theme.checkBoxWidth,
              align: "right",
              render: (text, item, index) => {
                ++index;
                return pageSize * (currentPage - 1) + index;
              },
            },
            ...columns,
          ]}
          dataSource={paginate(dataSource, currentPage, pageSize)}
          scroll={{
            x: scrollX,
            y: tableHeight,
          }}
          pagination={false}
        />
      </Row>
      <Row align="middle" justify="end" style={{ marginTop: "1rem" }}>
        <Col>
          <Pagination
            showQuickJumper
            pageSize={pageSize}
            defaultCurrent={1}
            total={dataSource.length}
            onChange={onChangePagination}
          />
        </Col>
      </Row>
    </>
  );
};

export default TableLayout;
