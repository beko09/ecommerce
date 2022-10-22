import * as Types from './types.js';

import { postData, getData, deleteData, updateData } from "../../helpers/axios";





// createOrder
export const createOrder = (order) => (dispatch, getState) => {

    dispatch({ type: Types.CREATE_ORDER_REQUEST });
    postData(`order/new`, order)
        .then((res) => {
            dispatch({
                type: Types.CREATE_ORDER_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.CREATE_ORDER_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}




//  getOrders
export const getOrders = (page = 1) => (dispatch) => {
    dispatch({ type: Types.GET_ORDER_REQUEST });
    getData(`order/me?page=${page}`)
        .then((res) => {
            dispatch({
                type: Types.GET_ORDER_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.GET_ORDER_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}



//  get all Orders
export const allOrders = (page = 1) => (dispatch) => {
    dispatch({ type: Types.ALL_ORDERS_REQUEST });
    getData(`order?page=${page}`)
        .then((res) => {
            dispatch({
                type: Types.ALL_ORDERS_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.ALL_ORDERS_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}



//  getOrder Details
export const getOrderDetail = (id) => (dispatch) => {
    dispatch({ type: Types.GET_ORDER_DETAILS_REQUEST });
    getData(`order/${id}`)
        .then((res) => {
            dispatch({
                type: Types.GET_ORDER_DETAILS_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.GET_ORDER_DETAILS_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


// update order
export const updateOrder = (id, data) => (dispatch) => {
    dispatch({ type: Types.UPDATE_ORDER_REQUEST });
    updateData(`order/update/${id}`, data)
        .then((res) => {
            dispatch({
                type: Types.UPDATE_ORDER_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.UPDATE_ORDER_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}



//  delete Order
export const deleteOrder = (id) => (dispatch) => {
    dispatch({ type: Types.DELETE_ORDER_REQUEST });
    deleteData(`order/delete/${id}`)
        .then((res) => {
            dispatch({
                type: Types.DELETE_ORDER_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.DELETE_ORDER_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}

// clear error
export const clearError = () => async (dispatch) => {
    dispatch({
        type: Types.CLEAR_ERROR
    })
}