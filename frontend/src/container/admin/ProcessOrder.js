import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import Sidebar from './Sidebar'
import { message, Row, Col, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetail, updateOrder } from '../../redux/actions/order'
import { UPDATE_ORDER_RESET } from '../../redux/actions/types';
import SkeletonMain from '../../components/skeletons/SkeletonMain';


const { Option } = Select;
const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.getOrderDetails)
    const { shopInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.updateOrder)

    const orderId = match.params.id;

    useEffect(() => {

        dispatch(getOrderDetail(orderId))


        if (error && typeof error !== 'object' && error !== null)
        {
            message.error(error);
        }



        if (isUpdated)
        {
            message.success('تم تحديث الطلب بنجاح');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, error, isUpdated, orderId])


    const updateOrderHandler = (id) => {
        const data = { status }

        dispatch(updateOrder(id, data))
    }

    const shippingDetails = shopInfo && `${shopInfo.address}, ${shopInfo.city}, ${shopInfo.postalCode}, ${shopInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="container">
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar />
                    </Col>


                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        {loading ? <h3 ><SkeletonMain /></h3> : (
                            <div className="orderDetails orderAdmin">
                                <h3 className="orderTitle">تفاصيل الطلب </h3>
                                <Row >
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <div className="ChangeStatus">
                                            <h4>الحالة</h4>

                                            <div className="ant-col ant-form-item-control ant-col-rtl">
                                                <div className="ant-form-item-control-input">
                                                    <div className="ant-form-item-control-input-content">
                                                        <Select
                                                            name='status'
                                                            className="selectInput"
                                                            value={status}
                                                            onChange={(value) => setStatus(value)}
                                                        >
                                                            <Option value="معالجة" >معالجة</Option>
                                                            <Option value="تم شحنه">تم شحنه</Option>
                                                            <Option value="تم التوصيل">تم التوصيل</Option>
                                                        </Select>
                                                        <Button type="primary" onClick={() => updateOrderHandler(order._id)}>
                                                            تحديث الحالة
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <div className="orderShipping">
                                            <h4 >معلومات الشحن</h4>
                                            <ul className="orderListUl">
                                                <li>
                                                    <b>الاسم:</b>
                                                    <span> {user && user.name}</span>
                                                </li>
                                                <li>
                                                    <b>الهاتف:</b>
                                                    <span><bdi> {shopInfo && shopInfo.phoneNo}</bdi></span>

                                                </li>
                                                <li>
                                                    <b>العنوان:</b>
                                                    <span> {shippingDetails}</span>
                                                </li>
                                                <li>
                                                    <b>اجمالي السعر:</b>
                                                    <span><bdi>{totalPrice} ج س </bdi></span>
                                                </li>
                                            </ul>

                                        </div>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <div className="orderPayment">
                                            <h4 >معلومات الدفع</h4>
                                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "دفع" : "لم يدفع"}</b></p>


                                            <h4>حالة الطلب : </h4>
                                            <p className={order.orderStatus && String(order.orderStatus).includes('تم التوصيل') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <div>
                                            <h4 >عناصر الطلب :</h4>

                                            <div className="cartOrderItem ">
                                                {orderItems && orderItems.map(item => (
                                                    <div key={item.product}>
                                                        <hr className="cartHr" />

                                                        <Row tye="flex" justify="center" >
                                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <img src={item.image} alt={item.name} height="45" width="65" />

                                                            </Col>

                                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>


                                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <p><bdi>{item.price} ج س </bdi></p>
                                                            </Col>

                                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                                <p>({item.quantity}) قطعة</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}

                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                            </div>

                        )}
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default ProcessOrder

