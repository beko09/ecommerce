import * as Types from '../actions/types.js';


export const auth = (state = { user: {} }, action) => {
    switch (action.type) {
        case Types.GET_LOGIN:
        case Types.GET_REGISTER:
        case Types.LOAD_USER:
            {
                return {
                    loading: true,
                    isAuthenticated: false
                }
            }
        case Types.GET_LOGIN_SUCCESS:
        case Types.GET_REGISTER_SUCCESS:
        case Types.LOAD_USER_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: true,
                    user: action.payload
                }
            }
        case Types.LOGOUT_SUCCESS: {
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        }
        case Types.LOAD_USER_FAIL: {
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        }
        case Types.LOGOUT_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case Types.GET_LOGIN_FAIL:
        case Types.GET_REGISTER_FAIL:
            {
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload
                }
            }
        case Types.CLEAR_ERROR: {
            return {
                ...state,
                error: null

            }
        }


        default:
            return state;
    }
}



export const user = (state = { }, action) => {
    switch (action.type) {
        case Types.UPDATE_PROFILE_REQUEST:
        case Types.UPDATE_PASSWORD_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.UPDATE_PROFILE_SUCCESS:
        case Types.UPDATE_PASSWORD_SUCCESS: {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload

            }
        }

        case Types.UPDATE_PROFILE_RESET:
        case Types.UPDATE_PASSWORD_RESET: {
            return {
                ...state,
                isUpdated: false,
                loading: false
            }
        }

        case Types.UPDATE_PROFILE_FAIL:
        case Types.UPDATE_PASSWORD_FAIL: {
            return {
                ...state,
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



export const forgotPassword = (state = {}, action) => {
    switch (action.type) {
        case Types.FORGOT_PASSWORD_REQUEST:
        case Types.NEW_PASSWORD_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                    error: null
                }
            }
        case Types.FORGOT_PASSWORD_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    msg: action.payload
                }
            }
        case Types.NEW_PASSWORD_SUCCESS: {
            return {
                ...state,
                success: action.payload
            }
        }

        case Types.FORGOT_PASSWORD_FAIL:
        case Types.NEW_PASSWORD_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}



export const allUsers = (state = { users: [] }, action) => {
    switch (action.type) {
        case Types.ALL_USERS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.ALL_USERS_SUCCESS: {
            return {
                loading: false,
                users: action.payload.users,
                userPerPage: action.payload.userPerPage,
                usersCount: action.payload.usersCount
            }
        }

        case Types.ALL_USERS_FAIL: {
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


export const deleteUser = (state = { user: {} }, action) => {
    switch (action.type) {

        case Types.DELETE_USER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.DELETE_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        }
        case Types.DELETE_USER_RESET: {
            return {
                ...state,
                isDeleted: false
            }
        }
        case Types.DELETE_USER_FAIL: {
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


export const updateUser = (state = { user: {} }, action) => {
    switch (action.type) {

        case Types.UPDATE_USER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case Types.UPDATE_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        }
        case Types.UPDATE_USER_RESET: {
            return {
                ...state,
                isUpdated: false
            }
        }
        case Types.UPDATE_USER_FAIL: {
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


export const userDetail = (state = { user: {} }, action) => {
    switch (action.type) {
        case Types.GET_USER_DETAIL: {
            return {
                loading: true
            }
        }
        case Types.GET_USER_DETAIL_SUCCESS: {
            return {
                loading: false,
                user: action.payload.user
            }
        }
        case Types.GET_USER_DETAIL_FAIL: {
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