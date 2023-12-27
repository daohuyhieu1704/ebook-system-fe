import { notification } from "antd";
import { IconType } from "antd/lib/notification";

export const NotificationCustom = (values) => {
  const { type, message, description } = values;
  return notification[type]({
    placement: "bottomLeft",
    message,
    description,
    duration: 2,
  });
};
