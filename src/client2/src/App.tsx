import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      {/* header */}
      {/* wrapper */}
      <Route path="/order/:id" component={OrderPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/placeorder" component={PlaceOrderPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/property/:id" component={PropertyPage} />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/admin/userlist" component={UserListPage} />
      <Route path="/admin/user/:id/edit" component={UserEditScreen} />
      <Route
        path="/admin/propertylist"
        component={PropertyListScreen}
        exact
      />
      <Route
        path="/admin/propertylist/:pageNumber"
        component={PropertyListScreen}
        exact
      />

      <Route path="/admin/property/:id/edit" component={PropertyEditScreen} />
      <Route path="/admin/orderlist" component={OrderListScreen} />
      <Route path="/search/:keyword" component={HomeScreen} exact />
      <Route path="/page/:pageNumber" component={HomeScreen} exact />
      <Route
        path="/search/:keyword/page/:pageNumber"
        component={HomeScreen}
        exact
      />
      <Route path="/" component={HomeScreen} exact />
    </Router>
  );
};

export default App;
