import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const Toast = () => {
  const { toast } = useCart();

  return (
    <div
      className={`fixed top-24 right-4 z-[200] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl transition-all duration-500 ease-out pointer-events-none
        bg-charcoal text-white dark:bg-white dark:text-charcoal
        ${toast.show
          ? 'translate-x-0 opacity-100'
          : 'translate-x-[120%] opacity-0'
        }`}
    >
      <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
        <HiOutlineShoppingCart className="w-4 h-4 text-white" />
      </span>
      <p className="text-sm font-medium pr-2">{toast.message}</p>
    </div>
  );
};

export default Toast;
