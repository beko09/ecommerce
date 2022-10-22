import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../../container/commn/metaData/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../.././redux/actions/user";
import { Form, Input, Button, Row, Col, message } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined } from '@ant-design/icons';
import "./login.css"


const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector(state => state.auth);
    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
        if (error && typeof error !== 'object'  && error !== null ) {
            message.error(error);
        }

    }, [dispatch, error, isAuthenticated, history])


    const loginHandel = () => {
        dispatch(login(email, password));
    }



    return (
        <Fragment>
            <MetaData title="تسجيل دخول" />
            <div className="container">
                <Row className="formLogin">

                    <Col xs={24} sm={24} md={24} lg={8}  >
                        <h3 className="loginTitle">تسجيل دخول</h3>
                        <Form
                            name="login"
                            className="login-form"
                            onFinish={loginHandel}
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
                                    placeholder="الايميل"
                                    size="large"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Item>
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



                            <Form.Item>
                                <Button size="large" type="primary"   htmlType="submit" className="login-form-button"
                                    disabled={loading ? true : false}
                                    loading={loading}
                                >
                                    دخول
                                </Button>
                                <div className="loginLinkForm">
                                    <Link to="/users/register" className=" mt-2">تسجيل جديد؟</Link>
                                    <Link to="/users/password/forgot" className="login-form-forgot">هل نسيت كلمة السر؟</Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default Login;








