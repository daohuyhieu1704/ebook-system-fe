import { PDFViewer } from '@react-pdf/renderer';
import { Col, Image, Row } from 'antd';
import React, { useEffect } from 'react'
import { FAIL_IMG } from '../../constants/common';
import DPFInstance from '../PDFView/DPFInstance';

export default function AttachedImg({ imgList }: { imgList?: any }) {
    const listImg = imgList.filter((item: any) => item.type === 'pic');
    const listDoc = imgList.filter((item: any) => item.type === 'doc');
    useEffect(() => {
        console.log("listImg", imgList);
    }, []);
    console.log('dfdf',imgList.map((item: any) => '0'));
    return (
        <><Row
            style={{
                marginTop: '20px',
            }}
            justify='center'
        >
            {listImg && listImg.map((src: { linkImage: string, type: string }) => (
                <Col
                    key={`${src.linkImage}`}
                    span={4}
                >
                    <Image
                        height={100}
                        key={src.linkImage}
                        src={`${src.linkImage}`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = FAIL_IMG;
                        }}
                    />
                </Col>
            ))
            }
        </Row>
            <Row
                style={{
                    marginTop: '20px',
                }}
                justify='center'
            >
                {listDoc && listDoc.map((src: { linkImage: string, type: string }) => (
                    <Col
                        key={`${src.linkImage}`}
                        span={4}
                    >
                        <DPFInstance
                            key={src.linkImage}
                            src={`${src.linkImage}`}
                        />
                    </Col>
                ))
                }
            </Row>
        </>
    )
}
