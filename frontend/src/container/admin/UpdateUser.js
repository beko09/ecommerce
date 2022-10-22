import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../commn/metaData/MetaData'
import Sidebar from './Sidebar'
import { message, Row, Col, Button, Form, Select, Input } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetail } from '../../redux/actions/user'
import { UPDATE_USER_RESET } from '../../redux/actions/types';


const { Option } = Select;

const UpdateUser = ({ history, match }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')


    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector(state => state.updateUser);
    const { user } = useSelector(state => state.userDetail)

    const userId = match.params.id;
    const [form] = Form.useForm();

    useEffect(() => {


        if (user && user._id !== userId) {
            dispatch(getUserDetail(userId))
        } else {
            setName(user?.name);
            setEmail(user?.email);
            setRole(user?.role)
        }


      
        if (error && typeof error !== 'object' && error !== null) {
            message.error(error);
        }
      

        if (isUpdated) {
            message.success('تم تحديث المستخدم')

            history.push('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, error, history, isUpdated, userId, user])

    const submitHandler = () => {
        const data = { name, email, role }

        dispatch(updateUser(user._id, data))
    }

   

    useEffect(() => {
        form.setFieldsValue({
            name,
            email,
            role
        })
    }, [form,
        name,
        email,
        role]);

    return (
        <Fragment>
            <MetaData title={`تحديث المستخدم`} />
            <div className="container">
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar />
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <div className="allOrder">
                            <h4>تحديث المستخدم</h4>
                            <Form
                                name="login"
                                className="login-form update"
                                form={form}
                                onFinish={submitHandler}

                            >

                                <Form.Item
                                    name="name"
                                    validateStatus={error && error.name ? 'error' : undefined}
                                    help={error && error.name}

                                    rules={[
                                        {
                                            required: true,
                                            message: 'الرجاء ادخال الاسم ',
                                        },
                                    ]}
                                   
                                    hasFeedback
                                    label="اسم المستخدم"

                                >
                                    <Input
                                        name="name"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="اسم المستخدم"
                                        size="large"
                                        type="text"
                                        value={name}

                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    validateStatus={error && error.email ? 'error' : undefined}
                                    help={error && error.email}

                                    rules={[
                                        {
                                            required: true,
                                            message: 'الرجاء ادخال الايميل ',
                                        },
                                    ]}
                                    
                                    hasFeedback
                                    label="الايميل "

                                >
                                    <Input
                                        name="email"
                                        type="email"
                                        prefix={<MailOutlined className="site-form-item-icon" />}
                                        placeholder="الايميل"
                                        size="large"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Item>


                                <Form.Item
                                    name="role"
                                    hasFeedback
                                    rules={[{ required: true, message: 'يرجي اختيار الصلاحية' }]}
                                    label="الصلاحية "
                                >
                                    <Select placeholder="رجاء اختار الصلاحية"
                                        onChange={(value) => setRole(value)}
                                        value={role}
                                    >

                                        <Option key="1" value="user">
                                            user
                                        </Option>
                                        <Option key="2" value="admin">
                                            admin
                                        </Option>

                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button size="large" type="primary" htmlType="submit" className="login-form-button" >
                                        تحديث
                                    </Button>

                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default UpdateUser
