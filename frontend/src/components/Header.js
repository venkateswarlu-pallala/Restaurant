import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import './Header.css'; // We will create this CSS file

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  
  // A simple check for user login state
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">YummiFood</Link>
        </div>
        <nav className="nav-links">
          <Link to="/">Menu</Link>
          {userInfo && <Link to="/orders">My Orders</Link>}
          {userInfo && userInfo.isAdmin && <Link to="/admin">Admin Panel</Link>}
          <Link to="/cart">
            Cart <span className="cart-badge">{cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
          </Link>
          {userInfo ? (
            <button onClick={logoutHandler} className="btn-logout">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;