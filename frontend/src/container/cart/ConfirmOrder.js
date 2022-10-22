import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import { useSelector } from 'react-redux';
import { Col, Row, Button, Steps } from 'antd';
import "./cart.css"


const { Step } = Steps;
const ConfirmOrder = ({ history }) => {

    const { cartItems, shopInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }

    return (
        <Fragment>

            <MetaData title={'معلومات الشحن'} />
            <div className="confirmOrder">
                <div className="container">
                    <Row type="flex" justify="center">
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Steps size="small" current={1} className="steps">
                                <Step className="step" title="معلومات الشحن" />
                                <Step className="step" title="اكد الطلب" />
                                <Step className="step" title="الدفع" />
                            </Steps>
                        </Col>
                    </Row>

                    <Row type="flex " justify="space-between" gutter={[16, 24]}>

                        <Col className="gutter-box order-confirm" xs={24} sm={24} md={20} lg={20} xl={20}>
                            <div className="shippingInfo">
                                <h4 className="titleShipping">معلومات الشحن</h4>
                                <p><b>الاسم :</b> {user && user.user.name}</p>
                                <p><b>الهاتف :</b> <bdi>{shopInfo.phoneNo}</bdi></p>
                                <p className="addres"><b>العنوان :</b> {`${shopInfo.address}, ${shopInfo.city}, ${shopInfo.postalCode}, ${shopInfo.country}`}</p>

                                <hr className="cartHr" />
                                <h4 className="cartSubTitile">المنتجات التي في سلتك</h4>

                                {cartItems.map(item => (
                                    <div key={item.product}>
                                        <hr className="cartHr" />
                                        <div className="cartItem ">
                                            <Row type="flex " justify="space-between" gutter={[16, 24]}>
                                                <Col className="gutter-inner-box" xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    <div className="imge-conifram">
                                                    <img src={item.image} alt="Laptop" />
                                                    </div>
                                                </Col>

                                                <Col className="gutter-inner-box" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Link className="productLink" to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>


                                                <Col className="gutter-inner-box" xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <p>
                                                        <bdi>

                                                            {item.quantity} x {item.price} = <b>{(item.quantity * item.newprice > 0 ? item.newprice : item.price).toFixed(2)} <span className="currency">ج س</span></b>
                                                        </bdi>

                                                    </p>
                                                </Col>

                                            </Row>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        <Col className="gutter-box " xs={24} sm={24} md={4} lg={4} xl={4}>
                            <div className="order_summary">
                                <h4>ملخص طلبك</h4>
                                <hr className="cartHr" />
                                <p>المجموع الفرعي:  <span className="order-summary-values"><bdi>{itemsPrice}</bdi><span className="currency">ج س</span></span></p>
                                <p>الشحن: <span className="order-summary-values"><bdi>{shippingPrice}</bdi><span className="currency">ج س</span></span></p>
                                <p>تاكسي <span className="order-summary-values"><bdi>{taxPrice}</bdi><span className="currency">ج س</span></span></p>
                                <hr className="cartHr" />
                                <p>المجموع : <span className="order-summary-values"><bdi>{totalPrice}</bdi><span className="currency">ج س</span></span></p>
                                <hr className="cartHr" />
                                <Button type="primary " ghost onClick={processToPayment}>اكمال الدفع</Button>
                            </div>
                        </Col>



                    </Row>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder
