import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSlides } from '../api/axios';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const OfferSlider = ({ fallback }) => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await getSlides();
        setSlides(data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) {
    return (
      <div className="h-[400px] md:h-[600px] bg-gray-100 dark:bg-dark-300 animate-pulse rounded-3xl" />
    );
  }

  if (slides.length === 0) return fallback || null;

  return (
    <div className="relative group overflow-hidden rounded-3xl h-[400px] md:h-[600px]">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide._id} className="min-w-full h-full relative">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center">
              <div className="container-custom px-6 md:px-12">
                <div className="max-w-2xl animate-slide-up">
                  {slide.subtitle && (
                    <span className="inline-block px-3 py-1 bg-rose-gold text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                      {slide.subtitle}
                    </span>
                  )}
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  {slide.link && (
                    <Link 
                      to={slide.link}
                      className="btn-primary px-8 py-3.5 text-base shadow-xl shadow-rose-gold/20"
                    >
                      Shop Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  current === idx ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OfferSlider;
