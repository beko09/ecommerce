import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import Sidebar from './Sidebar'
import { message, Row, Col, Button, Table, Pagination, Tag } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder } from '../../redux/actions/order'
import { DELETE_ORDER_RESET } from '../../redux/actions/types';
import SkeletonTable from '../../components/skeletons/SkeletonTable';



const OrdersList = ({ history }) => {

    const dispatch = useDispatch();
    const { loading, error, orders, ordersCount, orderPerPage } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.deleteOrder)




    const [activePage, setActivePage] = useState(1)
    function setActivePageNo(page) {
        setActivePage(page)
    }


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

    if (!loading && orders)
    {
        orders?.forEach(order => {
            dataSource.push({
                key: order._id,
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice} ج س `,
                status: order.orderStatus && String(order.orderStatus).includes('تم التوصيل')
                    ? <Tag color="green">{order.orderStatus}</Tag>
                    : order.orderStatus && String(order.orderStatus).includes('معالجة')
                        ? <Tag color="magenta"> {order.orderStatus}</Tag>
                        : <Tag color="orange"> {order.orderStatus}</Tag>,

                actions: <div className="actionOrderList action">
                    <Button>
                        <Link to={`/admin/order/${order._id}`} >
                            <EyeOutlined />
                        </Link>
                    </Button>
                    <Button onClick={() => deleteOrderHandler(order._id)}>
                        <DeleteOutlined />
                    </Button>
                </div>
            })
        })

    }

    useEffect(() => {
        dispatch(allOrders(activePage));
        if (error && typeof error !== 'object' && error !== null)
        {
            message.error(error);
        }


        if (isDeleted)
        {
            message.success('تم مسح الطلب بنجاح');
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, error, isDeleted, history, activePage])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }




    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="container">
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar />
                    </Col>


                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <div className="allOrder">
                            <h4>جميع الطلبات</h4>

                            {loading ? <SkeletonTable /> : (

                                <Table dataSource={dataSource} columns={columns} scroll={{ x: '100%' }} pagination={false} />

                            )}

                        </div>
                        {orderPerPage <= ordersCount && (

                            <div className="container">
                                <div className="pagination">
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Pagination
                                                onChange={setActivePageNo}
                                                defaultCurrent={activePage}
                                                total={ordersCount}
                                                pageSize={orderPerPage}

                                            />
                                        </Col>
                                    </Row>

                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default OrdersList
