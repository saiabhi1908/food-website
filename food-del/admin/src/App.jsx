import React from 'react';
import Navbar from './components/Navbar/Navbar'; // Adjust path as needed
import Sidebar from './components/Sidebar/Sidebar'; // Assuming Sidebar is another component
import { Route, Routes, Navigate } from 'react-router-dom'; // Added Navigate import
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />

        <Routes>
          {/* Redirect "/" to "/list" */}
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
