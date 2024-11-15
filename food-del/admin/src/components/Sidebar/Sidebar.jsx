import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <div className="sidebar-option">
          <NavLink 
            to="/add" 
            className={({ isActive }) => (isActive ? "active-link" : "")} // Updated to use className instead of activeClassName
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
          </NavLink>
        </div>

        <div className="sidebar-option">
          <NavLink 
            to="/list" 
            className={({ isActive }) => (isActive ? "active-link" : "")} // Updated here
          >
            <img src={assets.order_icon} alt="" />
            <p>Items</p>
          </NavLink>
        </div>

        <div className="sidebar-option">
          <NavLink 
            to="/orders" 
            className={({ isActive }) => (isActive ? "active-link" : "")} // Updated here
          >
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
