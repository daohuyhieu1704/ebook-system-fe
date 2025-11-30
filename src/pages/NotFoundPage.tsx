import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/common';
import { theme } from '../theme/theme';

const NotFoundPage = () => {
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
        status="404"
        title="404"
        subTitle="Xin lỗi, trang này không tồn tại."
        extra={
          <Button
            type="primary"
            onClick={() => navigate(PATH.HOME)}
            style={{
              backgroundColor: `${theme.colors.primary}`,
              border: 'none',
            }}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
