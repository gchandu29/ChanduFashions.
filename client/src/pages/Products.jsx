import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../api/axios';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { HiOutlineFilter, HiOutlineViewGrid, HiArrowLeft } from 'react-icons/hi';

const categories = ['All', 'Men', 'Women', 'Kids'];

const SUBCATEGORIES = {
  Men: ['Shirts', 'Pants', 'T-Shirts', 'Shorts'],
  Women: ['Tops', 'Dresses', 'Pants', 'Skirts'],
  Kids: ['Shirts', 'Pants', 'T-Shirts', 'Shorts']
};

const TYPES = {
  Shirts: ['Linen', 'Korean Linen', 'Cotton', 'Checks', 'Formals', 'Fabric', 'Double Pocket'],
  Pants: ['Lycra', 'Cotton', 'Linen', 'Formals', 'Jeans Normal', 'Baggy Jeans', 'Fit Baggy'],
  'T-Shirts': ['Cotton', 'Polo', 'Oversized', 'Sports'],
  Shorts: ['Cotton', 'Denim', 'Sports'],
  Tops: ['Casual', 'Formal', 'Printed'],
  Dresses: ['Casual', 'Party', 'A-Line'],
  Skirts: ['Mini', 'Midi', 'Maxi']
};

const SIZES = {
  Shirts: ['S', 'M', 'L', 'XL', 'XXL'],
  'T-Shirts': ['S', 'M', 'L', 'XL', 'XXL'],
  Tops: ['S', 'M', 'L', 'XL', 'XXL'],
  Dresses: ['S', 'M', 'L', 'XL', 'XXL'],
  Pants: ['28', '30', '32', '34'],
  Shorts: ['28', '30', '32', '34'],
  Skirts: ['28', '30', '32', '34']
};

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const activeCategory = searchParams.get('category') || 'All';
  const activeSubcategory = searchParams.get('subcategory') || '';
  const activeType = searchParams.get('type') || '';
  const activeSizes = searchParams.get('sizes') ? searchParams.get('sizes').split(',') : [];
  const searchQuery = searchParams.get('search') || '';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (activeCategory !== 'All') params.category = activeCategory;
      if (activeSubcategory) params.subcategory = activeSubcategory;
      if (activeType) params.type = activeType;
      if (activeSizes.length > 0) params.sizes = activeSizes.join(',');
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
  }, [activeCategory, activeSubcategory, activeType, searchParams.get('sizes'), searchQuery, page]);

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
    params.delete('subcategory');
    params.delete('type');
    params.delete('sizes');
    setSearchParams(params);
    setPage(1);
  };

  const handleSubcategoryChange = (subcat) => {
    const params = new URLSearchParams(searchParams);
    if (subcat === activeSubcategory) {
      params.delete('subcategory');
    } else {
      params.set('subcategory', subcat);
    }
    params.delete('type');
    params.delete('sizes');
    setSearchParams(params);
    setPage(1);
  };

  const handleTypeChange = (typeStr) => {
    const params = new URLSearchParams(searchParams);
    if (typeStr === activeType) {
      params.delete('type');
    } else {
      params.set('type', typeStr);
    }
    setSearchParams(params);
    setPage(1);
  };

  const handleSizeToggle = (size) => {
    const params = new URLSearchParams(searchParams);
    let newSizes = [...activeSizes];
    if (newSizes.includes(size)) {
      newSizes = newSizes.filter(s => s !== size);
    } else {
      newSizes.push(size);
    }
    
    if (newSizes.length > 0) {
      params.set('sizes', newSizes.join(','));
    } else {
      params.delete('sizes');
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
        <div className="mb-10 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1 p-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-2"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Back</span>
          </button>
          <div className="pl-12 sm:pl-24">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal dark:text-white mb-2">
              Our Collection
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {total} products available
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col mb-8 gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

          {activeCategory !== 'All' && SUBCATEGORIES[activeCategory] && (
            <div className="flex flex-wrap gap-2 items-center bg-white dark:bg-dark-100 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mr-2 ml-1">Category:</span>
              {SUBCATEGORIES[activeCategory].map(subcat => (
                <button
                  key={subcat}
                  onClick={() => handleSubcategoryChange(subcat)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeSubcategory === subcat
                      ? 'bg-charcoal text-white dark:bg-rose-gold shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-200 dark:bg-dark-200 dark:text-gray-300 dark:hover:bg-dark-300'
                  }`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}

          {activeSubcategory && TYPES[activeSubcategory] && (
            <div className="flex flex-wrap gap-2 items-center bg-gray-50 dark:bg-dark-200/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mr-2 ml-1">Type:</span>
              {TYPES[activeSubcategory].map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeType === type
                      ? 'bg-charcoal text-white dark:bg-rose-gold shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-charcoal dark:bg-dark-100 dark:border-gray-700 dark:text-gray-300 dark:hover:border-rose-gold hover:shadow-sm'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {activeSubcategory && SIZES[activeSubcategory] && (
            <div className="flex flex-wrap gap-2 items-center bg-gray-50 dark:bg-dark-200/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mr-2 ml-1">Sizes:</span>
              {SIZES[activeSubcategory].map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`min-w-[2.5rem] h-8 px-2 rounded-lg text-xs font-medium transition-all ${
                    activeSizes.includes(size)
                      ? 'bg-charcoal text-white dark:bg-rose-gold shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-charcoal dark:bg-dark-100 dark:border-gray-700 dark:text-gray-300 dark:hover:border-rose-gold hover:shadow-sm'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
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
