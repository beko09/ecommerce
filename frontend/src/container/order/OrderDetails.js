import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetail } from '../../redux/actions/order'
import { message, Col, Row } from 'antd';
import SkeletonMain from '../../components/skeletons/SkeletonMain';


const OrderDetails = ({ match }) => {

    const dispatch = useDispatch();

    const { loading, error, order = {} } = useSelector(state => state.getOrderDetails)
    const { shopInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetail(match.params.id));
        if (error && typeof error !== 'object' && error !== null)
        {
            message.error(error);
        }

    }, [dispatch, error, match.params.id])

    const shippingDetails = shopInfo && `${shopInfo.address}, ${shopInfo.city}, ${shopInfo.postalCode}, ${shopInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'تفاصيل الطلب '} />
            {loading ? <h3 ><SkeletonMain /></h3> : (
                <Fragment>
                    <div className="container">
                        <div className="orderDetails">
                            <h3 className="orderTitle">تفاصيل الطلب </h3>
                            <Row >
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
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails
