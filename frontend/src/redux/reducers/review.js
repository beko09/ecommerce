import * as Types from "../actions/types";


export const review = (state = {}, action) => {
    switch (action.type) {


        case Types.NEW_REVIEW_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.NEW_REVIEW_SUCCESS: {
            return {
                loading: false,
                success: action.payload
            }
        }
        case Types.NEW_REVIEW_RESET: {
            return {
                ...state,
                success: false
            }
        }
        case Types.NEW_REVIEW_FAIL: {
            return {
                loading: false,
                reviewError: action.payload
            }
        }

        case Types.CLEAR_ERROR: {
            return {
                loading: false,
                ...state,
                reviewError: null
            }
        }
        default: {
            return state;
        }
    }
}
export const getReviews = (state = { reviews: [] }, action) => {
    switch (action.type) {

        case Types.GET_REVIEWS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.GET_REVIEWS_SUCCESS: {
            return {
                loading: false,
                reviews: action.payload.reviews
            }
        }

        case Types.GET_REVIEWS_FAIL: {
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


export const deleteReview = (state = { review: {} }, action) => {
    switch (action.type) {

        case Types.DELETE_REVIEW_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.DELETE_REVIEW_SUCCESS: {
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        }
        case Types.DELETE_REVIEW_RESET: {
            return {
                ...state,
                isDeleted: false
            }
        }
        case Types.DELETE_REVIEW_FAIL: {
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