import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../commn/metaData/MetaData'
import Sidebar from './Sidebar'
import { message, Row, Col, Table, Button, Pagination, Tag} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, deleteProduct } from '../../redux/actions/products'
import { DELETE_PRODUCT_RESET } from '../../redux/actions/types';
import moment from 'moment';
import 'moment/locale/ar';
import SkeletonTable from '../../components/skeletons/SkeletonTable';
import { TitleSearch } from "./TitleSearch";


moment.locale('ar');


const ProductsList = ({ history }) => {


    const dispatch = useDispatch();

    const { loading, error, products, productsCount, productPerPage } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteProduct)

    const [activePage, setActivePage] = useState(1)
    function setActivePageNo(page) {
        setActivePage(page)
    }

    useEffect(() => {
        dispatch(getAdminProducts(activePage));

        if (error && typeof error !== 'object' && error !== null) {
            message.error(error);
        }
        if (deleteError && typeof deleteError !== 'object' && deleteError !== null) {
            message.error(deleteError);
        }

        if (isDeleted) {
            message.success('تم مسح المنتج');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, error
        , deleteError,
        isDeleted,
        history,
        activePage
    ])


    const dataSource = [];

    const columns = [

        {
            title: 'تاريخ اضافة المنتج',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'اسم المنتج',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'صورة المنتج',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: ' سعر المنتج الاصلي',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: ' سعر المنتج المخفض',
            dataIndex: 'newprice',
            key: 'newprice',
        },
        {
            title: ' مبلغ الخصم',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'كمية في المخزن',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'الحدث',
            dataIndex: 'actions',
            key: 'actions',
        },
    ];

    products?.forEach(product => {
        dataSource.push({
            key: product._id,
            date: moment(product.createdAt).format('YYYY-MM-DD'),
            name: <Link to={`/product/${product._id}`} variant="primary" className="productLink">{product.name}</Link>,
            image: <img width="40" height="40" src={product?.images[0]?.url} alt={product.name} />,
            price: <span>{product.price} <span className="currency">ج س</span></span>,
            newprice: <span>
                {product.newprice > 0 ? <>{product.newprice} <span className="currency">ج س</span></>
                    : 
                    <Tag color="orange" >غير مخفض</Tag>
                    }
            </span>,
            discount: <span>
                {product.discount > 0 ? <>{product.discount} <span className="currency">ج س</span></>
                    : <Tag color="orange">لا يوجد خصم</Tag>}
            </span>,
            stock: product.stock,
            actions: <div className="action">
                <Button>
                    <Link to={`/admin/product/${product._id}`} >
                        <EditOutlined />
                    </Link>
                </Button>
                <Button
                    onClick={() => deleteProductHandler(product._id)}
                >
                    <DeleteOutlined />
                </Button>
            </div>
        })
    })



    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    const [filterInput, setFilterInput] = useState('')


    const filterData = () => {
        if (filterInput === '') return dataSource

        if (isNaN(filterInput)) {
            return dataSource.filter(({ name }) => name.includes(filterInput))
        }
    }
    return (
        <Fragment>
            <MetaData title={'المنتجات'} />
            <div className="container">
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar />
                    </Col>



                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <div className="allOrder">
                            <div className="search-title">
                                <h4 >المنتجات</h4>
                                <TitleSearch onSearch={setFilterInput} />
                            </div>
                            {loading ? <SkeletonTable /> : (


                                <Table dataSource={filterData()} columns={columns} scroll={{ x: '100%' }}
                                    pagination={false} />

                            )}

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
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default ProductsList
