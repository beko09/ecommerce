import * as Types from '../actions/types.js';
const initialState = {
    categories: [],
    loading: true,
    error: null
};

export const allCategories = (state = initialState, action) => {
    switch (action.type) {
        case Types.ALL_CATEGORIES_REQUEST:
            {
                return {
                    loading: true,
                    categories: []
                }
            }
        case Types.ALL_CATEGORIES_SUCCESS:
            {
                return {
                    loading: false,
                    categories: action.payload.categories,
                    categoryCount: action.payload.categoryCount
                }
            }

        case Types.ALL_CATEGORIES_FAIL:
            {
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

        default:
            return state;
    }
}



export const newCategory = (state = { category: {} }, action) => {
    switch (action.type) {

        case Types.ADD_CATEGORY_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.ADD_CATEGORY_SUCCESS: {
            return {
                loading: false,
                success: action.payload.success,
                category: action.payload.category
            }
        }
        case Types.ADD_CATEGORY_RESET: {
            return {
                ...state,
                success: false
            }
        }
        case Types.ADD_CATEGORY_FAIL: {
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


export const deleteCategory = (state = { category: {} }, action) => {
    switch (action.type) {

        case Types.DELETE_CATEGORY_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.DELETE_CATEGORY_SUCCESS: {
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        }
        case Types.DELETE_CATEGORY_RESET: {
            return {
                ...state,
                isDeleted: false
            }
        }
        case Types.DELETE_CATEGORY_FAIL: {
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

export const categoryDetail = (state = { category: {} }, action) => {
    switch (action.type) {
        case Types.GET_CATEGORY_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.GET_CATEGORY_SUCCESS: {
            return {
                loading: false,
                category: action.payload.category
            }
        }
        case Types.GET_CATEGORY_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case Types.CLEAR_ERROR: {
            return {
                ...state,
                loading: false,
                error: null
            }
        }

        default:
            return state;
    }
}
