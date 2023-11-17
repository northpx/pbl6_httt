import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from "./components/Layout";
import About from './pages/About';
import Contact from './pages/Contact';
import Ourstore from './pages/Ourstore';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Signup from './pages/Signup';
import Resetpassword from './pages/Resetpassword';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Singleproduct from './pages/Singleproduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<Ourstore />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product/:id" element={<Singleproduct />}/>
            <Route path="checkout" element={<Checkout />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
