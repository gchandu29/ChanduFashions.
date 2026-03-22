import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { FaHandsHelping } from 'react-icons/fa';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-16 dark:bg-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-gold/10 dark:bg-rose-gold/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 md:left-0 top-0 p-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-2 z-10"
        >
          <HiArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Back</span>
        </button>

        <div className="max-w-3xl mx-auto mt-12 md:mt-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal dark:text-white mb-6">
              Our Story
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-gold to-accent-500 mx-auto rounded-full" />
          </div>

          <div className="bg-white/80 dark:bg-dark-100/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white/70 dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 dark:bg-dark-200 rounded-bl-full -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-champagne/30 dark:bg-rose-gold/5 rounded-tr-full -z-10" />

            <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal dark:text-white mb-8 flex items-center gap-3">
              At Chandu Fashions <span className="text-red-500">❤️</span>
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-body">
              <p>
                We are not a big brand or company — we are a local store built with passion and dedication. Our mission is to provide the best quality clothes at affordable prices for everyone.
              </p>
              
              <div className="flex gap-4 my-8 p-6 bg-gray-50/80 dark:bg-dark-200/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                 <FaHandsHelping className="w-8 h-8 text-rose-gold flex-shrink-0 mt-1" />
                 <p className="font-medium text-charcoal dark:text-gray-200">
                   We believe every customer is important, and we treat you like family. That’s why we focus on giving you the best quality, best price, and fastest delivery possible.
                 </p>
              </div>

              <p>
                Your support helps us grow, and we promise to always give you our best.
              </p>

              <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-800">
                <p className="font-display font-bold text-xl text-charcoal dark:text-white flex items-center gap-2">
                  Thank you for trusting Chandu Fashions <span className="text-2xl">🙏</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
