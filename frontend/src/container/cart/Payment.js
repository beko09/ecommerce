import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../commn/metaData/MetaData';
import { message, Steps, Row, Col, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/actions/order';
import { emptyCart } from '../../redux/actions/cart';
import { postData } from "../../helpers/axios";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';


const { Step } = Steps;
const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const Payment = ({ history }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [stripeError, setStripeError] = useState({});

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shopInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);

  useEffect(() => {
    error && message.error(error);
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    shopInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shopPrice = orderInfo.shopPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async () => {
    document.querySelector('#pay_btn').disabled = true;

    let res;
    try {

      res = await postData('payment/process', paymentData).then((res) => res);
    
      const clientSecret = res.client_secret;

     

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.user.name,
            email: user.user.email,
          },
        },
      });

      if (result.error) {
        setStripeError(result.error);
        document.querySelector('#pay_btn').disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          dispatch(emptyCart());
          localStorage.removeItem('cartItems');


          history.push('/order/success');
        } else {
          message.error('There is some issue while payment processing');
        }
      }
    } catch (err) {
      document.querySelector('#pay_btn').disabled = false;

      message.error(err.response?.data.error);
    }
  };

  return (
    <Fragment>
      <MetaData title={'معلومات الدفع'} />
      <div className="payment">
        <div className="container">
          <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Steps size="small" current={2} className="steps">
                <Step className="step" title="معلومات الشحن" />
                <Step className="step" title="اكد الطلب" />
                <Step className="step" title="الدفع" />
              </Steps>
            </Col>
          </Row>
          <Row className="formLogin">
            {stripeError.code === "payment_intent_authentication_failure" && message.error(stripeError.message)}
            <Col xs={24} sm={24} md={24} lg={8}  >
              <h3 className="loginTitle">معلومات الدفع </h3>
              <Form
                name="NewPassword"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={submitHandler}
              >
                <Form.Item
                  name="card_num_field"
                  className='formItem'
                  rules={[
                    {
                      required: true,
                      message: 'الرجاء ادخال رقم البطاقة ',
                    },
                  ]}
                  label="رقم البطاقة"
                  validateStatus={stripeError && stripeError.code ? 'error' : undefined}
                  help={stripeError.code === ("invalid_number" || "incomplete_number") && stripeError.message}
                  hasFeedback

                >
                  <CardNumberElement
                    type='text'
                    id='card_num_field'
                    className='ant-input ant-input-lg'
                    options={options}
                  />
                </Form.Item>
                <Form.Item
                  name="card_exp_field"
                  className='formItem'
                  rules={[
                    {
                      required: true,
                      message: 'الرجاء ادخال تاريخ انتهاء  البطاقة ',
                    },
                  ]}
                  label="تاريخ انتهاء  البطاقة"
                  validateStatus={stripeError && stripeError.code ? 'error' : undefined}
                  help={stripeError.code === ("incomplete_expiry" || "invalid_expiry_year") && stripeError.message}
                  hasFeedback
                >
                  <CardExpiryElement
                    type='text'
                    id='card_exp_field'
                    className='ant-input ant-input-lg'
                    options={options}
                  />
                </Form.Item>
                <Form.Item
                  name="card_cvc_field"
                  className='formItem'
                  rules={[
                    {
                      required: true,
                      message: ' cvc الرجاء ادخال  بطاقة ',
                    },
                  ]}
                  label="cvc بطاقة"
                  validateStatus={stripeError && stripeError.code ? 'error' : undefined}
                  help={stripeError.code === ("invalid_cvc" || "incomplete_cvc") && stripeError.message}
                  hasFeedback
                >
                  <CardCvcElement
                    type='text'
                    id='card_cvc_field'
                    className='ant-input ant-input-lg'
                    options={options}
                  />
                </Form.Item>
                <Form.Item>
                  <Button id='pay_btn' size="large" type="primary" ghost htmlType="submit" className="login-form-button" >
                    دفع {` - ${orderInfo && orderInfo.totalPrice}`}
                  </Button>

                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
