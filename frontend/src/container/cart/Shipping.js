import React, { Fragment, useState } from 'react'
import { countries } from 'countries-list'
import MetaData from '../commn/metaData/MetaData';
import { useDispatch, useSelector } from 'react-redux'
import { saveShopInfo } from '../../redux/actions/cart'
import { Form, Input, Button, Row, Col, Select, Steps } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';




const { Step } = Steps;

const { Option } = Select;

const Shipping = ({ history }) => {

    const countriesList = Object.values(countries)

    const { shopInfo } = useSelector(state => state.cart)


    const [address, setAddress] = useState(shopInfo.address)
    const [city, setCity] = useState(shopInfo.city)
    const [postalCode, setPostalCode] = useState(shopInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shopInfo.phoneNo)
    const [country, setCountry] = useState(shopInfo.country)

    const dispatch = useDispatch();

    const submitHandler = () => {

        dispatch(saveShopInfo({ address, city, phoneNo, postalCode, country }))
        history.push('/order/confirm')
    }

    return (
        <Fragment>

            <MetaData title={'معلومات الشحن'} />

            <div className="cartShipping">
                <div className="container">
                    <Row type="flex" justify="center">
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Steps size="small" current={0} className="steps">
                                <Step className="step" title="معلومات الشحن" />
                                <Step className="step" title="اكد الطلب" />
                                <Step className="step" title="الدفع" />
                            </Steps>
                        </Col>
                    </Row>
                    <Row className="formLogin">

                        <Col xs={24} sm={24} md={24} lg={8}  >
                            <h3 className="loginTitle">معلومات الشحن </h3>
                            <Form
                                name="NewPassword"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={submitHandler}
                            >
                                <Form.Item
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'الرجاء ادخال العنوان ',
                                        },
                                    ]}
                                    hasFeedback


                                >
                                    <Input
                                        name="address"
                                        prefix={< HomeOutlined className="site-form-item-icon" />}
                                        placeholder="العنوان"
                                        size="large"
                                        type="text"
                                        value={address}

                                        onChange={(e) => setAddress(e.target.value)}

                                    />
                                </Form.Item>

                                <Form.Item
                                    name="city"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'الرجاء ادخال المدينة ',
                                        },
                                    ]}
                                    hasFeedback


                                >
                                    <Input
                                        name="city"
                                        prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                                        placeholder="المدينة"
                                        size="large"
                                        type="text"
                                        value={city}

                                        onChange={(e) => setCity(e.target.value)}

                                    />
                                </Form.Item>



                                <Form.Item
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'الرجاء ادخال الهاتف ',
                                        },
                                    ]}
                                    hasFeedback


                                >
                                    <Input
                                        name="phone"
                                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                                        placeholder="الهاتف"
                                        size="large"
                                        type="phone"
                                        value={phoneNo}

                                        onChange={(e) => setPhoneNo(e.target.value)}

                                    />
                                </Form.Item>



                                <Form.Item
                                    name="postalCode"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'الرجاء ادخال الرمز البريدي ',
                                        },
                                    ]}
                                    hasFeedback


                                >
                                    <Input
                                        name="postalCode"
                                        prefix={<MailOutlined className="site-form-item-icon" />}
                                        placeholder="الرمز البريدي"
                                        size="large"
                                        type="number"
                                        value={postalCode}

                                        onChange={(e) => setPostalCode(e.target.value)}

                                    />
                                </Form.Item>

                                <Form.Item
                                    name="country"
                                    hasFeedback
                                    rules={[{ required: true, message: 'يرجي اختيار المدينة' }]}
                                >
                                    <Select placeholder="رجاء اختار المدينة"
                                        onChange={(value) => setCountry(value)}
                                        value={country}
                                    >
                                        {countriesList.map(country => (
                                            <Option key={country.name} value={country.name}>
                                                {country.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>


                                <Form.Item>
                                    <Button size="large" type="primary" ghost htmlType="submit" className="login-form-button" >
                                        استمرار
                                    </Button>

                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping
