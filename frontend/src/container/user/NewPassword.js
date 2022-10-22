import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../commn/metaData/MetaData';
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../redux/actions/user'
import { Form, Input, Button, Row, Col, message } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';



const NewPassword = ({ history, match }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();

    const { error, success, loading } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error && typeof error !== 'object' && error !== null) {
            message.error(error);
        }
       

        if (success) {
            message.success('Password updated successfully')
            history.push('/users/login')
        }

    }, [dispatch, error, success, history])

    const submitHandler = () => {
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(match.params.token, formData))
    }

    return (
        <Fragment>

            <MetaData title={'تعيين كلمة سر  الجديدة '} />

            <div className="container">
                <Row className="formLogin">

                    <Col xs={24} sm={24} md={24} lg={8}  >
                        <h3 className="loginTitle">تعيين كلمة سر  الجديدة </h3>
                        <Form
                            name="NewPassword"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={submitHandler}
                        >
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال كلمة السر',
                                    },
                                ]}
                                hasFeedback
                                validateStatus={error && error.password ? 'error' : undefined}
                                help={error && error.password}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="كلمة السر"
                                    size="large"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال تاكيد كلمة السر',
                                    },
                                ]}
                                hasFeedback
                                validateStatus={error && error.password ? 'error' : undefined}
                                help={error && error.password}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="تاكيد كلمة السر"
                                    size="large"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}

                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>


                            <Form.Item>
                                <Button size="large"
                                    type="primary" htmlType="submit"
                                    className="login-form-button"
                                    disabled={loading ? true : false}
                                    loading={loading}
                                >
                                    تعيين كلمة السر
                                </Button>

                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default NewPassword;
