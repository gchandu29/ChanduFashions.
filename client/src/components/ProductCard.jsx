import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../api/axios';

const ProductCard = ({ product }) => {
  const { _id, name, price, images, category, subcategory, type, sizes } = product;
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const availableSizes = sizes?.filter(s => s.available) || [];
  const hasSizes = availableSizes.length > 0;

  const badgeClass = "px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full backdrop-blur-md shadow-sm border " + 
    (category === 'Men' ? 'bg-blue-50/90 text-blue-700 border-blue-200 dark:bg-blue-900/60 dark:text-blue-300 dark:border-blue-700/50' : 
     category === 'Women' ? 'bg-pink-50/90 text-pink-700 border-pink-200 dark:bg-pink-900/60 dark:text-pink-300 dark:border-pink-700/50' : 
     'bg-amber-50/90 text-amber-700 border-amber-200 dark:bg-amber-900/60 dark:text-amber-300 dark:border-amber-700/50');

  const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(name.split(' ')[0] || 'CF')}&size=500&background=f8f9fa&color=2c2c2c&bold=true`;
  const productImage = images && images.length > 0 ? getImageUrl(images[0]) : placeholderImage;

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return;
    }
    addToCart({
      id: _id,
      name,
      price,
      image: productImage,
      type: type || 'Standard',
      selectedSize: hasSizes ? selectedSize : null
    });
    setSelectedSize('');
  };

  return (
    <div className="relative group rounded-3xl overflow-hidden bg-white dark:bg-dark-100/90 backdrop-blur-xl border border-gray-100/80 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.6)] hover:-translate-y-1.5 transition-all duration-500 ease-out" id={`product-card-${_id}`}>
      {/* Image */}
      <Link to={`/product/${_id}`} className="block relative overflow-hidden aspect-[4/5] bg-gray-50 dark:bg-dark-200">
        <img
          src={productImage}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
        />
        {/* Elegant overlay on hover for image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className={`absolute top-4 left-4 ${badgeClass} z-10 block transition-transform group-hover:-translate-y-1 duration-500`}>{category}</span>
        
        {/* Quick view icon purely for center aesthetic on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-white pointer-events-none z-10">
          <span className="bg-white/20 backdrop-blur-md rounded-full p-3.5 border border-white/30 shadow-2xl">
            <FaEye className="w-5 h-5" />
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 relative bg-gradient-to-b from-transparent to-gray-50/50 dark:to-dark/50">
        <Link to={`/product/${_id}`}>
          <h3 className="font-display font-bold text-gray-900 dark:text-gray-100 text-lg mb-1 group-hover:text-rose-gold dark:group-hover:text-rose-gold transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-charcoal to-gray-500 dark:from-white dark:to-gray-400 mb-4 inline-block">
          ₹{price.toLocaleString('en-IN')}
        </p>

        {hasSizes && (
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 mb-2">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((sizeObj) => (
                <button
                  key={sizeObj.size}
                  onClick={() => {
                    setSelectedSize(sizeObj.size);
                    setShowWarning(false);
                  }}
                  className={`relative min-w-[2.25rem] h-9 px-2 rounded-xl text-xs font-semibold transition-all duration-300 overflow-hidden ${
                    selectedSize === sizeObj.size
                      ? 'text-white border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_12px_rgba(183,110,121,0.3)] transform scale-105'
                      : 'bg-white dark:bg-dark-200 border border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 hover:border-charcoal dark:hover:border-rose-gold hover:text-charcoal dark:hover:text-rose-gold hover:shadow-sm'
                  }`}
                >
                  {selectedSize === sizeObj.size && (
                     <span className="absolute inset-0 bg-gradient-to-br from-charcoal to-black dark:from-rose-gold dark:to-accent-500 -z-10" />
                  )}
                  <span className="relative z-10">{sizeObj.size}</span>
                </button>
              ))}
            </div>
            {showWarning && (
              <p className="text-rose-gold dark:text-rose-gold/90 text-[10px] mt-2 animate-bounce font-bold tracking-wide">Please select a size first!</p>
            )}
          </div>
        )}
        <div className="flex gap-2 relative">
          <Link
            to={`/product/${_id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-100/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 text-xs font-bold transition-all"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className={`flex-[1.5] flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm ${
              hasSizes && !selectedSize
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-dark-200/50 dark:text-gray-600 border border-transparent'
                : 'bg-gradient-to-r from-charcoal to-black text-white hover:shadow-lg hover:shadow-charcoal/20 dark:from-rose-gold dark:to-accent-500 dark:hover:shadow-rose-gold/30 hover:-translate-y-0.5'
            }`}
          >
            <HiOutlineShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
