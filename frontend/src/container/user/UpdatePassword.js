import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../commn/metaData/MetaData';
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../redux/actions/user';
import { UPDATE_PASSWORD_RESET } from '../../redux/actions/types'
import { Form, Input, Button, Row, Col, message } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {
        if (error && typeof error !== 'object' && error !== null) {
            message.error(error);
        }
       
        if (isUpdated) {
            message.success('تم تحديث كلمة السر بنجاح :)')

            history.push('/users/profile/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, error, history, isUpdated])

    const submitHandler = () => {

        const data = { oldPassword, password }
        dispatch(updatePassword(data))
    }

    return (
        <Fragment>
            <MetaData title={'تحديث كلمة السر '} />
            <div className="container">
                <Row className="formLogin">

                    <Col xs={24} sm={24} md={24} lg={8}  >
                        <h3 className="loginTitle">تحديث كلمة السر   </h3>
                        <Form
                            name="NewPassword"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={submitHandler}
                        >
                            <Form.Item
                                name="oldPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: ' الرجاء ادخال كلمة السر القديمة',
                                    },
                                ]}
                                validateStatus={error && error.oldPassword ? 'error' : undefined}
                                help={error && error.oldPassword}
                                hasFeedback
                            >
                                <Input.Password
                                    name="oldPassword"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="كلمة السر القديمة"
                                    size="large"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}

                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>


                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: ' الرجاء ادخال كلمة السر الجديدة',
                                    },
                                ]}
                                hasFeedback
                                validateStatus={error && error.password ? 'error' : undefined}
                                help={error && error.password}
                            >
                                <Input.Password
                                    name="password"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="كلمة السر الجديدة"
                                    size="large"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    disabled={loading ? true : false}
                                    loading={loading}
                                >
                                    تحديث كلمة السر
                                </Button>

                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default UpdatePassword
