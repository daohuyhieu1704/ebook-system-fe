import { Button, Radio, Select, Upload } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectColor } from './app-controlSlice'
// export const PagePerPages = styled.div`
//   display: inline;
//   border: 1px solid black;
// `
export const RadioButtonControl = styled(Radio.Button)`
  width: 50px;
  height: 40px;
  font-size: 20px;
  color: #909396;
  padding-top: 5px;
`
export const ButtonControl = styled(Button)`
  width: 50px;
  height: 40px;
  font-size: 20px;
  color: #909396;
`
export const SelectControl = styled(Select)`
  height: 40px;
  font-size: 20px;
  color: #909396;
  .ant-select-selector {
    height: 40px !important;
  }
  .ant-select-selection-item {
    padding-top: 5px !important;
  }
`
export const PagePerToTal = styled(Button)`
  width: 120px;
  height: 40px;
  font-size: 20px;
  color: #909396;
`
export const ButtonPicker = styled(Button)`
  width: 100px;
  height: 40px;
  font-size: 20px;
`
export const ModalControl = styled(Modal)`
  .ant-modal-body {
    width: 500px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .circle-picker {
    height: 150px;
    margin-left: 100px;
  }
`
export const SliderControl = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  padding-top: 40px;
  .ant-row {
    width: 250px;
  }
`
export const ModalControlTitle = styled.p`
  position: absolute;
  left: 50%;
  font-size: 15px;
  transform: translate(-50%, 0);
  padding-top: 10px;
`
export const UploadPdf = styled(Upload)`
  display: flex;
`
export const ButtonUpload = styled(Button)`
  height: 40px;
  font-size: 20px;
  color: #909396;
`
export const SliderTextControl = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  .ant-row {
    width: 400px;
  }
`
export const ModalControlText = styled(Modal)`
  .ant-modal-body {
    width: 500px;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .circle-picker {
    height: 150px;
    margin-left: 100px;
  }
`
