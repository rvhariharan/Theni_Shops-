import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Import Brand Icons from react-icons
import { FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaYoutube, FaShareAlt, FaMap, FaInstagram, FaFacebookF, FaLinkedin, FaGlobe, FaClock, FaEnvelope, FaDownload, FaTag, FaBoxOpen } from "react-icons/fa";
import { shops } from '../data/shops';

const ShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };
  
  // URL la irukura ID vechu data edu
  const shop = shops.find(s => s.id === parseInt(id));

  if (!shop) return <div className="p-10 text-center">Shop not found!</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Header Image & Back Button */}
      <div className="relative h-64 w-full">
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={() => navigate(-1)} className="bg-white p-2.5 rounded-full shadow-lg active:scale-95 transition-transform">
            <FaArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          {/* Share Button */}
          <div className="absolute top-0 right-0 p-4">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: shop.name,
                  text: `Check out ${shop.name} on Theni Business Forum!`,
                  url: window.location.href,
                }).catch((error) => console.error('Error sharing:', error));
              } else {
                alert('Sharing is not supported on this browser.');
              }
            }}
            className="bg-white p-2.5 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <FaShareAlt className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="-mt-8 relative bg-white rounded-t-3xl px-6 pt-12 shadow-inner">
        {/* Center logo overlapping the image (generated from shop name) */}
        <div className="absolute left-1/2 -top-10 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-2xl bg-green-600 text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-lg">
            {getInitials(shop.name)}
          </div>
        </div>
        
        {/* Shop Name, Rating & Status */}
        <div className="flex justify-center items-center mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{shop.name}</h1>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="bg-green-600 text-white px-3 py-1 rounded-[2vw] text-sm font-bold shadow-md">
                {shop.rating} ★
              </span>
              <span className="text-sm text-orange-500 font-semibold">Open Now</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-6 justify-center gap-3">
          <span className="uppercase tracking-wide font-semibold text-[10px] border border-gray-200 px-2 py-0.5 rounded mr-3 bg-amber-50 text-amber-700">
            {shop.category}
          </span>
          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span className="text-sm">{shop.location}</span>
          </div>
        </div>

        {/* Proprietor Card */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 border-2 border-white shadow">
            {shop.proprietor.charAt(0)}
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Proprietor</p>
            <p className="font-bold text-gray-800 text-lg">{shop.proprietor}</p>
          </div>
        </div>

        {/* Social & Action Buttons (ordered: WhatsApp, Instagram, Facebook, LinkedIn, YouTube, Website) */}
        <div className="flex justify-center gap-6 mb-8 border-b border-gray-100 pb-8">
          {/* WhatsApp */}
          {shop.whatsapp && (
            <a href={`https://wa.me/${shop.whatsapp}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <FaWhatsapp className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-gray-600">WhatsApp</span>
            </a>
          )}

          {/* Instagram */}
          {shop.Instagram && (
            <a href={shop.Instagram} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 shadow-sm group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                <FaInstagram className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-gray-600">Instagram</span>
            </a>
          )}

          {/* Facebook */}
          {shop.facebook && (
            <a href={shop.facebook} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <FaFacebookF className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-gray-600">Facebook</span>
            </a>
          )}

          {/* LinkedIn */}
          {shop.linkedin && (
            <a href={shop.linkedin} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 shadow-sm group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                <FaLinkedin className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-gray-600">LinkedIn</span>
            </a>
          )}

          {/* YouTube */}
          {shop.youtube && (
            <a href={shop.youtube} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <FaYoutube className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-gray-600">YouTube</span>
            </a>
          )}

          {/* Website */}
          {shop.website && (
            <a href={shop.website} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 shadow-sm group-hover:bg-gray-700 group-hover:text-white transition-colors duration-300">
                <FaGlobe className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-gray-600">Website</span>
            </a>
          )}
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 text-gray-800">About the Business</h3>
          <p className="text-gray-600 leading-relaxed text-sm text-justify">
            {shop.description}
          </p>
          {/* Download Service Catalogue */}
          <div className="mt-4 flex justify-center">
            {shop.catalogue ? (
              // If the shop has a catalogue link, show an enabled download button
              <a
                href={shop.catalogue}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-amber-50 text-amber-700 px-5 py-3 rounded-2xl font-semibold shadow-sm hover:bg-amber-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <FaDownload className="h-4 w-4" />
                </div>
                <span>Download Service Catalogue</span>
              </a>
            ) : (
              // If no catalogue link, show a disabled button
              <button
                disabled
                className="inline-flex items-center gap-3 bg-gray-100 text-gray-400 px-5 py-3 rounded-2xl font-semibold shadow-sm cursor-not-allowed"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <FaDownload className="h-4 w-4" />
                </div>
                <span>Download Service Catalogue</span>
              </button>
            )}
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center mb-4 gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
              <FaTag className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">Products</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {shop.products.map((prod, index) => (
              <div
                key={index}
                className="min-w-[110px] h-28 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center p-3 text-xs font-semibold text-gray-600 shadow-sm hover:shadow-md hover:border-amber-300 transition-transform transform hover:scale-105"
              >
                <img
                  src={shop.image}
                  alt={prod}
                  className="w-20 h-16 object-cover rounded-md mb-2"
                />
                <div>{prod}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        {shop.services && shop.services.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center mb-4 gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                <FaBoxOpen className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-lg text-gray-800">Services</h4>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {shop.services.map((svc, i) => (
                <div key={i} className="min-w-[160px] h-20 bg-white rounded-xl border border-gray-100 flex items-center justify-center px-3 text-sm font-semibold text-gray-700 shadow-sm">
                  {svc}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Opening Hours */}
      {shop.openingHours && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <FaClock className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Opening Hours</p>
              <p className="font-semibold">{shop.openingHours}</p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details */}
      <div className="mb-6 ml-4">
        <div className="flex items-center mb-3 gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
            <FaEnvelope className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-lg text-gray-800">Contact Details</h4>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
          <div className="nth-child-1">
            <p className="text-xs text-gray-500 uppercase">Phone</p>
            <p className="font-semibold">+{shop.phone}</p>
          </div>
          {shop.email && (
            <div className="nth-child-2">
              <p className="text-xs text-gray-500 uppercase">Email</p>
              <p className="font-semibold">{shop.email}</p>
            </div>
          )}
          <div className="nth-child-3">
            <p className="text-xs text-gray-500 uppercase">Address</p>
            <p className="font-semibold">{shop.location}</p>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div className="mb-8 ml-4">
        <div className="flex items-center mb-3 gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
            <FaMapMarkerAlt className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-lg text-gray-800">Location</h4>
        </div>
        <div className="relative rounded-xl overflow-hidden">
          <img src="https://maps.app.goo.gl/FdiJZDMrXNV2eThR7" alt="map" className="w-full h-44 object-cover rounded-xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <a href={shop.map} target="_blank" rel="noreferrer" className="bg-white/95 px-4 py-2 rounded-full font-semibold shadow-md">
              <span className="inline-flex items-center gap-2"><FaMapMarkerAlt className="text-green-600" /> View on Google Maps</span>
            </a>
          </div>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800/70 text-white px-3 py-1 rounded-md text-sm">
            {shop.location}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar (Location / Call / WhatsApp) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-4 flex gap-4 justify-between items-center z-20">
        <a href={shop.map} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center gap-2 bg-white rounded-2xl py-3 shadow-sm text-gray-700">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
            <FaMap className="h-5 w-5" />
          </div>
          <div className="text-xs font-semibold">Location</div>
        </a>
        <a href={`tel:${shop.phone}`} className="flex-1 flex flex-col items-center gap-2 bg-blue-600 text-white rounded-2xl py-3 shadow-lg">
          <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <FaPhoneAlt className="h-5 w-5" />
          </div>
          <div className="text-xs font-semibold">Call</div>
        </a>
        <a href={`https://wa.me/${shop.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center gap-2 bg-green-50 text-green-700 rounded-2xl py-3 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-700">
            <FaWhatsapp className="h-5 w-5" />
          </div>
          <div className="text-xs font-semibold">WhatsApp</div>
        </a>
      </div>
    </div>
  );
};

export default ShopDetail;