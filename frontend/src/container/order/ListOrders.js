import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import { message, Table, Button, Col, Row, Pagination, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../redux/actions/order';
import SkeletonTable from '../../components/skeletons/SkeletonTable';
import "./order.css";

const ListOrders = () => {

    const dispatch = useDispatch();

    const { loading, error, orders, ordersCount, orderPerPage } = useSelector(state => state.getOrder);
    const [activePage, setActivePage] = useState(1)
    function setActivePageNo(page) {
        setActivePage(page)
    }

    useEffect(() => {
        dispatch(getOrders(activePage));
        if (error && typeof error !== 'object' && error !== null) {
            message.error(error);
        }
      
    }, [dispatch, error, activePage])


    const dataSource = [];

    const columns = [

        {
            title: 'عدد المنتجات',
            dataIndex: 'numOfItems',
            key: 'numOfItems',
        },
        {
            title: 'اجمالي المبلغ ',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'حالة الطلب',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'الحدث',
            dataIndex: 'actions',
            key: 'actions',
        },
    ];

    if (!loading && orders) {
        orders.forEach(order => {
            dataSource.push({
                key: order._id,
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice} ج س `,
                status: order.orderStatus && String(order.orderStatus).includes('تم التوصيل')
                    ? <Tag color="green">{order.orderStatus}</Tag>
                    : <Tag color="orange">{order.orderStatus}</Tag>,
                actions:
                    <Button>
                        <Link to={`/order/${order._id}`} >
                            <EyeOutlined />
                        </Link>
                    </Button>
            })
        })

    }






    return (
        <Fragment>

            <MetaData title={'طلباتي'} />
            <div className="container">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="orderList">
                            <h1 className="">طلباتي</h1>

                            {loading ? <SkeletonTable /> : (

                                orders ?

                                    <Table dataSource={dataSource} columns={columns} scroll={{ x: '100%' }} pagination={false} />
                                    : <h3>NO Order here</h3>

                            )}
                        </div>
                    </Col>
                    {orderPerPage <= ordersCount && (


                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="pagination">
                                <Pagination
                                    onChange={setActivePageNo}
                                    defaultCurrent={activePage}
                                    total={ordersCount}
                                    pageSize={orderPerPage}

                                />
                            </div>
                        </Col>

                    )}
                </Row>
            </div>
        </Fragment>
    )
}

export default ListOrders
