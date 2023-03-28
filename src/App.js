import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';

import {
  Home,
  About,
  Cart,
  Checkout,
  SingleProduct,
  Products,
  Error,
  PrivateRoute,
  AuthWrapper,
} from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={<PrivateRoute component={Checkout} />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productID" element={<SingleProduct />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
