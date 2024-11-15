import React, { useState } from 'react';  
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);  // Initialize state for login popup

  return (
    <>
      {/* Conditionally render the LoginPopup component when showLogin is true */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}  {/* Pass setShowLogin to LoginPopup */}
      
      <div className='app'>
        {/* Pass setShowLogin to Navbar for handling login popup visibility */}
        <Navbar setShowLogin={setShowLogin} />
        
        {/* Define the routes for your application */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      
      {/* Footer is rendered below the main content */}
      <Footer />
    </>
  );
}

export default App;
