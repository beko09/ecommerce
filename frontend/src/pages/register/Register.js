import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../.././redux/actions/user";
import { Form, Input, Button, Row, Col, message } from 'antd';
import {
    UserOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    MailOutlined,
    UploadOutlined
} from '@ant-design/icons';
import imgPreview from "../.././res/images/logo/logo-tasawq.png";
import "../login/login.css"



const Register = ({ history }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, password, email } = user;
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState(imgPreview)

    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector(state => state.auth);




    const handleChange = (e) => {
        if (e.target.name === "avatar")
        {
            setAvatar(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2)
                {
                    setAvatarPreview(reader.result)
                    // setAvatar(e.target.files[0]);
                }
            }

            reader.readAsDataURL(e.target.files[0])

        }
        else
        {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        if (isAuthenticated)
        {
            history.push("/");
        }
        if (error && typeof error !== 'object' && error !== null)
        {
            message.error(error);
        }

    }, [
        dispatch,
        error, isAuthenticated, history])


    const registerHandel = () => {
        const formData = new FormData();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("avatar", avatar)
        // const data = { name, email, password }
        dispatch(register(formData));
    }

    return (
        <Fragment>

            <Fragment>
                <div className="container">
                    <Row className="formLogin">

                        <Col xs={24} sm={24} md={24} lg={8}  >
                            <h3 className="loginTitle">تسجيل </h3>
                            <Form
                                name="register"
                                className="login-form"
                                onFinish={registerHandel}
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


                                >
                                    <Input
                                        name="name"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="اسم المستخدم"
                                        size="large"
                                        type="text"
                                        className="form-control"
                                        value={name}

                                        onChange={handleChange}

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


                                >
                                    <Input
                                        name="email"
                                        type="email"
                                        prefix={<MailOutlined className="site-form-item-icon" />}
                                        placeholder="الايميل"
                                        size="large"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    validateStatus={error && error.password ? 'error' : undefined}
                                    help={error && error.password}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'الرجاء ادخال كلمة السر',
                                        },
                                    ]}
                                    hasFeedback

                                >
                                    <Input.Password
                                        name="password"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="كلمة السر"
                                        size="large"
                                        value={password}
                                        onChange={handleChange}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="avatar"
                                    label="صورة"
                                    type='file'
                                    accept="image/jpg, image/jpeg, image/png"

                                >
                                    <div className='registerFileInput'>
                                        <div>
                                            <div className='avatar'>
                                                <img
                                                    src={avatarPreview}
                                                    className='imgAvatar'
                                                    alt='avatar'
                                                />
                                            </div>
                                        </div>
                                        <div className='customFile'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='customFileInput'
                                                id='customFile'
                                                accept="images/*"
                                                onChange={handleChange}
                                            />
                                            <label className='customFileLabel' htmlFor='customFile'>
                                                <UploadOutlined />
                                                <span> تحميل صورة</span>
                                            </label>
                                        </div>
                                    </div>

                                </Form.Item>
                                <Form.Item>
                                    <Button size="large" type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        disabled={loading ? true : false}
                                        loading={loading}
                                    >
                                        تسجيل
                                    </Button>

                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        </Fragment>
    )
}

export default Register;



