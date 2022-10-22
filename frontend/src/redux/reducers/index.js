import { combineReducers } from 'redux';
import { products,  productDetail, newProduct, deleteProduct, updateProduct, search,productsCategory} from "./products";
import { allCategories, categoryDetail, newCategory, deleteCategory } from "./category";
import { auth, user, forgotPassword, allUsers, deleteUser, updateUser, userDetail } from "./user";
import { cart } from "./cart";
import { order, getOrder, getOrderDetails, allOrders, deleteOrder, updateOrder } from "./order";
import { review, getReviews, deleteReview } from "./review";

export default combineReducers({
  products,
  
  search,
  productsCategory,
  productDetail,
  auth,
  user,
  allUsers,
  deleteUser,
  updateUser,
  userDetail,
  forgotPassword,
  cart,
  order,
  getOrder,
  getOrderDetails,
  newProduct,
  deleteProduct,
  updateProduct,
  allOrders,
  deleteOrder,
  updateOrder,
  review,
  deleteReview,
  getReviews,
  allCategories,
  categoryDetail,
  newCategory,
  deleteCategory
});