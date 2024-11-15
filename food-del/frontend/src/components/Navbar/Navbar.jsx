import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);  // Fetch setToken from StoreContext

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");  // Remove token from localStorage
    setToken("");  // Clear token state
    navigate("/");  // Redirect to home page
  };

  return (
    <div className="navbar">
      {/* Logo on the left */}
      <Link to='/'><img src={assets.logo1} alt="Logo" className="logo" /></Link>
      
      {/* Centered navigation links */}
      <ul>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>

      {/* Right side icons and sign-in button */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon" /></Link>
          {/* Show red dot if there are items in the cart */}
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile Icon" />
            {/* Dropdown menu */}
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders Icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>  {/* Logout on click */}
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
