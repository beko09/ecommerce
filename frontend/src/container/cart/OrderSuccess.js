import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import { Result, Button } from 'antd';

const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'طلبك تمت معالجته بنجاح '} />
            <Result
                status="success"
                title="تم بنجاح !"
                subTitle="طلبك تمت معالجته بنجاح "
                extra={[
                    <Button key="console">
                        <Link to="/orders/me">الذهاب الي طلباتي</Link>
                    </Button>
                ]}
            />
        </Fragment>
    )
}

export default OrderSuccess;


