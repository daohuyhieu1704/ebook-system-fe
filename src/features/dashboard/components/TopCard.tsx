import { Avatar, Card, Col, Divider, Typography } from 'antd'
import React from 'react'

const { Text } = Typography;
const { Meta } = Card;


export default function TopCard(props: any) {
    const { value, title, icon, stroke } = props;
  return (
    <Col className="gutter-row" span={6}>
        <Card
          bordered={true}
          style={{
            width: '100%',
            borderRadius: '10px',
            backgroundColor: `${stroke}`,
          }}
        >
            <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                title={`${value}`}
                description={`${title}`}
            />
        </Card>
    </Col>
  )
}
