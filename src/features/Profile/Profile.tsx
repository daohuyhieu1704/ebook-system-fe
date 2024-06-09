import { Avatar, Button, Checkbox, Col, Form, Input, Menu, Row } from "antd";
import type { MenuProps } from "antd";
import { theme } from "../../theme/theme";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import ProfileForm from "./ProfileForm";
import ChangePWForm from "./ChangePWForm";

export default function Profile() {
  const dispatch = useAppDispatch();
  const [selectedKeyMode, setSelectedKeyMode] = useState<string>("0");
  const itemsTest: any = [
    { key: "0", label: "Thông tin" },
    { key: "1", label: "Đổi mật khẩu" },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKeyMode(e.key);
  };

  return (
    <div>
      <Menu
        style={{
          width: "100%",
          background: theme.colors.gray,
          //borderBottom: `2px solid ${theme.colors.primary}`
        }}
        selectedKeys={[selectedKeyMode]}
        items={itemsTest}
        onClick={onClick}
        mode="horizontal"
        defaultSelectedKeys={["0"]}
      />
      <div
        style={{
          width: "100%",
          marginTop: "1rem",
          //borderBottom: `2px solid ${theme.colors.primary}`
        }}
      >
        {selectedKeyMode === "0" ? (
          <div className="profile">
            <Row>
              <Col span={24}>
                <ProfileForm />
              </Col>
            </Row>
          </div>
        ) : (
          <ChangePWForm />
        )}
      </div>
    </div>
  );
}
