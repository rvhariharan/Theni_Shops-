// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Using FontAwesome Icons (Same as Detail Page)
import { FaSearch, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaInstagram, FaArrowRight, FaEye } from "react-icons/fa";
import { shops } from '../data/shops';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const categories = ['All', 'Agriculture', 'Textiles', 'Construction', 'Food'];
  
  // Locations-a duplicate illama edukura logic
  const locations = ['All', ...Array.from(new Set(shops.map((s) => s.location)))];

  // Logic: Search & Filter function
  const filteredShops = shops.filter((shop) => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          shop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || shop.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || shop.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* --- Sticky Header & Search --- */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-gray-800 mb-3">Theni Business Forum</h1>

        {/* Search Bar */}
        <div className="relative mb-3">
          <FaSearch className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search shops, services, or location..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border
                ${selectedCategory === cat 
                  ? 'bg-gray-800 text-white border-gray-800' 
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Locations (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mt-1 scrollbar-hide">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border
                ${selectedLocation === loc
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
              <FaMapMarkerAlt className="inline mr-1 mb-0.5" />
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* --- Shop List Cards --- */}
      <div className="p-4 space-y-5">
        <h2 className="font-bold text-lg text-gray-800">All Businesses</h2>
        
        {filteredShops.map((shop) => (
          <div 
            key={shop.id} 
            // MAIN CLICK: Navigates to detail page
            onClick={() => navigate(`/shop/${shop.id}`)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
          >
            {/* Image Area */}
            <div className="relative h-44 w-full overflow-hidden">
              <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 right-3 bg-white/95 px-2 py-1 rounded-md text-[10px] font-bold text-green-700 shadow-sm uppercase tracking-wider">
                {shop.category}
              </span>
            </div>

            {/* Content Area */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{shop.name}</h3>
                  <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wide">Prop: {shop.proprietor}</p>
                </div>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center font-bold shadow-sm">
                  {shop.rating} ★
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 text-xs mt-3 font-medium">
                <FaMapMarkerAlt className="h-3 w-3 mr-1 text-gray-400" />
                {shop.location}
              </div>

              {/* Action Buttons Row */}
              <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                {/* Call Button */}
                <a 
                  href={`tel:${shop.phone}`} 
                  onClick={(e) => e.stopPropagation()} // Prevents Card Click
                  className="flex-1 flex items-center justify-center py-2.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors"
                >
                  <FaPhoneAlt className="h-3 w-3 mr-2" /> Call
                </a>

                {/* WhatsApp Button */}
                <a 
                  href={`https://wa.me/${shop.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevents Card Click
                  className="flex-1 flex items-center justify-center py-2.5 bg-green-50 text-green-600 rounded-lg font-bold text-xs hover:bg-green-100 transition-colors"
                >
                  <FaWhatsapp className="h-4 w-4 mr-2" /> WhatsApp
                </a>

                {/* View Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents Card Click
                    navigate(`/shop/${shop.id}`);
                  }}
                  className="flex-1 flex items-center justify-center py-2.5 bg-orange-50 text-orange-600 rounded-lg font-bold text-xs hover:bg-orange-100 transition-colors"
                >
                   View <FaArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <FaSearch className="h-6 w-6" />
            </div>
            <p className="text-gray-500 font-medium">No shops found matching "{searchTerm}"</p>
            <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedLocation('All');}}
                className="mt-2 text-blue-600 text-sm font-bold hover:underline"
            >
                Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;