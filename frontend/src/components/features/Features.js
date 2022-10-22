import React from 'react';
import { Row, Col } from 'antd';
import { CarOutlined, DollarCircleOutlined, SyncOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import "./features.css";


const Features = () => {
    return (
        <>
            <section className="features">
                <div className="container">
                    <h4 className="titleSection">ما يمييزنا ؟</h4>
                    <Row gutter={[40, 16]}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                            <div className="feature">
                                <div className="inner">
                                    <CarOutlined className="icon" />
                                </div>
                                <span>السرعة  في التوصيل </span>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <div className="feature">
                                <div className="inner">
                                    <DollarCircleOutlined className="icon" />
                                </div>
                                <span> دعم كل طرق الدفع </span>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                            <div className="feature">
                                <div className="inner">
                                    <SyncOutlined className="icon" />
                                </div>
                                <span>ضمان ارجاع العوائد</span>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                            <div className="feature">
                                <div className="inner">
                                    <CustomerServiceOutlined className="icon" />
                                </div>
                                <span>  فريق دعم فني متكامل</span>
                            </div>
                        </Col>
                    </Row>
                </div>

            </section>
        </>
    )
}

export default Features
