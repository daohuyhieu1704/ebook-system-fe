import styled from 'styled-components'
import { DatePicker, Select } from 'antd'

export const DatePickerContainer = styled(DatePicker)`
    .ant-picker-dropdown {
        z-index: 9999 !important;
    }
`

export const CustomTagSelect = styled(Select)`
    .ant-select-selection-item {
        border-color: #91d5ff;
        background: #e6f7ff;
        color: #096dd9;
        height: 80px;
    }
`