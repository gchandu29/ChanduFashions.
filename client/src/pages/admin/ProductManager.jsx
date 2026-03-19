import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../api/axios';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch } from 'react-icons/hi';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [deleting, setDeleting] = useState(null);

  const fetchProducts = async () => {
    try {
      const params = { limit: 100 };
      if (category !== 'All') params.category = category;
      if (search) params.search = search;

      const { data } = await getProducts(params);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeleting(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert('Failed to delete product');
    } finally {
      setDeleting(null);
    }
  };

  const badgeClass = {
    Men: 'badge-men',
    Women: 'badge-women',
    Kids: 'badge-kids',
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-charcoal dark:text-white">Products</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{products.length} products</p>
          </div>
          <Link to="/admin/products/new" className="btn-primary gap-2">
            <HiOutlinePlus className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-10"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-dark-100 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No products found</p>
              <Link to="/admin/products/new" className="btn-primary gap-2">
                <HiOutlinePlus className="w-4 h-4" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Featured</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-300 overflow-hidden flex-shrink-0">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                No img
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-charcoal dark:text-white text-sm">{product.name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">ID: {product._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={badgeClass[product.category]}>{product.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-charcoal dark:text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`w-2.5 h-2.5 rounded-full inline-block ${product.featured ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            title="Edit"
                          >
                            <HiOutlinePencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id, product.name)}
                            disabled={deleting === product._id}
                            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6">
          <Link to="/admin/dashboard" className="text-sm text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white transition-colors">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
