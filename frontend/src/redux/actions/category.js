
import * as Types from './types.js';

import { getData, postData, deleteData } from "../../helpers/axios";


// get all categories
export const getAdminCategories = () => (dispatch) => {

    dispatch({ type: Types.ALL_CATEGORIES_REQUEST });
    getData(`admin/categories`)
        .then((res) => {
            dispatch({
                type: Types.ALL_CATEGORIES_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.ALL_CATEGORIES_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
};


// get  Category detail
export const getCategoryDetail = (id) => (dispatch) => {
    dispatch({ type: Types.GET_CATEGORY_REQUEST });
    getData(`admin/category/${id}`)
        .then((res) => {
            dispatch({
                type: Types.GET_CATEGORY_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.GET_CATEGORY_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
};






// newProduct
export const newCategory = (name) => (dispatch) => {
    dispatch({ type: Types.ADD_CATEGORY_REQUEST });
    postData(`admin/category/new`, name)
        .then((res) => {
            dispatch({
                type: Types.ADD_CATEGORY_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.ADD_CATEGORY_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}





// delete Category
export const deleteCategory = (id) => (dispatch) => {
    dispatch({ type: Types.DELETE_CATEGORY_REQUEST });
    deleteData(`admin/category/${id}`)
        .then((res) => {
            dispatch({
                type: Types.DELETE_CATEGORY_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.DELETE_CATEGORY_FAIL,
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



