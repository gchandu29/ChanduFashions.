import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const categories = [
  {
    name: 'Men',
    description: 'Shirts, Trousers, Jackets & More',
    gradient: 'from-blue-900 to-blue-700',
    emoji: '👔',
  },
  {
    name: 'Women',
    description: 'Kurtis, Sarees, Dresses & More',
    gradient: 'from-pink-900 to-pink-700',
    emoji: '👗',
  },
  {
    name: 'Kids',
    description: 'Casual, Party & Ethnic Wear',
    gradient: 'from-amber-900 to-amber-700',
    emoji: '🧸',
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-400">
      <div className="container-custom">
        <h2 className="section-title dark:text-white">Shop by Category</h2>
        <p className="section-subtitle dark:text-gray-400">Find the perfect style for everyone</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-8 md:p-10 min-h-[240px] flex flex-col justify-end hover:scale-[1.02] transition-all duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background emoji */}
              <span className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300">
                {cat.emoji}
              </span>

              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  {cat.name}
                </h3>
                <p className="text-white/70 text-sm mb-4">{cat.description}</p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all">
                  Explore
                  <HiArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
