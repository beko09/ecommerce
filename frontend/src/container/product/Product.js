
import { Card, Col, Empty, Row, message } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Rating from '../review/Rating';
import SkeletonProduct from '../../components/skeletons/SkeletonProduct';
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/actions/cart";




import './product.css';

const { Meta } = Card;
const Product = ({ products, loading }) => {
    const dispatch = useDispatch();
    //  add product to cart
    const addToCart = (id) => {

        dispatch(addItemToCart(id, 1));
        message.success("تمت اضافة المنتج الي سلة المشتريات");
    }

    return (
        <>
            {loading ?
                <Row>


                    {[1, 2, 3, 4].map((n) => (
                        <Col xs={24} sm={24} md={8} lg={6} xl={6} key={n}>
                            <SkeletonProduct />
                        </Col>
                    ))}


                </Row>
                :
                <Row type="flex" justify='flex-start' >


                    {
                        products 
                            ? products.map(product => (
                            <Col xs={24} sm={24} md={8} lg={6} xl={6} key={product._id}>
                                <Card
                                    className="card"

                                    cover={
                                        product.images[0] ?
                                            <div className="imageCard">
                                                <img alt={product.name} src={product.images[0].url}
                                                />
                                            </div>

                                            : <p>No Image</p>

                                    }
                                    actions={
                                        product.stock === 0 ? '' :
                                            [
                                                <button

                                                    disabled={product.stock === 0}
                                                    onClick={() => addToCart(product._id)}
                                                    type="button"
                                                    className="btnCart">
                                                    <ShoppingOutlined className="cartBtnIcon" />
                                                </button>
                                            ]}

                                >

                                    <Meta
                                        title={<Link to={`/product/${product._id}`} variant="primary" className="productLink">{product.name}</Link>}
                                        description={
                                            <>
                                               
                                                <div className="price">
                                                     {product.category.name}
                                                </div>
                                                <div className="ratings">

                                                    <Rating
                                                        value={(product.ratings / 5)}
                                                        disabled={true}
                                                    />

                                                    <span className="no_of_reviews">({product.numOfReviews} مراجعة)</span>
                                                </div>
                                               
                                                {product.discount > 0 ?
                                                    <div className="discountPrice">

                                                    <div className="price">
                                                      
                                                            {product.newprice } <span className="currency">ج س</span>
                                                    </div>
                                                        <div className="price oldPrice">
                                                        {product.price} <span className="currency">ج س</span>
                                                    </div>
                                                    </div> : product.discount >= product.price ?
                                                        <div className="discountPrice">
                                                            <div className="price">
                                                               مجانا
                                                             </div>
                                                            <div className="price">
                                                                {product.price} <span className="currency">ج س</span>
                                                             </div>
                                                      </div>
                                                            :
                                                    <div className="price">
                                                        {product.price} <span className="currency">ج س</span>
                                                    </div>

                                            }
                                                
                                            </>
                                        }
                                    />


                                </Card>
                            </Col >
                        )) :
                            <div className="">
                            
                             <Empty

                                    description={
                                        <span className="textEmpty"> لا توجد منتجات</span>
                                    }
                                />
                                
                            </div>
                    }


                </Row>
            }
        </>
    )
}

export default Product;

