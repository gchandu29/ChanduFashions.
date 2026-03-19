import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '919876543210';

const WhatsAppFloat = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I am interested in your products at Chandu Fashions!')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/40 hover:bg-green-600 hover:scale-110 active:scale-95 transition-all duration-300 animate-float group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-charcoal text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us!
      </span>
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </a>
  );
};

export default WhatsAppFloat;
