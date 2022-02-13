import * as React from 'react';
//Navigation Router
import { Routes, Route } from 'react-router-dom';
//Components
import HomePage from './Pages/HomePage.jsx';
import OrderPage from './Pages/OrderPage.jsx'; 
import LoginPage from './Pages/LoginPage.jsx';
import OrderStatusPage from './Pages/OrderStatusPage.jsx';
import StaffPage from './Pages/StaffPage.jsx';
import StaffOrderPage from './Pages/StaffOrderPage.jsx';
import ConfigPage from './Pages/ConfigPage.jsx';
//Toast Notification
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="staffOrder" element={<StaffOrderPage/>}/> 
        <Route path="config" element={<ConfigPage />} />
        <Route path="order/status/:orderID" element={<OrderStatusPage />} />
      </Routes>
    </>
  );
}

export default App;
