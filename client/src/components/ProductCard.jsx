import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '919876543210';

const ProductCard = ({ product }) => {
  const { _id, name, price, images, category } = product;

  const whatsappMessage = encodeURIComponent(
    `Hi, I want to order this product:\n\nProduct Name: ${name}\nPrice: ₹${price}\nLink: ${window.location.origin}/product/${_id}`
  );

  const badgeClass = {
    Men: 'badge-men',
    Women: 'badge-women',
    Kids: 'badge-kids',
  }[category] || 'badge-men';

  const placeholderImage = `https://placehold.co/400x500/2c2c2c/f7e7ce?text=${encodeURIComponent(name.split(' ')[0])}`;

  return (
    <div className="card group" id={`product-card-${_id}`}>
      {/* Image */}
      <Link to={`/product/${_id}`} className="block relative overflow-hidden aspect-[3/4]">
        <img
          src={images && images.length > 0 ? images[0] : placeholderImage}
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
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full text-center text-sm"
        >
          <FaWhatsapp className="w-4 h-4" />
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
