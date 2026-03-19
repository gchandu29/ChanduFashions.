import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const WHATSAPP_NUMBER = '919876543210';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-rose-gold rounded-xl flex items-center justify-center text-charcoal font-display font-bold text-lg">
                CF
              </div>
              <div>
                <h3 className="text-lg font-display font-bold leading-none">Chandu</h3>
                <p className="text-[10px] tracking-[0.25em] uppercase text-rose-gold">Fashions</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your one-stop destination for trendy and affordable fashion for Men, Women & Kids. Quality clothing for every occasion.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-rose-gold transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-rose-gold transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Shop All' },
                { to: '/products?category=Men', label: "Men's Collection" },
                { to: '/products?category=Women', label: "Women's Collection" },
                { to: '/products?category=Kids', label: "Kids' Collection" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-rose-gold text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/admin/login', label: 'Admin' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-rose-gold text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 mt-0.5 text-rose-gold flex-shrink-0" />
                <span className="text-gray-400 text-sm">123 Fashion Street, City Center, State - 500001</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-rose-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-rose-gold text-sm transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-rose-gold flex-shrink-0" />
                <a href="mailto:info@chandufashions.com" className="text-gray-400 hover:text-rose-gold text-sm transition-colors">
                  info@chandufashions.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Chandu Fashions. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Made with ♥ for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
