import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/axios';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import { HiArrowRight } from 'react-icons/hi';
import { FaTruck, FaShieldAlt, FaHeadset, FaWhatsapp } from 'react-icons/fa';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await getProducts({ featured: true, limit: 8 });
        setFeaturedProducts(data.products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero */}
      <HeroBanner />

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      <section className="py-20 dark:bg-dark-300">
        <div className="container-custom">
          <h2 className="section-title dark:text-white">Featured Collection</h2>
          <p className="section-subtitle dark:text-gray-400">Handpicked styles you'll love</p>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No featured products yet. Check back soon!</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products" className="btn-primary gap-2">
              View All Products
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-champagne/30 dark:bg-dark-400">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FaTruck, title: 'Fast Delivery', desc: 'Quick shipping across India' },
              { icon: FaShieldAlt, title: 'Quality Assured', desc: '100% genuine products' },
              { icon: FaHeadset, title: '24/7 Support', desc: 'Always here to help' },
              { icon: FaWhatsapp, title: 'Easy Ordering', desc: 'Order via WhatsApp' },
            ].map((item) => (
              <div key={item.title} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 bg-white dark:bg-dark-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-rose-gold" />
                </div>
                <h3 className="font-display font-semibold text-charcoal dark:text-white mb-1">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-charcoal to-dark dark:from-dark-400 dark:to-dark-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Ready to Upgrade Your Wardrobe?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Browse our latest collection and order your favorites instantly via WhatsApp. Fashion made easy!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-charcoal font-semibold rounded-xl hover:bg-champagne active:scale-95 transition-all duration-200">
              Shop Now
              <HiArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-200">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
