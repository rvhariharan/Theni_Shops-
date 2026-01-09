// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShopDetail from './pages/ShopDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop/:id" element={<ShopDetail />} />
    </Routes>
  );
}

export default App;