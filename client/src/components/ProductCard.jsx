import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../api/axios';

const ProductCard = ({ product }) => {
  const { _id, name, price, images, category, subcategory, type, sizes } = product;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const hasSizes = sizes && sizes.some(s => s.available);

  const badgeClass = {
    Men: 'badge-men',
    Women: 'badge-women',
    Kids: 'badge-kids',
  }[category] || 'badge-men';

  const placeholderImage = `https://placehold.co/400x500/2c2c2c/f7e7ce?text=${encodeURIComponent(name.split(' ')[0])}`;
  const productImage = images && images.length > 0 ? getImageUrl(images[0]) : placeholderImage;

  const handleAddToCart = () => {
    if (hasSizes) {
      navigate(`/product/${_id}`);
      return;
    }
    addToCart({
      id: _id,
      name,
      price,
      image: productImage,
      type: type || 'Standard',
      selectedSize: null
    });
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
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to={`/product/${_id}`}
            className="flex-1 btn-secondary flex items-center justify-center gap-2 py-1.5 text-xs font-medium"
          >
            <FaEye className="w-4 h-4" />
            View Details
          </Link>
          <button
            onClick={hasSizes ? () => window.location.href = `/product/${_id}` : handleAddToCart}
            className="flex-1 btn-primary flex items-center justify-center gap-2 py-1.5 text-xs font-medium"
          >
            <HiOutlineShoppingCart className="w-4 h-4" />
            {hasSizes ? 'Select Size' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
