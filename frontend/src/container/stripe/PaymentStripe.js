import React ,{useEffect,useState}from 'react'
import Payment from '../cart/Payment'
// payment 
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { getData } from "../../helpers/axios";
import {  message } from 'antd';

const PaymentStripe = ({ history }) => {
    const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {

     function getStripApiKey() {
       getData('stripeapi')
          .then((res) => {
            setStripeApiKey(res.stripeApiKey);
        })
        .catch((err) => {
          message.error(err.response?.data.error || 'خطأ في شبكة الانترنت')
        });

      
    }

    getStripApiKey();
    
  }, [])
    return (
      <>
        {stripeApiKey &&
        <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment history={history} />
            </Elements>
       }
        </>
    )
}

export default PaymentStripe;
