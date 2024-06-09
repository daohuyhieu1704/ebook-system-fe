import styled from 'styled-components';
import { Table } from 'antd';
import { themeGet } from '@styled-system/theme-get';

export const TableCustom = styled(Table)`
  .ant-table-thead {
    tr {
      th {
        // background-color: ${themeGet('colors.sortGray')};
        background-color: #dee1e6;
        color: ${themeGet('colors.dark')};
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
        background-color: ${themeGet('colors.backgroundColor')};
      }
    }
  }

  .ant-pagination {
    margin: 16px 0 0 0;
  }
  .table-row-warning {
    color: ${themeGet('colors.warning')};
    font-weight: 700;
  }
  .table-row-gray {
    text-decoration:line-through;
    //color: ${themeGet('colors.gray')};
  }
`;
