import * as Types from './types.js';

import { postData, getData, updateData, deleteData } from "../../helpers/axios";



// load user 
export const loadUser = () => (dispatch) => {
    dispatch({ type: Types.LOAD_USER });
    getData('users/profile/me')
        .then((res) => {
            dispatch({
                type: Types.LOAD_USER_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.LOAD_USER_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


// get user detail 
export const getUserDetail = (id) => (dispatch) => {
    dispatch({ type: Types.GET_USER_DETAIL });
    getData(`users/${id}`)
        .then((res) => {
            dispatch({
                type: Types.GET_USER_DETAIL_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.GET_USER_DETAIL_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
};


// login 
export const login = (email, password) => (dispatch) => {
    const data = { email, password }
    dispatch({ type: Types.GET_LOGIN });
    postData(`users/login`, data)
        .then((res) => {

            dispatch({
                type: Types.GET_LOGIN_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.GET_LOGIN_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


// register
export const register = (data) => (dispatch) => {
    dispatch({ type: Types.GET_REGISTER });
    postData(`users/register`, data)
        .then((res) => {
            dispatch({
                type: Types.GET_REGISTER_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.GET_REGISTER_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


// update profile
export const updateProfile = (data) => (dispatch) => {

    dispatch({ type: Types.UPDATE_PROFILE_REQUEST });
    updateData(`users/profile/me/update`, data)
        .then((res) => {
            dispatch({
                type: Types.UPDATE_PROFILE_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.UPDATE_PROFILE_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


// update profile
export const updatePassword = (data) => (dispatch) => {
    dispatch({ type: Types.UPDATE_PASSWORD_REQUEST });
    updateData(`users/password/update`, data)
        .then((res) => {
            dispatch({
                type: Types.UPDATE_PASSWORD_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.UPDATE_PASSWORD_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}
// reset password
export const resetPassword = (token, password) => (dispatch) => {
    dispatch({ type: Types.NEW_PASSWORD_REQUEST });
    updateData(`users/password/reset/${token}`, password)
        .then((res) => {
            dispatch({
                type: Types.NEW_PASSWORD_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.NEW_PASSWORD_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


// forgot password
export const forgotPassword = (data) => (dispatch) => {

    dispatch({ type: Types.FORGOT_PASSWORD_REQUEST });
    postData(`users/password/forgot`, data)
        .then((res) => {
            dispatch({
                type: Types.FORGOT_PASSWORD_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.FORGOT_PASSWORD_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


// load all user 
export const allUsers = (page = 1) => (dispatch) => {
    dispatch({ type: Types.ALL_USERS_REQUEST });
    getData(`users?page=${page}`)
        .then((res) => {
            dispatch({
                type: Types.ALL_USERS_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.ALL_USERS_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}


//  delete Order
export const deleteUser = (id) => (dispatch) => {
    dispatch({ type: Types.DELETE_USER_REQUEST });
    deleteData(`users/delete/${id}`)
        .then((res) => {
            dispatch({
                type: Types.DELETE_USER_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.DELETE_USER_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}



// update user
export const updateUser = (id, data) => (dispatch) => {
    dispatch({ type: Types.UPDATE_USER_REQUEST });
    updateData(`users/update/${id}`, data)
        .then((res) => {
            dispatch({
                type: Types.UPDATE_USER_SUCCESS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.UPDATE_USER_FAIL,
                payload: err.response?.data.errorMessage || 'خطأ في شبكة الانترنت'
            });
        });
}



// logout
export const logout = () => (dispatch) => {
    getData('users/logout')
        .then(() => {
            dispatch({
                type: Types.LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch({
                type: Types.LOGOUT_FAIL,
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