import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/common';

const ForbiddenPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập vào page này."
        extra={
          <Button type="primary" onClick={() => navigate(PATH.LOGIN)}>
            Login Now
          </Button>
        }
      />
    </div>
  );
};

export default ForbiddenPage;
