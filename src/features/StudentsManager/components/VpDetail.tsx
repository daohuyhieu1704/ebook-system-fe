import { Card, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { selectSelectedRows } from '../../layout/layoutSlice';
import { useAppSelector } from '../../../app/hooks';

export default function VpDetail({item}: any) {
    useEffect(() => {
        console.log("record",item);
    }, [item])
    return (
      <Card style={{marginTop: '1rem'}} size='small' extra={[]}>
        <Row style={{marginTop: '1rem'}}>
            <Typography.Text strong style={{marginRight: '1rem'}}>Ngày phạt: </Typography.Text>
            <Typography.Text>{item?.at}</Typography.Text>
        </Row>
        <Row style={{marginTop: '1rem'}}>
            <Typography.Text strong style={{marginRight: '1rem'}}>Ngày phạt: </Typography.Text>
            <Typography.Text>{item?.at}</Typography.Text>
        </Row>
      </Card>
    )
}
