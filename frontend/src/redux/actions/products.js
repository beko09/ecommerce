
import * as Types from './types.js';

import { getData, postData, deleteData, updateData } from "../../helpers/axios";




// get all products with limit
export const getProducts = () => (dispatch) => {
  dispatch({ type: Types.GET_PRODUCTS });
  getData('products')
    .then((res) => {
      dispatch({
        type: Types.GET_PRODUCTS_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_PRODUCTS_FAIL,
        payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
      });
    });
};
// get all products without limit
export const getAllProducts = () => (dispatch) => {
  dispatch({ type: Types.GET_ALL_PRODUCTS });
  getData('products/all')
    .then((res) => {
      dispatch({
        type: Types.GET_ALL_PRODUCTS_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_ALL_PRODUCTS_FAIL,
        payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
      });
    });
};




// get all products by category
// page = 1 , price, category, rating = 0 ,text = ''
export const getProductsCategory = (page = 1, category) => (dispatch) => {
  let url = `products/category/${category}?page=${page}`;
  dispatch({ type: Types.GET_PRODUCTS_CATEGORY });
  getData(url)
    .then((res) => {
      dispatch({
        type: Types.GET_PRODUCTS_CATEGORY_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_PRODUCTS_CATEGORY_FAIL,
        payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
      });
    });
};







// get  product detail
export const getProductDetail = (id) => (dispatch) => {
  dispatch({ type: Types.GET_PRODUCT_DETAIL });
  getData(`product/${id}`)
    .then((res) => {
      dispatch({
        type: Types.GET_PRODUCT_DETAIL_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_PRODUCT_DETAIL_FAIL,
        payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
      });
    });
};


// get  products admin
export const getAdminProducts = (page = 1) => (dispatch) => {
  let url = `admin/products?page=${page}`
  dispatch({ type: Types.ADMIN_PRODUCTS_REQUEST });
  getData(url)
    .then((res) => {
      dispatch({
        type: Types.ADMIN_PRODUCTS_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.ADMIN_PRODUCTS_FAIL,
        payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
      });
    });
};



// newProduct
export const newProduct = (data) => (dispatch) => {
  dispatch({ type: Types.ADD_PRODUCT_REQUEST });
  postData(`admin/product/new`, data)
    .then((res) => {
      dispatch({
        type: Types.ADD_PRODUCT_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.ADD_PRODUCT_FAIL,
        payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
      });
    });
}



// update product
export const updateProduct = (id, data) => (dispatch) => {
  dispatch({ type: Types.UPDATE_PRODUCT_REQUEST });
  updateData(`admin/product/${id}`, data)
    .then((res) => {
      dispatch({
        type: Types.UPDATE_PRODUCT_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.UPDATE_PRODUCT_FAIL,
        payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
      });
    });
}

// delete  product 
export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: Types.DELETE_PRODUCT_REQUEST });
  deleteData(`admin/product/${id}`)
    .then((res) => {
      dispatch({
        type: Types.DELETE_PRODUCT_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.DELETE_PRODUCT_FAIL,
        payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
      });
    });
};


// clear error
export const clearError = () => async (dispatch) => {
  dispatch({
    type: Types.CLEAR_ERROR
  })
}



