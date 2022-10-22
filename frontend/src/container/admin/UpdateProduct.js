import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../commn/metaData/MetaData'
import Sidebar from './Sidebar'
import { message, Row, Col, Form, Input, Select, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetail } from '../../redux/actions/products'
import { UPDATE_PRODUCT_RESET } from '../../redux/actions/types'
import { getAdminCategories } from '../../redux/actions/category'

const { Option } = Select;
const UpdateProduct = ({ match, history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])


    const dispatch = useDispatch();

    const { error, product } = useSelector(state => state.productDetail)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.updateProduct);
    const { categories } = useSelector(state => state.allCategories);
    const productId = match.params.id;
    const [form] = Form.useForm();
    useEffect(() => {


        if (product && product._id !== productId)
        {
            dispatch(getProductDetail(productId));
        } else
        {

            setName(product.name);
            setPrice(product.price);
            setDiscount(product.discount);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock)
            setOldImages(product.images)
        }

        if (error && typeof error !== 'object' && error !== null)
        {
            message.error(error);
        }
        if (updateError && typeof deleteError !== 'object' && updateError !== null)
        {
            message.error(updateError);
        }


        if (isUpdated)
        {
            history.push('/admin/products');
            message.success('تم تحديث المنتج بنجاح!');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
        dispatch(getAdminCategories());


    }, [dispatch, error,
        isUpdated, history,
        updateError, product,
        productId,


    ])

    useEffect(() => {
        form.setFieldsValue({
            name,
            price,
            discount,
            category,
            description,
            seller,
            stock,
            avatar: images,
        })
    }, [form,
        name,
        price,
        discount,
        category,
        description,
        seller,
        stock,
        images,]);


    const submitHandler = () => {

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('discount', discount);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('productImages', image)
        })
        dispatch(updateProduct(product._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages(files)
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2)
                {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    // setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <MetaData title={'تحديث المنتج '} />
            <div className="container">
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Sidebar />
                    </Col>

                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <Fragment>
                            <div className="wrapper my-5">

                                <h3 className="loginTitle">تحديث المنتج </h3>
                                <Form
                                    form={form}
                                    name="login"
                                    className="login-form update"
                                    onFinish={submitHandler}
                                    encType='multipart/form-data'
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
                                        label="اسم المنتج"


                                    >
                                        <Input
                                            name="name"
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
                                        label="السعر"


                                    >
                                        <Input
                                            name="price"
                                            placeholder="ادخل السعر "
                                            size="large"
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}

                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="discount"
                                        validateStatus={error && error.discount ? 'error' : undefined}
                                        help={error && error.discount}

                                        rules={[
                                            {
                                                required: true,
                                                message: ' الرجاء ادخال تخفيض السعر ',
                                            },
                                        ]}
                                        hasFeedback
                                        label="تخفيض السعر "


                                    >
                                        <Input
                                            name="discount"
                                            placeholder="تخفيض السعر "
                                            size="large"
                                            type="number"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)}

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
                                            onChange={(e) => setDescription(e.target.value)}
                                        >

                                        </textarea>
                                    </Form.Item>



                                    <Form.Item
                                        name="category"
                                        label="القسم"
                                        hasFeedback
                                        rules={[{ required: true, message: 'يرجي اختيار القسم' }]}
                                    >
                                        <Select placeholder="رجاء اختار القسم"
                                            onChange={(value) => setCategory(value)}
                                            value={category}
                                        >
                                            {categories ? categories?.map((category) => (
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
                                        label=" كمية المنتج في المخزن "


                                    >
                                        <Input
                                            name="stock"
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
                                        label="اسم البائع "

                                    >
                                        <Input
                                            name="seller"
                                            placeholder="اسم البائع "
                                            size="large"
                                            type="text"
                                            value={seller}
                                            onChange={(e) => setSeller(e.target.value)}

                                        />
                                    </Form.Item>




                                    <Form.Item
                                        name="avatar"
                                        label="صورة"
                                        type='file'
                                        accept="image/png,image/jpg,image/jpeg"
                                    >

                                        <div className='registerFileInput imgProduct'>

                                            <div className='customFile'>
                                                <input
                                                    type='file'
                                                    name='avatar'
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
                                                {oldImages && oldImages.map((img, i) => (
                                                    <div className='avatar imageProducts' key={i}>

                                                        <img

                                                            src={img.url}
                                                            className='imgAvatar'
                                                            alt='avatar2'
                                                            width="55" height="52"
                                                        />
                                                    </div>
                                                ))

                                                }
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
                                            تعديل المنتج
                                        </Button>

                                    </Form.Item>

                                </Form>
                            </div>
                        </Fragment>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default UpdateProduct
