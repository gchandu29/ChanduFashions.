import { FaStar, FaHeart, FaStore, FaUsers, FaAward, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-champagne/50 to-primary-100/50 dark:from-dark-400 dark:to-dark-300">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-charcoal dark:text-white mb-4">
            Our Story
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Chandu Fashions has been serving fashion lovers with premium quality clothing since 2015. We believe everyone deserves to look and feel their best.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-charcoal dark:text-white mb-6">
                Fashion That Speaks <span className="text-rose-gold">Your Language</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  What started as a small shop in the heart of the city has grown into a beloved fashion destination for thousands of families. At Chandu Fashions, we curate collections that blend traditional elegance with modern trends.
                </p>
                <p>
                  We personally handpick each piece in our collection, ensuring quality, comfort, and style come together perfectly. From everyday casuals to festive wear, we've got you covered for every occasion.
                </p>
                <p>
                  Our commitment to affordable pricing without compromising on quality has made us the go-to choice for fashion-conscious shoppers. We treat every customer like family.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-charcoal to-dark flex items-center justify-center overflow-hidden">
                <div className="text-center text-white p-8">
                  <FaStore className="w-16 h-16 mx-auto mb-6 text-rose-gold" />
                  <h3 className="text-2xl font-display font-bold mb-2">Since 2015</h3>
                  <p className="text-gray-300">Serving fashion lovers with love</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-rose-gold/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-champagne/40 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '8+', label: 'Years in Business', icon: FaAward },
              { value: '10K+', label: 'Happy Customers', icon: FaUsers },
              { value: '500+', label: 'Products', icon: FaStore },
              { value: '5★', label: 'Average Rating', icon: FaStar },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-rose-gold" />
                <p className="text-3xl md:text-4xl font-display font-bold mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 dark:bg-dark-300">
        <div className="container-custom">
          <h2 className="section-title dark:text-white">Why Choose Us</h2>
          <p className="section-subtitle dark:text-gray-400">What sets us apart</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaStar,
                title: 'Premium Quality',
                desc: 'Every piece in our collection is carefully selected for quality fabric, stitching, and finish. We never compromise on quality.',
              },
              {
                icon: FaHeart,
                title: 'Customer First',
                desc: 'Your satisfaction is our priority. From easy ordering via WhatsApp to hassle-free exchanges, we go the extra mile.',
              },
              {
                icon: FaHandshake,
                title: 'Fair Pricing',
                desc: 'We believe fashion should be accessible. Our prices are competitive without cutting corners on quality.',
              },
            ].map((value) => (
              <div key={value.title} className="card p-8 text-center group">
                <div className="w-14 h-14 mx-auto mb-5 bg-champagne/50 dark:bg-rose-gold/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-rose-gold" />
                </div>
                <h3 className="text-xl font-display font-semibold text-charcoal dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
