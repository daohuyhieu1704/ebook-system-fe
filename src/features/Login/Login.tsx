import { Form, Input, Button, Checkbox } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  // ImgContent,
  LoginFormTitle,
  LoginFormWrapper,
  LoginWrapper,
  // ReForgotPass
} from './Login.style';
// import LoginBg from '../../resources/images/login-img.png'
import { useAppDispatch } from '../../app/hooks';
import {
  loginSuccess,
  LoginType,
} from './loginSlice';
import { LOCAL_STORAGE_ITEM, PATH } from '../../constants/common';
import { axiosPost } from '../../helper/axios';
import { useState } from 'react';
import { NotificationCustom } from '../../components/NotificationCustom/NotificationCustom';
import colors from '../../theme/colors';
// import React, { useEffect, useState } from 'react'

export const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || PATH.HOME;

  const onFinish = (values: LoginType) => {
    setLoading(true);
    axiosPost(`${process.env.REACT_APP_ENDPOINT}emp_role/login`, {
      username: values.username,
      password: values.password,
    })
      .then((data) => {
        if (data.data?.state === false) {
          setLoading(false);
          NotificationCustom({
            type: 'error',
            message: 'Error',
            description: data.data?.message,
          });
        } else {
          setLoading(false);
          dispatch(
            loginSuccess({
              username: values.username,
              fullname: data?.data.fullname ? data?.data.fullname : values.username.slice(0, values.username.indexOf('@')),
              accessToken: data.data?.acess_token,
              remember: values.remember,
              role: data.data?.role,
            })
          );
          localStorage.setItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN, data.data?.acess_token);
          NotificationCustom({
            type: 'success',
            message: 'Thành công',
            description: 'Đăng nhập thành công',
          });
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        setLoading(false);
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: error,
        });
      });
  };

  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <div>
          <LoginFormTitle>PTIT KTX</LoginFormTitle>
          <Form
            name='login'
            form={form}
            layout={'vertical'}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            requiredMark={false}
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Đây là mục bắt buộc!',
                },
              ]}
            >
              <Input
                size={'large'}
                placeholder='Địa chỉ e-mail'
                className='input-username'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Đây là mục bắt buộc!',
                },
              ]}
            >
              <Input.Password size={'large'} placeholder='Mật khẩu' />
            </Form.Item>
            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox style={{ color: 'red' }}>Nhớ mật khẩu?</Checkbox>
            </Form.Item>

            <Form.Item
              style={{ height: 0, marginBottom: 0 }}
              className='login-btn'
            >
              <Button
                loading={loading}
                size={'large'}
                type='primary'
                htmlType='submit'
                style={{
                  width: '100%',
                  height: '55px',
                  position: 'absolute',
                  top: '0px',
                  backgroundColor: colors.primary,
                  border: 'none',
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
            {/* <Form.Item
              style={{ height: 0, marginBottom: 0 }}
              className='login-btn'
            >
              <Button
                loading={loading}
                size={'large'}
                type='primary'
                style={{
                  width: '100%',
                  height: '55px',
                  position: 'absolute',
                  top: '80px',
                  backgroundColor: `${theme.colors.primary}`,
                  border: 'none',
                }}
                onClick={() => {
                  signInWithGoogle().then((data) => {
                    setLoading(false);
                    dispatch(
                      loginSuccess({
                        ...data,
                        username: data.user?.displayName,
                        firstName: data.user?.displayName,
                        lastName: '',
                        accessToken: data.user?.getIdToken(),
                        remember: true,
                        role: 'CTSV',
                        type: 0,
                      })
                    );

                    NotificationCustom({
                      type: 'success',
                      message: 'Thành công',
                      description: 'Đăng nhập thành công',
                    });
                    navigate(from, { replace: true });
                  });
                }}
              >
                {' '}
                Đăng nhập với Google{' '}
              </Button>
            </Form.Item> */}
          </Form>
        </div>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};
