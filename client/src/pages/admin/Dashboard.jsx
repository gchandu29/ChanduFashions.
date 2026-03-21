import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductStats } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineShoppingBag, HiOutlineTag, HiOutlineStar, HiOutlinePlus, HiOutlineLogout, HiOutlinePhotograph } from 'react-icons/hi';
import { FaUsers, FaTshirt } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, men: 0, women: 0, kids: 0, featured: 0 });
  const [loading, setLoading] = useState(true);
  const { admin, logout } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getProductStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.total, icon: HiOutlineShoppingBag, color: 'from-blue-500 to-blue-600' },
    { label: "Men's", value: stats.men, icon: FaTshirt, color: 'from-indigo-500 to-indigo-600' },
    { label: "Women's", value: stats.women, icon: FaTshirt, color: 'from-pink-500 to-pink-600' },
    { label: "Kids'", value: stats.kids, icon: FaTshirt, color: 'from-amber-500 to-amber-600' },
    { label: 'Featured', value: stats.featured, icon: HiOutlineStar, color: 'from-rose-500 to-rose-600' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-charcoal dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, <span className="font-medium text-charcoal dark:text-white">{admin?.username || 'Admin'}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/products/new" className="btn-primary gap-2">
              <HiOutlinePlus className="w-4 h-4" />
              Add Product
            </Link>
            <button onClick={logout} className="btn-secondary gap-2 text-red-500 border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500">
              <HiOutlineLogout className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white`}>
              <stat.icon className="w-8 h-8 mb-3 opacity-80" />
              <p className="text-3xl font-bold">
                {loading ? '...' : stat.value}
              </p>
              <p className="text-sm opacity-80 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-dark-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-display font-semibold text-charcoal dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/products"
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-300 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
            >
              <HiOutlineShoppingBag className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-medium text-charcoal dark:text-white text-sm">Manage Products</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">View, edit, delete products</p>
              </div>
            </Link>
            <Link
              to="/admin/products/new"
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-300 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
            >
              <HiOutlinePlus className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium text-charcoal dark:text-white text-sm">Add Product</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Add a new product</p>
              </div>
            </Link>
            <Link
              to="/admin/slides"
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-300 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
            >
              <HiOutlinePhotograph className="w-6 h-6 text-purple-500" />
              <div>
                <p className="font-medium text-charcoal dark:text-white text-sm">Manage Slides</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Home page offer slider</p>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-300 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
            >
              <HiOutlineTag className="w-6 h-6 text-rose-500" />
              <div>
                <p className="font-medium text-charcoal dark:text-white text-sm">View Shop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Open the storefront</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
