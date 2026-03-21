import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineX, HiOutlineTrash, HiPlus, HiMinus, HiOutlineShoppingCart } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../constants';
import { getImageUrl } from '../api/axios';

const CartDrawer = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    closeCart,
  } = useCart();

  const [address, setAddress] = useState('');
  const [showAddress, setShowAddress] = useState(false);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    if (!showAddress) {
      setShowAddress(true);
      return;
    }

    if (!address.trim()) {
      return;
    }

    const itemLines = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name}\n   🆔 Product ID: ${item.id}\n   💰 Price: ₹${item.price.toLocaleString('en-IN')}\n   📦 Quantity: ${item.quantity}`
      )
      .join('\n\n');

    const message = `Hi, I want to order:\n\n${itemLines}\n\n💰 Total: ₹${cartTotal.toLocaleString('en-IN')}\n📍 Delivery Address: ${address}\n\nThank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    clearCart();
    setAddress('');
    setShowAddress(false);
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md bg-white dark:bg-dark-100 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <HiOutlineShoppingCart className="w-6 h-6 text-charcoal dark:text-white" />
            <h2 className="text-xl font-display font-bold text-charcoal dark:text-white">
              Your Cart
            </h2>
            {cartCount > 0 && (
              <span className="bg-rose-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
            aria-label="Close cart"
          >
            <HiOutlineX className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-dark-200 rounded-full flex items-center justify-center mb-4">
                <HiOutlineShoppingCart className="w-10 h-10 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-display font-semibold text-charcoal dark:text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Looks like you haven't added anything yet.
              </p>
              <Link
                to="/products"
                onClick={closeCart}
                className="btn-primary"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-200 group hover:bg-gray-100 dark:hover:bg-dark-200/80 transition-colors"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-charcoal dark:text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm font-bold text-rose-gold mt-0.5">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <HiMinus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold text-charcoal dark:text-white w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark transition-colors"
                        aria-label="Increase quantity"
                      >
                        <HiPlus className="w-3 h-3" />
                      </button>
                      <span className="text-xs text-gray-400 ml-1">
                        = ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 self-start rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Remove item"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-3">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
              <span className="text-xl font-bold text-charcoal dark:text-white">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Address Input */}
            {showAddress && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Delivery Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="input-field resize-none text-sm"
                  placeholder="Enter full delivery address with city & pincode..."
                />
              </div>
            )}

            {/* Buttons */}
            <button
              onClick={handleWhatsAppCheckout}
              disabled={showAddress && !address.trim()}
              className="btn-whatsapp w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaWhatsapp className="w-5 h-5" />
              {showAddress ? 'Send Order on WhatsApp' : 'Order via WhatsApp'}
            </button>

            <button
              onClick={() => {
                clearCart();
                setShowAddress(false);
                setAddress('');
              }}
              className="w-full py-2 text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
