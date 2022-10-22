import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../../container/commn/metaData/MetaData'
import SkeletonMain from '../../components/skeletons/SkeletonMain'
import { Row, Col, Button, Card } from "antd";
import moment from 'moment';
import 'moment/locale/ar'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import "./profile.css";
import imgPreview from "../.././res/images/logo/logo-tasawq.png";



moment.locale('ar');
const { Meta } = Card;
const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <h2><SkeletonMain /></h2> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />
                    <div className="profile">
                        <div className="container">
                            <Row type="flex" justify="center" >
                                <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                    <h3>الملف الشخصي</h3>
                                    <Card
                                        className="profileCard"
                                        cover={
                                            <div className="cardImgProfile">
                                                {user && user.user.avatar ?
                                                    <img
                                                        className="img"
                                                        src={user.user.avatar.url}
                                                        alt={user.user.name}

                                                    />
                                                    : <img className="img" src={imgPreview} alt={user.user.name} />
                                                }

                                            </div>
                                        }
                                        actions={
                                            [<div className="actionButton">
                                                <Button >
                                                    <EditOutlined />
                                                    <Link to="/users/profile/update">
                                                        تعديل البروفايل
                                                    </Link>
                                                </Button>
                                                {user.user.role !== 'admin' && (
                                                    <Button >
                                                        <EllipsisOutlined />
                                                        <Link to="/orders/me" >
                                                            طلباتي
                                                        </Link>
                                                    </Button>
                                                )}
                                                <Button className="changePassword">
                                                    <EditOutlined />
                                                    <Link to="/users/password/update">
                                                        تغيير كلمة السر
                                                    </Link>
                                                </Button>
                                            </div>]
                                        }
                                    >
                                        <Meta
                                            description={
                                                <>
                                                    <div className="profileContent">
                                                        <h3>الاسم كامل</h3>
                                                        <p>{user.user.name}</p>

                                                        <h3>الايميل</h3>
                                                        <p>{user.user.email}</p>

                                                        <h3>تاريخ الانضمام</h3> <p>
                                                            {moment(user.user.createdAt).format('YYYY-MM-DD')}
                                                        </p>
                                                    </div>
                                                </>
                                            }
                                        />
                                    </Card>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile