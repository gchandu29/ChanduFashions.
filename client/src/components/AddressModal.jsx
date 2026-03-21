import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const AddressModal = ({ isOpen, onClose, product, whatsappNumber }) => {
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const { _id, name, price } = product;

  const handleOrder = () => {
    if (!address.trim()) {
      alert('Please enter your delivery address');
      return;
    }

    const message = encodeURIComponent(
      `Hi, I want to order this product:\n\n` +
      `Product Name: ${name}\n` +
      ` Product ID: ${_id}\n` +
      ` Price: ₹${price}\n` +
      ` Delivery Address: ${address}\n\n` +
      `Link: ${window.location.origin}/product/${_id}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-100 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-display font-bold text-charcoal dark:text-white">Complete Your Order</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
          >
            <HiX className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex gap-4 mb-6 p-3 bg-gray-50 dark:bg-dark-200 rounded-xl">
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Product</p>
              <h4 className="font-semibold text-charcoal dark:text-white line-clamp-1">{name}</h4>
              <p className="text-lg font-bold text-rose-gold">₹{price.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Delivery Address *
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Enter your full delivery address including city and pincode..."
                required
              />
            </div>

            <button
              onClick={handleOrder}
              className="btn-whatsapp w-full py-4 text-base shadow-lg shadow-green-500/20"
            >
              <FaWhatsapp className="w-5 h-5" />
              Place Order on WhatsApp
            </button>
            <p className="text-[10px] text-center text-gray-400">
              Your message will be pre-filled with the product details and your address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
