import styled from "styled-components";
import { Table } from "antd";
import { themeGet } from "@styled-system/theme-get";

export const TableCustom = styled(Table)`
  margin: 16px;
  .ant-table-thead {
    tr {
      th {
        background-color: ${themeGet("colors.primary")};
        color: ${themeGet("colors.white")};
        /* text-align: center; */

        &::before {
          background-color: #ffffff !important;
        }
      }
    }
  }
  .ant-table-tbody {
    border: 1px solid red;
    tr {
      /* text-align: center; */
      &:nth-child(even) {
        background-color: ${themeGet("colors.backgroundColor")} !important;
        td {
          background-color: inherit;
        }
      }
  }
  .ant-pagination {
    margin: 0 0 16px 0;
  }
  .table-row-warning {
    color: ${themeGet("colors.warning")};
    font-weight: 700;
  }
  .table-row-gray {
    text-decoration:line-through;
    //color: ${themeGet("colors.gray")};
  }
`;
