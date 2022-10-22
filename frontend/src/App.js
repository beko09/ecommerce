import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Pages from "./pages/index";
import * as Container from "./container/index";
import ProtectRoute from "./route/ProtectRoute";



function App() {
  return (
    <Router>
      <div className="App">
        <Container.Navbar />
        <Switch>
          <Route path="/" component={Pages.Home} exact />
          <Route path="/q/:text" component={Pages.Home} />
          <Route path="/contact" component={Pages.Contact} />
          <Route path="/product/:id" component={Pages.ProductDetail} exact />
          <Route path="/products/category/:id" component={Pages.CategoryProduct} exact />
          <Route path="/users/login" component={Pages.Login} exact />
          <Route path="/users/register" component={Pages.Register} exact />
          <Route path="/users/password/forgot" component={Container.ForgotPassword} exact />
          <Route path="/users/password/reset/:token" component={Container.NewPassword} exact />
          <ProtectRoute path="/payment" component={Container.Payment} />
          <ProtectRoute path="/users/profile/me" component={Pages.Profile} exact />
          <ProtectRoute path="/users/profile/update" component={Container.UpdateProfile} exact />
          <ProtectRoute path="/users/password/update" component={Container.UpdatePassword} exact />
          <Route path="/cart" component={Container.Cart} exact />
          <ProtectRoute path="/shipping" component={Container.Shipping} exact />
          <ProtectRoute path="/order/confirm" component={Container.ConfirmOrder} exact />
          <ProtectRoute path="/order/success" component={Container.OrderSuccess} exact />
          <ProtectRoute path="/orders/me" component={Container.ListOrders} exact />
          <ProtectRoute path="/order/:id" component={Container.OrderDetails} exact />
          <ProtectRoute path="/dashboard" isAdmin={true} component={Container.Dashboard} exact />
          <ProtectRoute path="/admin/products" isAdmin={true} component={Container.ProductsList} exact />
          <ProtectRoute path="/admin/product/new" isAdmin={true} component={Container.NewProduct} exact />
          <ProtectRoute path="/admin/product/:id" isAdmin={true} component={Container.UpdateProduct} exact />
          <ProtectRoute path="/admin/order/:id" isAdmin={true} component={Container.ProcessOrder} exact />
          <ProtectRoute path="/admin/orders" isAdmin={true} component={Container.OrdersList} exact />
          <ProtectRoute path="/admin/users" isAdmin={true} component={Container.UsersList} exact />
          <ProtectRoute path="/admin/user/:id" isAdmin={true} component={Container.UpdateUser} exact />
          <ProtectRoute path="/admin/reviews" isAdmin={true} component={Container.ProductReviews} exact />
          <ProtectRoute path="/admin/categories" isAdmin={true} component={Container.Categories} exact />
          <Route component={Pages.NotFound} />
        </Switch>
        <Container.Footer />
      </div>
    </Router >
  );
}

export default App;
