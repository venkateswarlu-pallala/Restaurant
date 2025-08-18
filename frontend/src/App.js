import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage'; // Import CartPage
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;