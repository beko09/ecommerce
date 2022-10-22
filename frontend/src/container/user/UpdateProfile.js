import { Fragment, useState, useEffect } from 'react';
import MetaData from '../commn/metaData/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, loadUser } from '../../redux/actions/user';
import { UPDATE_PROFILE_RESET } from '../../redux/actions/types';
import pc from "../../res/images/logo/logo-tasawq.png"
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import userImage from "../../res/images/logo/logo-tasawq.png"


const UpdateProfile = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(
        pc
    );

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { error, isUpdated, loading } = useSelector((state) => state.user);
    const [form] = Form.useForm();
    useEffect(() => {
        if (user)
        {
            setName(user.user.name);
            setEmail(user.user.email);
            setAvatarPreview(user.user?.avatar?.url);
        }

        if (error && typeof error !== 'object' && error !== null)
        {
            message.error(error);
        }


        if (isUpdated)
        {
            message.success('تم تحديث البروفايل بنجاح !');
            dispatch(loadUser());

            history.push('/users/profile/me');

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, history, isUpdated, user]);


    useEffect(() => {
        form.setFieldsValue({
            name,
            email,
            avatar
        })
    }, [form,
        name,
        email,
        avatar]);


    const submitHandler = () => {

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData));
    };

    const onFileChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2)
            {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <Fragment>
            <MetaData title={'تحديث البروفايل'} />
            <div className="container">
                <Row className="formLogin">

                    <Col xs={24} sm={24} md={24} lg={8}  >
                        <h3 className="loginTitle">تحديث البروفايل </h3>
                        <Form
                            name="login"
                            className="login-form"
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
                                name="avatar"
                                label="صورة"
                                type='file'
                                accept="image/jpg ,image/png,image/jpeg"
                            >
                                <div className='registerFileInput'>
                                    <div>
                                        <div className='avatar'>
                                            {avatarPreview ?
                                                <img
                                                    src={avatarPreview}
                                                    className='imgAvatar'
                                                    alt='avatar'
                                                /> :
                                                <img
                                                    src={userImage}
                                                    className='imgAvatar'
                                                    alt='avatar'
                                                />}
                                        </div>
                                    </div>
                                    <div className='customFile'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='customFileInput'
                                            id='customFile'
                                            accept="image/png,image/jpg,image/jpeg"
                                            onChange={onFileChange}
                                        />
                                        <label className='customFileLabel' htmlFor='customFile'>
                                            <UploadOutlined />
                                            <span> تحميل صورة</span>
                                        </label>
                                    </div>
                                </div>

                            </Form.Item>



                            <Form.Item>
                                <Button
                                    size="large" type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    disabled={loading ? true : false}
                                    loading={loading}
                                >
                                    تحديث
                                </Button>

                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default UpdateProfile;
