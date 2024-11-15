import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-text'>
        <span className='title'>Tomato.</span>
        <span className='admin-panel'>Admin Panel</span>
      </div>
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;
