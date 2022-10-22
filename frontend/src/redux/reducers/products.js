import * as Types from '../actions/types.js';
const initialState = {
  products: [],
  loading: true,
  error: null
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PRODUCTS:
    case Types.GET_ALL_PRODUCTS:
    case Types.ADMIN_PRODUCTS_REQUEST:
      {
        return { 
          loading: true,
          products: []
        }
      }
    case Types.GET_PRODUCTS_SUCCESS:
    case Types.GET_ALL_PRODUCTS_SUCCESS:
      {
        return {
          loading: false,
          products: action.payload.products
        }
      }
    case Types.ADMIN_PRODUCTS_SUCCESS: {
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        productPerPage: action.payload.productPerPage 
      }
    }
    case Types.GET_PRODUCTS_FAIL:
    case Types.GET_ALL_PRODUCTS_FAIL:
    case Types.ADMIN_PRODUCTS_FAIL:
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



export const newProduct = (state = { product: {} }, action) => {
  switch (action.type) {

    case Types.ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case Types.ADD_PRODUCT_SUCCESS: {
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product
      }
    }
    case Types.ADD_PRODUCT_RESET: {
      return {
        ...state,
        success: false
      }
    }
    case Types.ADD_PRODUCT_FAIL: {
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


export const deleteProduct = (state = { product: {} }, action) => {
  switch (action.type) {

    case Types.DELETE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case Types.DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      }
    }
    case Types.ADD_PRODUCT_RESET: {
      return {
        ...state,
        isDeleted: false
      }
    }
    case Types.DELETE_PRODUCT_FAIL: {
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



export const updateProduct = (state = { product: {} }, action) => {
  switch (action.type) {

    case Types.UPDATE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case Types.UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    }
    case Types.UPDATE_PRODUCT_RESET: {
      return {
        ...state,
        isUpdated: false
      }
    }
    case Types.UPDATE_PRODUCT_FAIL: {
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




export const productDetail = (state = { product: {} }, action) => {
  switch (action.type) {
    case Types.GET_PRODUCT_DETAIL: {
      return {
        ...state,
        loading: true
      }
    }
    case Types.GET_PRODUCT_DETAIL_SUCCESS: {
      return {
        loading: false,
        product: action.payload.product
      }
    }
    case Types.GET_PRODUCT_DETAIL_FAIL: {
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

export const search = (state = { products: [] }, action) => {
  switch (action.type) {
    case Types.SEARCH_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case Types.SEARCH_SUCCESS: {
      return {
        loading: false,
        products: action.payload.products
      }
    }
    case Types.SEARCH_FAIL: {
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




export const productsCategory = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PRODUCTS_CATEGORY:
      {
        return { 
          loading: true,
          products: []
        }
      }
    case Types.GET_PRODUCTS_CATEGORY_SUCCESS:
      {
        return {
          loading: false,
          products: action.payload.products,
            productsCount: action.payload.productsCount,
          productPerPage: action.payload.productPerPage,
        }
      }
   
    case Types.GET_PRODUCTS_CATEGORY_FAIL:
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

