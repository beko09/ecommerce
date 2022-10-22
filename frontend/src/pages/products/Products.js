import { Fragment, useEffect } from "react";
import MetaData from "../../container/commn/metaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../.././redux/actions/products";
import { message,  Col,  Row, } from 'antd';
import Product from "../../container/product/Product";
import "./Products.css";

import SkeletonProduct from '../../components/skeletons/SkeletonProduct';


const Products = () => {
    const dispatch = useDispatch();

    const { loading, error, products
    } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
          if (error && typeof error !== 'object'  && error !== null ) {
            message.error(error);
        }
    }, [dispatch, error
    ])

    return (

        <Fragment>
            <div className="container">
                <MetaData title={"الريئسية"} />
                {loading ?
                    <Row>


                        {[1, 2, 3, 4].map((n) => (
                            <Col xs={24} sm={24} md={8} lg={6} xl={6} key={n}>
                                <SkeletonProduct />
                            </Col>
                        ))}


                    </Row>
                    :
                    <section className="products">
                        {products?.length !== 0 ?
                            <>
                                <h2 className="titleSection">تسوق احدث المنتجات</h2>
                                <Product products={products} loading={loading} />
                            </>
                            : <h4 style={{ textAlign: "center" }}>لا توجد منتجات</h4>
                        }
                    </section>
                }
            </div>
        </Fragment>


    )
}

export default Products
