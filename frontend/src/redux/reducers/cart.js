import * as Types from '../actions/types.js';


export const cart = (state = { cartItems: [], shopInfo: {} }, action) => {
    switch (action.type) {
        case Types.ADD_TO_CART: {
            const item = action.payload;
            const isItemExists = state.cartItems.find((i) => i.product === item.product);
            if (isItemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.product === isItemExists.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        }
        case Types.REMOVE_ITEM_CART: {
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),

            }
        }
        case Types.SAVE_SHOP_INFO: {
            return {
                ...state,
                shopInfo: action.payload
            }
        }
        case Types.EMPTY_CART:
            return {
                ...state,
                cartItems: [],
            };
        default: {
            return state;
        }
    }
}