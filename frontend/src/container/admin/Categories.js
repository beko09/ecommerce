import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../commn/metaData/MetaData'
import SkeletonTable from '../../components/skeletons/SkeletonTable'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminCategories, deleteCategory, newCategory} from '../../redux/actions/category'
import { DELETE_CATEGORY_RESET } from '../../redux/actions/types'
import { message, Row, Col, Table, Form, Input, Button } from 'antd';
import {  DeleteOutlined} from '@ant-design/icons';


const Categories = ({ history }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');

    const { loading, error, categories, categoryCount } = useSelector(state => state.allCategories);
    const { loading: loadingAdd } = useSelector(state => state.newCategory);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteCategory)


    useEffect(() => {
        dispatch(getAdminCategories());

  if (error && typeof error !== 'object'  && error !== null ) {
            message.error(error);
        }
          if (deleteError && typeof deleteError !== 'object'  && deleteError !== null ) {
            message.error(deleteError);
        }

        

        if (isDeleted) {
            message.success('Product deleted successfully');
            history.push('/admin/Categories');
            dispatch({ type: DELETE_CATEGORY_RESET })
        }

    }, [dispatch, error
        , deleteError,
        isDeleted,
        history

    ])

    const dataSource = [];

    const columns = [


        {
            title: 'الاسم ',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'الحدث',
            dataIndex: 'actions',
            key: 'actions',
        },
    ];
    categories?.forEach(product => {
        dataSource.push({
            key: product._id,
            name: product.name,
            actions: <div className="action">
                <Button
                    onClick={() => deleteCategoryHandler(product._id)}
                >
                    <DeleteOutlined />
                </Button>
            </div>
        })
    })



    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id))
        message.success("تم بنجاح مسح القسم");
    }
    const addCategoryHandel = () => {
        dispatch(newCategory({ name }));
        message.success("تم اضافة القسم بنجاح");
        setName("");
    }

    return (
        <Fragment>
            <MetaData title={'الاقسام'} />
            <div className="container">
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar />
                    </Col>


                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>

                        <div className="allOrder">
                            <h4 >الاقسام</h4>

                            <Row >
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                                    <Form
                                        name="login"
                                        className="login-form"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={addCategoryHandel}
                                    >

                                        <Form.Item

                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'الرجاء ادخال اسم القسم ',
                                                },
                                            ]}
                                            hasFeedback

                                            validateStatus={error && error ? 'error' : undefined}
                                            help={error && error}

                                        >
                                            <Input
                                                type="text"
                                               
                                                placeholder="اسم القسم"
                                                size="large"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Form.Item>




                                        <Form.Item>
                                            <Button size="large" type="primary"
                                                htmlType="submit"
                                                className="login-form-button"
                                                disabled={loadingAdd ? true : false}
                                                loading={loadingAdd}
                                            >
                                                اضافة القسم
                                            </Button>

                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>


                            {loading ? <SkeletonTable /> : (
                                <Table dataSource={dataSource} columns={columns} scroll={{ x: '100%' }} pagination={{
                                    total: categoryCount,
                                    pageSize: 10
                                }} />
                            )}

                        </div>

                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default Categories
