import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../redux/actions/products";
import { addItemToCart } from "../../redux/actions/cart";
import { newReview } from "../../redux/actions/review";
import MetaData from "../../container/commn/metaData/MetaData";
import ListReviews from "../../container/review/ListReviews";
import SkeletonProductDetail from "../../components/skeletons/SkeletonProductDetail";
import Rating from "../../container/review/Rating";
import { Link } from "react-router-dom";
import { NEW_REVIEW_RESET } from "../../redux/actions/types";
import { message, Row, Empty, Col, Carousel, Modal, Button, Alert } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

import "./productDetail.css";


const ProductDetail = ({ match }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        reviewHandler();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const { product, error, loading } = useSelector(state => state.productDetail);
    const { user } = useSelector(state => state.auth);
    const { reviewError, success } = useSelector(
        (state) => state.review
    );
 
  
    useEffect(() => {
        dispatch(getProductDetail(match.params.id));
          if (error && typeof error !== 'object'  && error !== null ) {
            message.error(error);
        }
       
        if (reviewError) {
            message.error(reviewError);
        }
       
        
        if (success) {
            message.success('تم نشر مراجعتك بنجاح');
            dispatch({ type: NEW_REVIEW_RESET });
        }

       
       
       
    }, [dispatch, error, reviewError, match.params.id, success]);

    
    //  add product to cart
    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        message.success("تم اضافة المنتج الي سلة المشتريات");
    }

    const increaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber >= product.stock) {
            message.warning("الرقم تعدي الكمية الموجودة في المخزن");
            return;
        }

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };

    const decreaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber <= 1) {
            message.warning("اقل قيمة للطلب هي منتج واحد")
            return;
        }

        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };





    const reviewHandler = () => {
        const productId = match.params.id;
        const review = { rating, comment, productId }
        dispatch(newReview(review));
        setIsModalVisible(false);
        setComment('')
    };
    return (
        <Fragment>

            {loading ?<div className="container"> <SkeletonProductDetail /> </div> :
                <Fragment>

                   
                    <section className="productDetails">
                        <div className="container">
                            {error ? <div className="empty">
                                <Empty

                                    description={
                                        <span className="textEmpty">  المنتج غير موجود اوتم حذفه</span>
                                    }
                                />
                            </div>

                                : <Row >
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <div className="productCarousel">
                                            <Carousel pause="hover">
                                                {product.images ? product.images.map(image => (
                                                    <div className="productCarouselItem" key={image.public_id}>
                                                        <img className="productCarouselImage" src={image.url} alt={product.name} />
                                                    </div>
                                                )) : <div className="productCarouselNoImage"><p>لا توجد صورة للمنتج او مسحت </p></div>}
                                            </Carousel>
                                            <MetaData title={product.name} description={product.description } />
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <div className="productDetailContent">
                                            <h3>{product.name}</h3>

                                            <div className="productRating">
                                                <Rating
                                                    value={product.ratings}
                                                    disabled={true}
                                                />
                                                <span id="noOfReviews">({product.numOfReviews} مراجعة)</span>
                                            </div>
                                            <hr />
                                            <div className="productPrice">
                                                <h4>السعر</h4>
                                                <span>{product.discount > 0 ? product.newprice : product.price} ج س </span>
                                                <hr />
                                            </div>
                                            <div className="stockStatus">
                                                <hr />
                                                الحالة: <span className={product.stock > 0 ? "greenColor" : "redColor"}>
                                                    {product.stock > 0 ? "في المخزن" : "غير متوفر في المخزن"}
                                                </span>
                                            </div>

                                            <hr />
                                            <div>

                                                <h4 className="mt-2">الوصف:</h4>
                                                <p>{product.description}</p>
                                            </div>
                                            <hr />
                                            <p id="product_seller mb-3">البائع: <strong>{product.seller}</strong></p>
                                            <div className="add-to-carts">
                                                <div className="stockCounter ">
                                                    <Button type="primary"
                                                        className="btnAddCart minus"
                                                        onClick={decreaseQty}
                                                    >
                                                        -
                                                    </Button>

                                                    <input type="number" className="count" value={quantity} readOnly />

                                                    <Button type="primary"
                                                        className="btnAddCart plus"
                                                        onClick={increaseQty}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                {product.stock === 0 ?
                                                    <Button type="primary"
                                                        disabled={product.stock === 0}
                                                    >
                                                        اضافة الي السلة
                                                    </Button>
                                                    :
                                                    <Button type="primary"
                                                        onClick={addToCart}
                                                        className="btnAddCart">
                                                        <ShoppingOutlined />
                                                    </Button>
                                                }
                                            </div>
                                            {user?.user ?

                                                <Button type="primary" onClick={showModal}>
                                                    كتابة مراحعة
                                                </Button>

                                                :

                                                <Alert message={<div>يجب عليك  <Link to="/users/login"> تسجيل الدخول</Link>  اولا لكتابة مراجعتك</div>} type="warning" />
                                            }
                                            <Row className="mt-2 mb-5">
                                                <Modal title="ارسال مراجعتك"
                                                    visible={isModalVisible}
                                                    onOk={handleOk}
                                                    onCancel={handleCancel}
                                                >
                                                    <div className="rating ratingproduct">

                                                        <Rating
                                                            onChange={(value) => setRating(value)}
                                                            value={rating}
                                                        />

                                                        <textarea name="review" id="review"
                                                            className="form-control mt-3"
                                                            placeholder="اكتب مراجعتك"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}>
                                                        </textarea>
                                                    </div>
                                                </Modal>
                                            </Row>

                                        </div>
                                    </Col>
                                </Row>


                            }

                        </div>

                    </section>


                    {/* Reviews product */}
                    {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}

                   
                </Fragment>

            }
        </Fragment>

    )
}


export default ProductDetail;
