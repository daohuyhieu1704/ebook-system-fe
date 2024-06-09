import { CloseOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Form, InputNumber, Typography } from 'antd';
import React, { useState } from 'react'
import { DashboardAPI } from '../../../api/DashboardAPI';
import { ComplainAPI } from '../../../api/ComplainAPI';

interface TimeExeCardInterface {
    cardTitle: string;
    data: any[];
}

export default function TimeExecuteCardAndForm(props: TimeExeCardInterface) {
    const { cardTitle, data } = props;
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 24 },
    };
    const onFill = () => {
        form.setFieldsValue(data.reduce((acc, item) => {
            acc[item.ma_loai_yeu_cau] = parseInt(item.thoi_gian_phan_hoi);
            return acc;
        }, {}));
    };

    const onFinish = (values: any) => {
        for (let item of Object.entries(values)) {
            let [key, value]: [string, any] = item;
            if (key === 'phtm') {
                ComplainAPI.updateTimeResQ(`${value}`)
                    .then(res => {
                        console.log('succ', key, value, res);
                    }).catch(err => {
                        console.log(err);
                    });
            }
            console.log(key, value);
            // DashboardAPI.
            //     chageRes(key, value).then(res => {
            //         console.log('succ', key, value);
            //     }).catch(err => {
            //         console.log(err);
            //     })
        }
    };
    return (
        <Card
            title={cardTitle}
            bordered={true}
            style={{
                flex: 2,
                margin: '20px 0 20px 0',
            }}
            extra={!isEdit ? <Button onClick={() => {
                setIsEdit(true);
                onFill();
            }}><EditOutlined /></Button> : <>
                <Button type="primary" onClick={() => {
                    form.submit();
                }} style={{ marginRight: 10 }}><SaveOutlined /></Button>
                <Button onClick={() => {
                    setIsEdit(false);
                }}><CloseOutlined /></Button>
            </>}
        >
            {!isEdit ? data.map(item => {
                return <Typography key={item.ma_loai_yeu_cau}>{item.ten_loai_yeu_cau}: {item.thoi_gian_phan_hoi} ngày</Typography>
            }) : <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                {data.map(item => {
                    return <Form.Item
                        key={item.ma_loai_yeu_cau}
                        name={item.ma_loai_yeu_cau}
                        label={item.ten_loai_yeu_cau}
                        rules={[{ required: false }]}>
                        <InputNumber min={1} max={20} />
                    </Form.Item>
                })}
            </Form>
            }
        </Card>
    )
}
