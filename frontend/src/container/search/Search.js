
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Modal, Input, AutoComplete, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../helpers/axios";
import * as Types from '../../redux/actions/types'
import {
    LoadingOutlined, SearchOutlined
} from '@ant-design/icons';
import "./search.css";


const Search = () => {
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);
    const [text, setText] = useState('');
    const { loading, error, products
    } = useSelector(state => state.search);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const searchResult = (products) =>
        products?.map((product) => {
            return {
                label: (
                    <div
                        className="result"
                        onClick={handleCancel}
                    >
                        <div>
                            {
                                product?.images[0] ?
                                    <div className="resultImage">
                                        <Link
                                            className="searchResult"
                                            to={`/product/${product._id}`}
                                            rel="noopener noreferrer"
                                        >

                                            <img alt={product.name} src={product.images[0].url}
                                            />
                                        </Link>
                                    </div>

                                    : <p>No Image</p>

                            }
                        </div>

                        <div className="searchContent">
                            <div><Link
                                className="searchResult"
                                to={`/product/${product._id}`}
                                rel="noopener noreferrer"
                            >
                                {product.name}
                            </Link>
                            </div>
                            <div>
                                السعر :<span><bdi>{product.price} ج س </bdi></span>
                            </div>
                            <div>
                                القسم :<span>{product.category.name}</span>
                            </div>
                        </div>
                    </div>
                ),
            }
        })

    useEffect(() => {
        if (text)
        {
            getData(`search?q=${text}`)
                .then((res) => {
                    dispatch({ type: Types.SEARCH_REQUEST });
                    dispatch({
                        type: Types.SEARCH_SUCCESS,
                        payload: res,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: Types.SEARCH_FAIL,
                        payload: err.response?.data.error || 'network error'
                    });
                })
        };
        if (error && typeof error !== 'object' && error !== null)
        {
            message.error(error);
        }

    }, [dispatch, error, text])
    const handleSearchText = (value) => {
        // setText(e.target.value)
        setText(value?.trim())
        setOptions(loading ? <LoadingOutlined /> : searchResult(products));


    }

    return (
        <>
            <SearchOutlined onClick={showModal} className="searchIconSm" />
            <Modal className="modalSearch" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <AutoComplete
                    dropdownMatchSelectWidth={252}
                    className="search"
                    options={options}
                    onChange={handleSearchText}
                    notFoundContent="لا توجد نتائج"
                    allowClear={true}
                    backfill={true}

                >
                    <Input className="inputSearch" size="large" allowClear={true} placeholder="ابحث عن..."
                    />
                </AutoComplete>
            </Modal>
        </>

    )
}

export default Search
