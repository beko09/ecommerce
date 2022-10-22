import { Fragment, useEffect, useState } from "react";
import MetaData from "../../container/commn/metaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProductsCategory } from "../.././redux/actions/products";
import Product from "../../container/product/Product";
import { Row, Col, message, Pagination } from 'antd';
import "./categoryProduct.css"
import SkeletonProduct from '../../components/skeletons/SkeletonProduct';



const CategoryProduct = ({ match }) => {
    const [activePage, setActivePage] = useState(1)
    const dispatch = useDispatch();

    const { loading, error, products, productsCount, productPerPage } = useSelector(state => state.productsCategory);


    useEffect(() => {
        dispatch(getProductsCategory(activePage, match.params.id));
          if (error && typeof error !== 'object'  && error !== null ) {
            message.error(error);
        }
    }, [dispatch, error, activePage, match])

    function setActivePageNo(page) {
        setActivePage(page)
    }




    return (
        <Fragment>
            <div className="container">
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
                        <MetaData title={`${products && products[0]?.category.name}- قسم`}  />

                            <div className="titleProduct">
                                <h3> قسم :</h3>
                                        <span>{products && products[0]?.category.name}</span>
                            </div>
                    
                                <Product products={products && products} loading={loading} />
                                </>
                            : <h4 className="NoProduct">لا توجد منتجات</h4>
                        }
                        </section>
                    }
            </div>


            {productPerPage <= productsCount && (

                <div className="container">
                    <div className="pagination">
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Pagination
                                    onChange={setActivePageNo}
                                    defaultCurrent={activePage}
                                    total={productsCount}
                                    pageSize={productPerPage}

                                />
                            </Col>
                        </Row>

                    </div>
                </div>
            )}



        </Fragment>

    )
}

export default CategoryProduct
