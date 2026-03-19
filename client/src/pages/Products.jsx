import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api/axios';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { HiOutlineFilter, HiOutlineViewGrid } from 'react-icons/hi';

const categories = ['All', 'Men', 'Women', 'Kids'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const activeCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (activeCategory !== 'All') params.category = activeCategory;
      if (searchQuery) params.search = searchQuery;

      const { data } = await getProducts(params);
      setProducts(data.products);
      setTotal(data.total);
      setPages(data.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
    setPage(1);
  };

  const handleSearch = useCallback((query) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
    setPage(1);
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal dark:text-white mb-2">
            Our Collection
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {total} products available
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-charcoal text-white dark:bg-rose-gold shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-100 dark:text-gray-300 dark:hover:bg-dark-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-dark-100 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-dark-200 transition-colors"
                >
                  Previous
                </button>
                {[...Array(pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      page === i + 1
                        ? 'bg-charcoal text-white dark:bg-rose-gold'
                        : 'bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  disabled={page === pages}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-dark-100 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-dark-200 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-dark-100 rounded-full flex items-center justify-center">
              <HiOutlineViewGrid className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-display font-semibold text-charcoal dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
