import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineSearch, HiOutlineShoppingCart } from 'react-icons/hi';
import DarkModeToggle from './DarkModeToggle';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary-50/90 dark:bg-dark-100/90 backdrop-blur-xl shadow-lg border-b border-primary-100/50 dark:border-dark-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-charcoal to-rose-gold rounded-xl flex items-center justify-center text-white font-display font-bold text-lg group-hover:scale-105 transition-transform">
              CF
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-charcoal dark:text-white leading-none">
                Chandu
              </h1>
              <p className="text-[10px] tracking-[0.25em] uppercase text-rose-gold font-medium">
                Fashions
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium tracking-wide transition-colors py-2 ${
                  isActive(link.to)
                    ? 'text-charcoal dark:text-white'
                    : 'text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="p-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white transition-colors"
              title="Search Products"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </Link>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white transition-colors"
              title="Shopping Cart"
              aria-label="Open cart"
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center cart-badge-pop">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <DarkModeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-64 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-gray-100 dark:border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-charcoal/5 dark:bg-white/5 text-charcoal dark:text-white'
                    : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
