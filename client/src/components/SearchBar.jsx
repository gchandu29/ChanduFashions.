import { useState, useEffect, useCallback } from 'react';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const clear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative max-w-md w-full">
      <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="input-field pl-12 pr-10"
        id="search-bar"
      />
      {query && (
        <button
          onClick={clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <HiOutlineX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
