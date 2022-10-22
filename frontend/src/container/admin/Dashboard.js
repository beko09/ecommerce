import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../commn/metaData/MetaData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'antd';
import { getAdminProducts } from '../../redux/actions/products'
import { allOrders } from '../../redux/actions/order';
import { allUsers } from '../../redux/actions/user';
import SkeletonTable from '../../components/skeletons/SkeletonTable';
import { ScheduleOutlined, TeamOutlined } from '@ant-design/icons';
import "./dashboard.css";

const Dashboard = () => {

    const [container, setContainer] = useState(null)
    const dispatch = useDispatch();

    const { productsCount, loading, products } = useSelector(state => state.products)
    const { usersCount } = useSelector(state => state.allUsers)
    const { totalAmount
        , ordersCount
    } = useSelector(state => state.allOrders)


    let outOfStock = 0;
    products?.forEach(product => {
        if (product.stock === 0)
        {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    return (
        <Fragment>
            <div className="container" ref={setContainer}>
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar
                            container={container}

                        />
                    </Col>

                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <div className="dashboardContent">
                            <h4 className="dashboardTitle">لوحة التحكم</h4>

                            {loading ? <SkeletonTable /> : (

                                <Fragment>
                                    <MetaData title={'Admin Dashboard'} />

                                    <Row className="RowM">
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <div className="dashboardCard bPrimary ">
                                                <div className="cardBody">
                                                    <h5>مجموع الحساب</h5>
                                                    <span>
                                                        {totalAmount && totalAmount.toFixed(2)} جنيه سوداني
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="RowM">


                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} className="ColM">

                                            <div className="dashboardCard bPrimary2 ">
                                                <div className="cardBody">
                                                    <div className="cardDetails">
                                                        <h5>المنتجات</h5>
                                                        <span>{productsCount && productsCount}</span>
                                                    </div>
                                                    <div className="cardDetail">
                                                        <Link className="cardLink" to="/admin/products">
                                                            <span >
                                                                <ScheduleOutlined />
                                                            </span>
                                                            <span >رؤية التفاصيل</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>



                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} className="ColM">

                                            <div className="dashboardCard bBlue ">
                                                <div className="cardBody">
                                                    <div className="cardDetails">
                                                        <h5>الطلبات</h5>
                                                        <span> {ordersCount && ordersCount}</span>

                                                    </div>
                                                    <div className="cardDetail">
                                                        <Link className="cardLink" to="/admin/orders">
                                                            <span >
                                                                <ScheduleOutlined />
                                                            </span>
                                                            <span >رؤية التفاصيل</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>


                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} className="ColM">

                                            <div className="dashboardCard bGreen">
                                                <div className="cardBody">
                                                    <div className="cardDetails">
                                                        <h5>المستخدمين</h5>
                                                        <span>  {usersCount && usersCount}</span>

                                                    </div>
                                                    <div className="cardDetail">
                                                        <Link className="cardLink" to="/admin/users">
                                                            <span >
                                                                <TeamOutlined />
                                                            </span>
                                                            <span >رؤية التفاصيل</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>


                                        <Col xs={24} sm={24} md={6} lg={6} xl={6} className="ColM">

                                            <div className="dashboardCard bWarning ">
                                                <div className="cardBody">
                                                    <div className="cardDetails">
                                                        <h5>خارج المخزن</h5>
                                                        <span>  {outOfStock}</span>

                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Fragment>

                            )}
                        </div>
                    </Col>
                </Row>
            </div>

        </Fragment >
    )
}

export default Dashboard
