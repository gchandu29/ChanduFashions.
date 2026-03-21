import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getImageUrl } from '../api/axios';
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiArrowLeft, HiOutlineShoppingCart } from 'react-icons/hi';
import { WHATSAPP_NUMBER } from '../constants';
import AddressModal from '../components/AddressModal';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center dark:bg-dark">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-charcoal dark:text-white mb-4">Product Not Found</h2>
          <Link to="/products" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const { name, price, category, description, images } = product;
  const placeholderImages = [
    `https://placehold.co/600x800/2c2c2c/f7e7ce?text=${encodeURIComponent(name.split(' ')[0])}`,
    `https://placehold.co/600x800/b76e79/ffffff?text=${encodeURIComponent(name.split(' ').slice(-1)[0])}`,
  ];
  const displayImages = images && images.length > 0 ? images.map(img => getImageUrl(img)) : placeholderImages;

  const whatsappMessage = encodeURIComponent(
    `Hi, I want to order this product:\n\nProduct Name: ${name}\nPrice: ₹${price}\nLink: ${window.location.href}`
  );

  const badgeClass = {
    Men: 'badge-men',
    Women: 'badge-women',
    Kids: 'badge-kids',
  }[category] || 'badge-men';

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-100">
              <img
                src={displayImages[selectedImage]}
                alt={name}
                className="w-full h-full object-cover"
              />
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-dark transition-colors shadow-lg"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % displayImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-dark transition-colors shadow-lg"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-charcoal dark:border-rose-gold scale-95'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className={`${badgeClass} self-start mb-4`}>{category}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal dark:text-white mb-3">
              {name}
            </h1>
            <p className="text-3xl font-bold text-charcoal dark:text-white mb-6">
              ₹{price.toLocaleString('en-IN')}
            </p>

            {description && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {/* Features */}
            <div className="space-y-3 mb-8">
              {['Premium Quality Material', 'Comfortable Fit', 'Easy Care & Maintenance'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={() => {
                  const img = displayImages[0];
                  addToCart({ id: product._id, name, price, image: img });
                }}
                className="flex-1 btn-primary py-3 text-sm"
              >
                <HiOutlineShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 btn-whatsapp text-sm py-3"
              >
                <FaWhatsapp className="w-5 h-5" />
                Order on WhatsApp
              </button>
            </div>

            <AddressModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              product={product}
              whatsappNumber={WHATSAPP_NUMBER}
            />

            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              Add to cart for multi-item checkout, or order directly via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
