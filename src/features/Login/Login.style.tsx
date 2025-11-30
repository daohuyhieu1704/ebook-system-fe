import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Checkbox } from "antd";

export const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: ${themeGet("colors.backgroundColor")};
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${themeGet("colors.primary")};
    border-color: ${themeGet("colors.primary")};
  }
  //tablet
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }

  //tablet landspace
  @media only screen and (max-width: 1024px) and (max-height: 768px) {
    flex-direction: row;
  }
`;
export const ImgContent = styled.div`
  flex: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet("colors.backgroundColor")};

  img {
    width: 90%;

    //tablet
    @media only screen and (max-width: 1024px) {
      width: 80%;
    }
  }

  //tablet
  @media only screen and (max-width: 1024px) {
    flex: 1;
  }

  //tablet landspace
  @media only screen and (max-width: 1024px) and (max-height: 768px) {
    flex: 1;
  }
`;
export const LoginFormWrapper = styled.div`
  flex: 2;
  padding: 2rem;
  display: flex;
  align-items: center;
  background-color: ${themeGet("colors.gray")};
  justify-content: center;

  .login-btn {
    .ant-form-item-control-input {
      min-height: unset;
    }
  }
  & > div {
    width: 460px;
    height: 460px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 3rem;
    background-color: ${themeGet("colors.white")};
    border-radius: 10px;
    .ant-input-affix-wrapper,
    .input-username {
      height: 50px;
      background-color: ${themeGet("colors.gray")};
    }
    .ant-input {
      background-color: ${themeGet("colors.gray")};
      &:focus {
        background-color: ${themeGet("colors.gray")};
      }
    }
    //tablet
    @media only screen and (max-width: 1024px) {
      width: 80%;
    }
  }

  //tablet
  @media only screen and (max-width: 1024px) {
    flex: 5;
    justify-content: center;
    padding: 0;

    border-radius: 35px 35px 0 0;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 0px 0px inset;
  }

  //tablet landspace
  @media only screen and (max-width: 1024px) and (max-height: 768px) {
    flex: 1;
    border-radius: 0;
  }
`;

export const LoginFormTitle = styled.h1`
  width: 100%;
  margin: auto;
  margin-bottom: 2rem;
  text-align: center;
  color: ${themeGet("colors.primary")};
  font-weight: 600;

  //tablet
  @media only screen and (max-width: 1024px) {
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
`;
export const ReForgotPass = styled.div`
  display: flex;
  justify-content: space-between;
  .ant-checkbox-inner {
  }
`;
