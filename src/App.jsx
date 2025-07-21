import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import Category from "@/components/pages/Category";
import ProductDetail from "@/components/pages/ProductDetail";
import Search from "@/components/pages/Search";
import Cart from "@/components/pages/Cart";
import Checkout from "@/components/pages/Checkout";
import OrderConfirmation from "@/components/pages/OrderConfirmation";
import Orders from "@/components/pages/Orders";
import OrderTracking from "@/components/pages/OrderTracking";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/track-order/:orderId" element={<OrderTracking />} />
        </Routes>
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;