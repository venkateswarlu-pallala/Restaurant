import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import CartContext from '../context/CartContext';
import './HomePage.css'; // We will create this CSS file

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data } = await api.get('/menu');
        setMenuItems(data);
        setFilteredItems(data);
        // Dynamically get categories from menu items
        const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const filterMenu = (category) => {
    if (category === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === category));
    }
  }

  return (
    <div className="homepage">
      <div className="menu-filters">
        {categories.map(category => (
          <button key={category} onClick={() => filterMenu(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filteredItems.map((item) => (
          <div key={item._id} className="menu-item-card">
            <img src={item.imageUrl || 'https://via.placeholder.com/300'} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="menu-item-footer">
                <span className="price">${item.price.toFixed(2)}</span>
                <button onClick={() => addToCart(item)} className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;