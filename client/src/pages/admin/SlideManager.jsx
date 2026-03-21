import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminSlides, deleteSlide, getImageUrl } from '../../api/axios';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlinePhotograph } from 'react-icons/hi';

const SlideManager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchSlides = async () => {
    try {
      const { data } = await getAdminSlides();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete slide "${title}"?`)) return;

    setDeleting(id);
    try {
      await deleteSlide(id);
      setSlides((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      alert('Failed to delete slide');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-charcoal dark:text-white">Home Page Slides</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage the image slider on the home page</p>
          </div>
          <Link to="/admin/slides/new" className="btn-primary gap-2">
            <HiOutlinePlus className="w-4 h-4" />
            Add New Slide
          </Link>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center text-gray-500">Loading...</div>
          ) : slides.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white dark:bg-dark-100 rounded-3xl shadow-sm border border-dashed border-gray-200 dark:border-gray-800">
              <HiOutlinePhotograph className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 dark:text-gray-400 mb-6">No slides found. Add your first offer slide!</p>
              <Link to="/admin/slides/new" className="btn-primary gap-2">
                <HiOutlinePlus className="w-4 h-4" />
                Add New Slide
              </Link>
            </div>
          ) : (
            slides.map((slide) => (
              <div key={slide._id} className="bg-white dark:bg-dark-100 rounded-2xl shadow-sm overflow-hidden group">
                <div className="aspect-[16/9] relative overflow-hidden bg-gray-100 dark:bg-dark-300">
                  <img src={getImageUrl(slide.image)} alt={slide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${slide.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {slide.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-charcoal dark:text-white mb-1 line-clamp-1">{slide.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-1">{slide.subtitle || 'No subtitle'}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                    <span className="text-xs text-gray-400">Order: {slide.order}</span>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/slides/edit/${slide._id}`}
                        className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(slide._id, slide.title)}
                        disabled={deleting === slide._id}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link to="/admin/dashboard" className="text-sm text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white transition-colors">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SlideManager;
