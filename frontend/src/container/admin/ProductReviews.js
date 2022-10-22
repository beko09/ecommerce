import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../commn/metaData/MetaData';
import Sidebar from './Sidebar';
import { message, Table, Button, Row, Col, Form, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews, deleteReview, } from '../../redux/actions/review';
import { getAllProducts } from '../../redux/actions/products';
import { DELETE_REVIEW_RESET } from '../../redux/actions/types';



const { Option } = Select;

const ProductReviews = () => {
  const [productId, setProductId] = useState('');


  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.getReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.deleteReview
  );
  const { products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getAllProducts())

    if (error && typeof error !== 'object' && error !== null) {
      message.error(error);
    }
    if (deleteError && typeof deleteError !== 'object' && deleteError !== null) {
      message.error(deleteError);
    }
    if (productId !== '') {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      message.success('تم مسح المراجعة بنجاح');
      dispatch({ type: DELETE_REVIEW_RESET });
    }

  }, [dispatch, error, productId, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const submitHandler = () => {
    dispatch(getProductReviews(productId));
  };

  const dataSource = [];

  const columns = [
    {
      title: 'التقييم ',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'المراجعة',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'المستخدم',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'الحدث',
      dataIndex: 'actions',
      key: 'actions',
    },
  ];

  reviews?.forEach((review) => {
    dataSource.push({
      Key: review._id,
      rating: review.rating,
      comment: review.comment,
      user: review.name,

      actions: (
        <Button
          onClick={() => deleteReviewHandler(review._id)}
        >
          <DeleteOutlined />
        </Button>
      ),
    });
  });



  return (
    <Fragment>
      <MetaData title={'Product Reviews'} />
      <div className="container">
        <Row>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Sidebar />
          </Col>

          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <div className="allOrder">
              <Row type="flex" justify="center" >
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>

                  <Form
                    name="productId"
                    className="login-form"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={submitHandler}
                  >



                    <Form.Item
                      name="product"
                      hasFeedback
                      rules={[{ required: true, message: 'يرجي اختيار المنتج' }]}
                    >
                      <Select placeholder="رجاء اختار المنتج"
                        onChange={(value) => setProductId(value)}
                        value={productId}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {products && products.map(product => (
                          <Option key={product._id} value={product._id}>
                            {product.name}
                          </Option>
                        ))}

                      </Select>
                    </Form.Item>


                  </Form>
                </Col>
              </Row>
               <Row >
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {reviews && reviews.length > 0 ? (
                <Table  dataSource={dataSource} columns={columns} scroll={{ x: '100%' }} pagination={{
                  pageSize: 10
                  , total: reviews.length
                }} />
              ) : (
                <p className='mt-5 text-center'>لا توجد مراجعات</p>
              )}
              </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
