import * as Types from '../actions/types.js';

export const order = (state = {}, action) => {
    switch (action.type) {
        case Types.CREATE_ORDER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.CREATE_ORDER_SUCCESS: {
            return {
                loading: false,
                order: action.payload
            }
        }

        case Types.CREATE_ORDER_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case Types.CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}


export const getOrder = (state = { orders: [] }, action) => {
    switch (action.type) {
        case Types.GET_ORDER_REQUEST: {
            return {
                loading: true
            }
        }
        case Types.GET_ORDER_SUCCESS: {
            return {
                loading: false,
                orders: action.payload.orders,
                ordersCount: action.payload.ordersCount,
                orderPerPage: action.payload.orderPerPage
            }
        }

        case Types.GET_ORDER_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case Types.CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}


export const getOrderDetails = (state = { order: {} }, action) => {
    switch (action.type) {
        case Types.GET_ORDER_DETAILS_REQUEST: {
            return {
                loading: true
            }
        }
        case Types.GET_ORDER_DETAILS_SUCCESS: {
            return {
                loading: false,
                order: action.payload.order
            }
        }

        case Types.GET_ORDER_DETAILS_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case Types.CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}
export const allOrders = (state = { orders: [] }, action) => {
    switch (action.type) {
        case Types.ALL_ORDERS_REQUEST: {
            return {
                loading: true
            }
        }
        case Types.ALL_ORDERS_SUCCESS: {
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount,
                ordersCount: action.payload.ordersCount,
                orderPerPage: action.payload.orderPerPage
               
            }
        }

        case Types.ALL_ORDERS_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }
        case Types.CLEAR_ERROR: {
            return {
                ...state,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}


export const deleteOrder = (state = { order: {} }, action) => {
    switch (action.type) {

        case Types.DELETE_ORDER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.DELETE_ORDER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        }
        case Types.DELETE_ORDER_RESET: {
            return {
                ...state,
                isDeleted: false
            }
        }
        case Types.DELETE_ORDER_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }

        case Types.CLEAR_ERROR: {
            return {
                loading: false,
                ...state,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}





export const updateOrder = (state = { order: {} }, action) => {
    switch (action.type) {

        case Types.UPDATE_ORDER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.UPDATE_ORDER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        }
        case Types.UPDATE_ORDER_RESET: {
            return {
                ...state,
                isUpdated: false
            }
        }
        case Types.UPDATE_ORDER_FAIL: {
            return {
                loading: false,
                error: action.payload
            }
        }

        case Types.CLEAR_ERROR: {
            return {
                loading: false,
                ...state,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}
