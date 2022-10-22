import React, { Fragment } from 'react';
import { Col, Empty, Row, Button, message } from 'antd';
import { ShoppingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../redux/actions/cart'
import "./cart.css"

const Cart = ({ history }) => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart)
    const { isAuthenticated } = useSelector(state => state.auth)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) {
            message.warning("الرقم تعدي الكمية الموجودة في المخزن");
            return;
        }

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) {
            message.warning("اقل قيمة للطلب هي منتج واحد")
            return;
        }

        dispatch(addItemToCart(id, newQty))

    }

    const checkoutHandler = () => {
        if (isAuthenticated) {
            history.push('/shipping')
        }
        else {
            history.push('/users/login')
        }
    }

    return (
        <Fragment>
            <MetaData title={'السلة فارغة'} />
            {cartItems.length === 0 ? <h2 className="emtyCart">
                <Empty
                    image={<ShoppingOutlined className="cartEmpty" />}

                    description={
                        <span className="textEmpty"> السلة فارغة</span>
                    }
                />

            </h2> : (
                <Fragment>
                    <div className="container">

                        <div className="ItemCart">
                            <h2 className="cartTitle">سلتك: <span>({cartItems.length} عنصرا)</span></h2>

                                <Row type="flex " justify="space-between" gutter={[16, 24]}>

                                <Col className="gutter-box" xs={24} sm={24} md={20} lg={20} xl={20}>

                                    {cartItems.map(item => (
                                        <div key={item.product}>
                                            <hr className="cartHr" />
                                            <div className="cart-item" >
                                                <Row className="row cartRow"  >
                                                    <Col className="gutter-inner-box" xs={6} sm={6} md={6} lg={6} xl={6}>
                                                        <div className="image-in-card">
                                                        <img src={item.image} alt="Laptop"  />
                                                        </div>
                                                    </Col>

                                                    


                                                    <Col className="gutter-inner-box" xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <div className="info-card">
                                                            <div> <Link className="productLink" to={`/product/${item.product}`}>{item.name}</Link></div>
                                                            <div> <p id="card_item_price"><bdi>  { item.price} </bdi><span className="currency">ج س</span></p></div>
                                                            <div className="stockCounter d-inline">

                                                                <Button onClick={() => decreaseQty(item.product, item.quantity)}>
                                                                    -
                                                                </Button>
                                                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                                                <Button onClick={() => increaseQty(item.product, item.quantity, item.stock)}>
                                                                    +
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Col>

            

                                                    <Col className="gutter-inner-box" xs={6} sm={6} md={6} lg={6} xl={6}>
                                                            <div  className="deleteitemcard">
                                                        <Button type="primary" danger onClick={() => removeCartItemHandler(item.product)}>
                                                            <DeleteOutlined />
                                                        </Button>
                                                        </div>

                                                    </Col>

                                                </Row>
                                            </div>
                                        </div>
                                    ))}

                                </Col>

                                <Col className="gutter-box" xs={24} sm={24} md={4} lg={4} xl={4} >
                                    <div id="order_summary">
                                        <h2>ملخص طلباتك</h2>
                                        <hr className="cartHr" />
                                        <p>عدد المنتجات :  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (قطعة)</span></p>
                                            <p>السعر الكلي : <span className="order-summary-values"><bdi>{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</bdi>
                                                <span className="currency">ج س</span>
                                            </span></p>

                                        <hr className="cartHr" />
                                        <Button type="primary " onClick={checkoutHandler}>دفع </Button>
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

export default Cart;
