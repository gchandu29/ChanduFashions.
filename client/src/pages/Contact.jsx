import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { WHATSAPP_NUMBER, ADDRESS } from '../constants';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-champagne/50 to-primary-100/50 dark:from-dark-400 dark:to-dark-300">
        <div className="container-custom text-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 md:left-8 top-0 p-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-2"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Back</span>
          </button>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-charcoal dark:text-white mb-4 mt-8 md:mt-0">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us for orders, inquiries, or just to say hello.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-display font-bold text-charcoal dark:text-white mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I have a question about your products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal dark:text-white mb-1">WhatsApp (Preferred)</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{WHATSAPP_NUMBER}</p>
                    <p className="text-green-600 text-sm mt-1">Tap to chat →</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-dark-100 hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-charcoal dark:bg-rose-gold rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal dark:text-white mb-1">Phone</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{WHATSAPP_NUMBER}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Mon - Sat, 10 AM - 9 PM</p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-dark-100">
                  <div className="w-12 h-12 bg-charcoal dark:bg-rose-gold rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal dark:text-white mb-1">Visit Our Store</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {ADDRESS}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-dark-100">
                  <div className="w-12 h-12 bg-charcoal dark:bg-rose-gold rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <FaClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal dark:text-white mb-1">Working Hours</h3>
                    <div className="text-gray-500 dark:text-gray-400 text-sm space-y-1">
                      <p>Monday - Saturday: 10:00 AM - 9:00 PM</p>
                      <p>Sunday: 11:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-display font-bold text-charcoal dark:text-white mb-8">
                Find Us
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3267046997584!2d78.47440331487756!3d17.44936998804123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91fc3e0b9bdf%3A0x4f8dce0c7c2e5c4c!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </div>

              {/* Quick WhatsApp CTA */}
              <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/20 text-center">
                <p className="text-charcoal dark:text-white font-semibold mb-3">
                  Fastest way to reach us?
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'd like to visit your store. Can you share the exact location?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
