import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"



const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"]
}
const middleware = [thunk];
const pReducer = persistReducer(persistConfig, rootReducer)

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shopInfo: localStorage.getItem('shopInfo')
      ? JSON.parse(localStorage.getItem('shopInfo'))
      : {}
  }
}

const store = createStore(
  pReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persister = persistStore(store);
export { persister, store };