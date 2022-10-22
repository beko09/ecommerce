import React from 'react';
import { Row, Col} from 'antd';
import {
    EnvironmentOutlined, PhoneOutlined,QuestionCircleOutlined
} from '@ant-design/icons';
import "./Footer.css";
import logo from "../../../res/images/logo/logo-tasawq.png";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <>
            <hr className="footerHr" />
            <footer className="footer">
                <div className="container">
                    <Row gutter={[40, 16]}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                            <div className="footerImage">
                               <img src={logo} alt="logo" />
                               <p>كل ما تحتاجه في متناولك</p>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <div className="footerAddress">
                                <div >
                                    <EnvironmentOutlined className="i"/>
                                </div>
                                <div className="content">
                                    <h2>مواقعنا</h2>
                                    <span>السودان-امدرمان</span>
                                    <span>جوار مول كذا</span>
                                </div>
                            </div>
                        </Col>
                        
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                            <div className="footerAddress">
                                <div >
                                  <PhoneOutlined className="i"/>
                                </div>
                                <div className="content">
                                    <h2>اتصل بنا</h2>
                                    <a href="tel:11111111111">الهاتف: 11111111111</a>
                                    <a href="mailto:info@shop.com">الايميل: info@shop.com</a>
                                </div>
                            </div>
                        </Col>
                         <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                            <div className="footerAddress">
                                <div>
                                    <QuestionCircleOutlined className="i"/>
                                </div>
                                <div className="content">
                                    <h2>مساعدة</h2>
                                    <span>لاتتردد في طلب مساعدتك  اتصل بنا</span>
                                </div>
                            </div>
                        </Col>
                       
                    </Row>
                   
                </div>
                
        </footer>
        <section className="EndFooter">
            <div className="container">
                 <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                            <div className="footerLinks">
                                <ul className="listEndFooter">
                                    <li> <Link to="/">الريئسية</Link>  </li>
                                    <li> <Link to="/contact">اتصل بنا</Link>  </li>
                                    <li> <Link to="/#!">سياسة الخصوصية  </Link></li>
                                    <li> <Link to="/#!">بلاغ</Link></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                            <div className="copyRight">
                                <div>
                                    <p>جميع الحقوق &copy; {new Date().getFullYear()} محفوظة  تسوق</p>
                                </div>
                                <div className="authorCopyRight">
                                    <p>
                                        صمم وبرمجة بواسطة
                                    <a href="https://www.facebook.com/abobakerhilal">
                                        ابوبكر هلال
                                    </a>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
            </div>
        </section>
        </>
    )
}

export default Footer;
