import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Function to handle navigation and scrolling to sections
  const handleNavigation = (sectionId) => {
    const isHomePage = location.pathname === '/';
    
    // If already on home page, just scroll to the section
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with the section as hash
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-2 transition-transform duration-300 ${
        visible ? 'transform-none' : 'transform -translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center">
        {/* Logo on the left */}
        <div className="flex-shrink-0 mr-10">
          <a onClick={() => navigate('/')} className="cursor-pointer">
            <img src={logo} alt='logo' className="h-20" />
          </a>
        </div>
        
        {/* Navigation links in center */}
        <div className="flex-grow flex justify-center">
          <ul className="flex space-x-8">
            <li><a onClick={() => navigate('/')} className="text-taupe hover:text-brand-green font-medium cursor-pointer">Home</a></li>
            <li><a onClick={() => handleNavigation('about')} className="text-taupe hover:text-brand-green font-medium cursor-pointer">About</a></li>
            <li><a onClick={() => handleNavigation('products')} className="text-taupe hover:text-brand-green font-medium cursor-pointer">Shop</a></li>
            <li><a onClick={() => handleNavigation('checkout')} className="text-taupe hover:text-brand-green font-medium cursor-pointer">Checkout</a></li>
            <li><a onClick={() => handleNavigation('faq')} className="text-taupe hover:text-brand-green font-medium cursor-pointer">FAQ</a></li>
            <li><a onClick={() => handleNavigation('testimonials')} className="text-taupe hover:text-brand-green font-medium cursor-pointer">Testimonials</a></li>
          </ul>
        </div>
        
        {/* Icons on the right */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon with count */}
          <a onClick={() => handleNavigation('checkout')} className="text-bluegray hover:text-brand-green relative cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            {/* Cart Item Count Badge */}
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
