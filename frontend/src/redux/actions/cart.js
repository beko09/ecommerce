
import * as Types from './types.js';

import { getData } from "../../helpers/axios";


// add  product to cart
export const addItemToCart = (id, quantity) => (dispatch, getState) => {

    getData(`product/${id}`)
        .then((res) => {
            const price = res.product.discount > 0 ? res.product.newprice : res.product.price;
            dispatch({
                type: Types.ADD_TO_CART,

                payload: {
                    product: res.product._id,
                    name: res.product.name,
                    price: price,
                    image: res.product.images[0].url,
                    stock: res.product.stock,
                    quantity
                }
            });
        })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};



// remove item from cart
export const removeItemFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: Types.REMOVE_ITEM_CART,
        payload: id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};


// save shop info
export const saveShopInfo = (data) => (dispatch, getState) => {
    dispatch({
        type: Types.SAVE_SHOP_INFO,
        payload: data
    });

    localStorage.setItem('shopInfo', JSON.stringify(data))
};


export const emptyCart = () => async (dispatch) => {
    dispatch({
        type: Types.EMPTY_CART,
    });
};