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

  const badgeClass = {
    Men: 'badge-men',
    Women: 'badge-women',
    Kids: 'badge-kids',
  }[category] || 'badge-men';

  const placeholderImage = `https://placehold.co/400x500/2c2c2c/f7e7ce?text=${encodeURIComponent(name.split(' ')[0])}`;
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
    <div className="card group" id={`product-card-${_id}`}>
      {/* Image */}
      <Link to={`/product/${_id}`} className="block relative overflow-hidden aspect-[3/4]">
        <img
          src={productImage}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className={`absolute top-3 left-3 ${badgeClass}`}>{category}</span>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${_id}`}>
          <h3 className="font-display font-semibold text-charcoal dark:text-white text-lg mb-1 group-hover:text-rose-gold transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-xl font-bold text-charcoal dark:text-white mb-3">
          ₹{price.toLocaleString('en-IN')}
        </p>

        {hasSizes && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((sizeObj) => (
                <button
                  key={sizeObj.size}
                  onClick={() => {
                    setSelectedSize(sizeObj.size);
                    setShowWarning(false);
                  }}
                  className={`min-w-[2rem] h-8 px-2 rounded-lg text-xs font-medium transition-all ${
                    selectedSize === sizeObj.size
                      ? 'bg-charcoal text-white dark:bg-rose-gold shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-100 dark:text-gray-300 dark:hover:bg-dark-200'
                  }`}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
            {showWarning && (
              <p className="text-red-500 text-[10px] mt-1.5 animate-bounce font-medium">Please select a size first</p>
            )}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to={`/product/${_id}`}
            className="flex-1 btn-secondary flex items-center justify-center gap-2 py-1.5 text-xs font-medium"
          >
            <FaEye className="w-4 h-4" />
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium transition-colors rounded-xl ${
              hasSizes && !selectedSize
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400'
                : 'btn-primary'
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
