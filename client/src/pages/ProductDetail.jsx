import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct, getImageUrl } from '../api/axios';
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiArrowLeft, HiOutlineShoppingCart } from 'react-icons/hi';
import { WHATSAPP_NUMBER } from '../constants';
import AddressModal from '../components/AddressModal';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeWarning, setShowSizeWarning] = useState(false);
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

  const { name, price, category, subcategory, type, sizes, description, images } = product;
  const availableSizes = sizes?.filter(s => s.available) || [];
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
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white mb-8 transition-colors bg-transparent border-0 cursor-pointer"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-100">
              <img
                src={displayImages[selectedImage]}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImages[0] || displayImages[0]; }}
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
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = placeholderImages[idx % placeholderImages.length]; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className={`${badgeClass}`}>{category}</span>
              {subcategory && <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">{subcategory}</span>}
              {type && <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full">{type}</span>}
            </div>
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

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                    Select Size *
                  </h3>
                  <button className="text-xs text-blue-600 hover:underline dark:text-blue-400">Size Guide</button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {sizes.map((sizeObj) => {
                    const isAvailable = sizeObj.available;
                    const isSelected = selectedSize === sizeObj.size;
                    return (
                      <button
                        key={sizeObj.size}
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedSize(sizeObj.size);
                          setShowSizeWarning(false);
                        }}
                        className={`min-w-[3rem] h-10 px-3 rounded-xl text-sm font-medium transition-all ${
                          !isAvailable
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 border border-transparent'
                            : isSelected
                            ? 'bg-charcoal text-white dark:bg-rose-gold shadow-md'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-charcoal dark:bg-dark-100 dark:text-gray-300 dark:border-gray-700 dark:hover:border-rose-gold hover:shadow-sm'
                        }`}
                      >
                        {sizeObj.size}
                      </button>
                    );
                  })}
                </div>
                {showSizeWarning && (
                  <p className="text-red-500 text-sm mt-2 animate-bounce">Please select a size to continue</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={() => {
                  if (availableSizes.length > 0 && !selectedSize) {
                    setShowSizeWarning(true);
                    return;
                  }
                  const img = displayImages[0];
                  addToCart({ id: product._id, name, price, image: img, type, selectedSize });
                }}
                className={`flex-1 py-3 text-sm flex items-center justify-center gap-2 rounded-xl font-medium transition-all ${
                  availableSizes.length > 0 && !selectedSize 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400' 
                  : 'btn-primary'
                }`}
              >
                <HiOutlineShoppingCart className="w-5 h-5" />
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
              selectedSize={selectedSize}
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
