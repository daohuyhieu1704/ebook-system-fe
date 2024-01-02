import { Button, Radio, Select, Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectColor } from "./app-controlSlice";
import themeGet from "@styled-system/theme-get";
// export const PagePerPages = styled.div`
//   display: inline;
//   border: 1px solid black;
// `
export const RadioButtonControl = styled(Radio.Button)`
  background: ${themeGet("colors.dark")};
  color: ${themeGet("colors.primary")};
`;
export const ButtonControl = styled(Button)`
  color: #909396;
`;
export const SelectControl = styled(Select)`
  color: #909396;
`;
export const PagePerToTal = styled(Button)`
  color: #909396;
`;
export const ButtonPicker = styled(Button)`
  width: 80px;
`;
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
`;
export const SliderControl = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  .ant-row {
    width: 250px;
  }
`;
export const ModalControlTitle = styled.p`
  position: absolute;
  left: 50%;
  font-size: 15px;
  transform: translate(-50%, 0);
  padding-top: 10px;
`;
export const UploadPdf = styled(Upload)`
  display: flex;
  align-items: center;
`;
export const ButtonUpload = styled(Button)`
  color: #909396;
`;
export const SliderTextControl = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  .ant-row {
    width: 400px;
  }
`;
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
`;
