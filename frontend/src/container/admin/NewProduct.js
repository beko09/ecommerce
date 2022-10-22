import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../commn/metaData/MetaData'
import Sidebar from './Sidebar'
import { Form, Input, Button, Row, Col, Select, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { newProduct } from '../../redux/actions/products'
import { ADD_PRODUCT_RESET } from '../../redux/actions/types'
import { getAdminCategories } from '../../redux/actions/category';


const { Option } = Select;
const NewProduct = ({ history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    // const [dataImages, setDataImages] = useState('');
    const [imagesPreview, setImagesPreview] = useState([])


    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newProduct);
    const { categories } = useSelector(state => state.allCategories);

    useEffect(() => {
        dispatch(getAdminCategories())
        if (error && typeof error !== 'object' && error !== null)
        {
            message.error(error);
        }


        if (success)
        {
            history.push('/admin/products');
            message.success("تم اضافة المنتج بنجاح");
            dispatch({ type: ADD_PRODUCT_RESET })
        }

    }, [dispatch, error, success, history])



    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        // setImages([])
        // setDataImages(e.target.files[0])
        setImages(files)

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2)
                {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    // setImages(oldArray => [...oldArray, reader.result])
                    // setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('seller', seller);
        // formData.append('productImages', images);

        images.forEach(image => {
            formData.append('productImages', image)
        })

        dispatch(newProduct(formData))
    }
    return (
        <Fragment>
            <MetaData title={'New Product'} />
            <div className="container">
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar />
                    </Col>



                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Row className="formLogin">
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <div className="newProduct">

                                    <h3 className="loginTitle">اضافة منتج</h3>
                                    <Form
                                        encType='multipart/form-data'
                                        name="login"
                                        className="login-form"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={submitHandler}
                                    >

                                        <Form.Item
                                            name="name"
                                            validateStatus={error && error.name ? 'error' : undefined}
                                            help={error && error.name}

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'الرجاء ادخال اسم المنتج ',
                                                },
                                            ]}
                                            hasFeedback


                                        >
                                            <Input
                                                name="name"
                                                prefix={<UserOutlined className="site-form-item-icon" />}
                                                placeholder="اسم المنتج"
                                                size="large"
                                                type="text"
                                                value={name}

                                                onChange={(e) => setName(e.target.value)}

                                            />
                                        </Form.Item>


                                        <Form.Item
                                            name="price"
                                            validateStatus={error && error.price ? 'error' : undefined}
                                            help={error && error.price}

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'الرجاء ادخال السعر ',
                                                },
                                            ]}
                                            hasFeedback


                                        >
                                            <Input
                                                name="price"
                                                prefix={<UserOutlined className="site-form-item-icon" />}
                                                placeholder="ادخل السعر "
                                                size="large"
                                                type="number"
                                                value={price}

                                                onChange={(e) => setPrice(e.target.value)}

                                            />
                                        </Form.Item>


                                        <Form.Item
                                            name="description"
                                            validateStatus={error && error.description ? 'error' : undefined}
                                            help={error && error.description}

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'الرجاء ادخال الوصف ',
                                                },
                                            ]}
                                            hasFeedback
                                            label="الوصف"
                                            className="textArea"


                                        >
                                            <textarea
                                                placeholder="اكتب الوصف"
                                                className="ant-input ant-input-lg"
                                                id="description" rows="4"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}>

                                            </textarea>
                                        </Form.Item>


                                        <Form.Item
                                            name="category"
                                            hasFeedback
                                            rules={[{ required: true, message: 'يرجي اختيار القسم' }]}
                                        >
                                            <Select placeholder="رجاء اختار القسم"
                                                onChange={(value) => setCategory(value)}
                                                value={category}
                                            >
                                                {categories ? categories.map((category) => (
                                                    <Option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </Option>
                                                )) : ""}
                                            </Select>
                                        </Form.Item>


                                        <Form.Item
                                            name="stock"
                                            validateStatus={error && error.stock ? 'error' : undefined}
                                            help={error && error.stock}

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'الرجاء ادخال كمية المنتج في المخزن ',
                                                },
                                            ]}
                                            hasFeedback


                                        >
                                            <Input
                                                name="stock"
                                                prefix={<UserOutlined className="site-form-item-icon" />}
                                                placeholder="كمية المنتج في المخزن"
                                                size="large"
                                                type="number"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}

                                            />
                                        </Form.Item>


                                        <Form.Item
                                            name="seller"
                                            validateStatus={error && error.seller ? 'error' : undefined}
                                            help={error && error.seller}

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'الرجاء ادخال البائع ',
                                                },
                                            ]}
                                            hasFeedback


                                        >
                                            <Input
                                                name="seller"
                                                prefix={<UserOutlined className="site-form-item-icon" />}
                                                placeholder="اسم البائع "
                                                size="large"
                                                type="text"
                                                value={seller}
                                                onChange={(e) => setSeller(e.target.value)}

                                            />
                                        </Form.Item>


                                        <Form.Item
                                            name="productImages"
                                            label="صورة"
                                            type='file'
                                            accept="image/png,image/jpg,image/jpeg"
                                        >

                                            <div className='registerFileInput imgProduct'>

                                                <div className='customFile'>
                                                    <input
                                                        type='file'
                                                        name='productImages'
                                                        className='customFileInput'
                                                        id='customFile'
                                                        accept="image/png,image/jpg,image/jpeg"
                                                        onChange={onChange}
                                                        multiple
                                                    />
                                                    <label className='customFileLabel' htmlFor='customFile'>
                                                        <UploadOutlined />
                                                        <span> تحميل صورة</span>
                                                    </label>
                                                </div>
                                                <div className="imgPreview">
                                                    {imagesPreview.map((img, i) => (
                                                        <div className='avatar imageProducts' key={i}>
                                                            <img

                                                                src={img}
                                                                className='imgAvatar'
                                                                alt='avatar'
                                                                width="55" height="52"
                                                            />
                                                        </div>

                                                    ))}
                                                </div>
                                            </div>

                                        </Form.Item>


                                        <Form.Item>
                                            <Button size="large" type="primary"
                                                htmlType="submit"
                                                className="login-form-button"
                                                disabled={loading ? true : false}
                                                loading={loading}
                                            >
                                                اضافة المنتج
                                            </Button>

                                        </Form.Item>

                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default NewProduct
