import * as Types from './types.js';

import { updateData, getData, deleteData } from "../../helpers/axios";





// newReview
export const newReview = (review) => (dispatch) => {

    dispatch({ type: Types.NEW_REVIEW_REQUEST });
    updateData(`product/review/new`, review)
        .then((res) => {
            dispatch({
                type: Types.NEW_REVIEW_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.NEW_REVIEW_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}
//  getProductReviews
export const getProductReviews = (productId) => (dispatch) => {

    dispatch({ type: Types.GET_REVIEWS_REQUEST });
    getData(`product/reviews?id=${productId}`)
        .then((res) => {
            dispatch({
                type: Types.GET_REVIEWS_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.GET_REVIEWS_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


// delete  Review
export const deleteReview = (id, productId) => (dispatch) => {
    dispatch({ type: Types.DELETE_REVIEW_REQUEST });
    deleteData(`product/reviews/delete?id=${id}&productId=${productId}`)
        .then((res) => {
            dispatch({
                type: Types.DELETE_REVIEW_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.DELETE_REVIEW_FAIL,
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