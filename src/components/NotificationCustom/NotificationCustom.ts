import { notification } from 'antd';
import { IconType } from 'antd/lib/notification';

type NotificationType = {
  type: IconType;
  message?: string;
  description?: string;
};
export const NotificationCustom = (values: NotificationType) => {
  const { type, message, description } = values;
  return notification[type]({
    placement: 'bottomLeft',
    message,
    description,
    duration: 2,
  });
};
