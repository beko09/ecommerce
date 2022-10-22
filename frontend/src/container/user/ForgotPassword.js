import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../commn/metaData/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/user';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';


const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const { error, loading, msg } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error && typeof error !== 'object' && error !== null) {
            message.error(error);
        }
      

        if (msg) {
            message.success(msg.message)
        }

    }, [dispatch, error, msg])

    const submitHandler = () => {
        const data = { email }
        dispatch(forgotPassword(data));
        setEmail('');
    }

    return (
        <Fragment>
            <MetaData title={'استعادة كلمة المرور'} />
            <div className="container">
                <Row className="formLogin">

                    <Col xs={24} sm={24} md={24} lg={8}  >
                        <h3 className="loginTitle">استعادة كلمة المرور</h3>
                        <Form
                            name="ForgotPassword"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={submitHandler}
                        >
                            <Form.Item

                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال الايميل ',
                                    },
                                ]}
                                hasFeedback

                                validateStatus={error && error.email ? 'error' : undefined}
                                help={error && error.email}

                            >
                                <Input
                                    type="email"
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    placeholder="ادخل الايميل"
                                    size="large"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button size="large" type="primary" htmlType="submit"
                                    className="login-form-button"
                                    disabled={loading ? true : false}
                                    loading={loading}
                                >
                                    ارسال
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default ForgotPassword
