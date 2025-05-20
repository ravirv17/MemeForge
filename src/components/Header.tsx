import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Laugh, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-gradient-to-r from-primary-500/90 to-secondary-500/90 text-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <Laugh 
            size={32} 
            className={`transition-all ${
              isScrolled ? 'text-primary-500' : 'text-white'
            }`} 
          />
          <span 
            className={`text-xl font-bold transition-all group-hover:scale-105 ${
              isScrolled ? 'text-primary-500' : 'text-white'
            }`}
          >
            MemeForge
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => `
              font-medium transition-all hover:text-accent-400
              ${isScrolled 
                ? (isActive ? 'text-primary-600' : 'text-gray-700') 
                : (isActive ? 'text-white underline decoration-2 decoration-accent-400 underline-offset-4' : 'text-white/90')}
            `}
          >
            Home
          </NavLink>
          <NavLink 
            to="/create" 
            className={({ isActive }) => `
              font-medium transition-all hover:text-accent-400
              ${isScrolled 
                ? (isActive ? 'text-primary-600' : 'text-gray-700') 
                : (isActive ? 'text-white underline decoration-2 decoration-accent-400 underline-offset-4' : 'text-white/90')}
            `}
          >
            Create
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => `
              font-medium transition-all hover:text-accent-400
              ${isScrolled 
                ? (isActive ? 'text-primary-600' : 'text-gray-700') 
                : (isActive ? 'text-white underline decoration-2 decoration-accent-400 underline-offset-4' : 'text-white/90')}
            `}
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `
              font-medium transition-all hover:text-accent-400
              ${isScrolled 
                ? (isActive ? 'text-primary-600' : 'text-gray-700') 
                : (isActive ? 'text-white underline decoration-2 decoration-accent-400 underline-offset-4' : 'text-white/90')}
            `}
          >
            About
          </NavLink>
        </nav>

        {/* Mobile Navigation Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X 
              size={24} 
              className={isScrolled ? 'text-gray-700' : 'text-white'} 
            />
          ) : (
            <Menu 
              size={24} 
              className={isScrolled ? 'text-gray-700' : 'text-white'} 
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-scale-in origin-top">
          <nav className="container mx-auto px-4 py-4 flex flex-col">
            <NavLink 
              to="/" 
              className={({ isActive }) => `
                py-3 border-b border-gray-100 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}
              `}
            >
              Home
            </NavLink>
            <NavLink 
              to="/create" 
              className={({ isActive }) => `
                py-3 border-b border-gray-100 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}
              `}
            >
              Create
            </NavLink>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => `
                py-3 border-b border-gray-100 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}
              `}
            >
              Gallery
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `
                py-3 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}
              `}
            >
              About
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;