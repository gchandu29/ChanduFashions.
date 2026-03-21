import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAdminSlides, createSlide, updateSlide, uploadImages, getImageUrl } from '../../api/axios';
import { HiOutlinePhotograph, HiOutlineX, HiArrowLeft } from 'react-icons/hi';

const SlideForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    image: '',
    link: '',
    active: true,
    order: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchSlide = async () => {
        try {
          const { data } = await getAdminSlides();
          const slide = data.find(s => s._id === id);
          if (slide) {
            setForm({
              title: slide.title,
              subtitle: slide.subtitle || '',
              image: slide.image,
              link: slide.link || '',
              active: slide.active,
              order: slide.order,
            });
          } else {
            setError('Slide not found');
          }
        } catch {
          setError('Failed to load slide');
        } finally {
          setLoading(false);
        }
      };
      fetchSlide();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('images', file); // Use same 'images' field as products

      const { data } = await uploadImages(formData);
      setForm((prev) => ({
        ...prev,
        image: data.urls[0],
      }));
    } catch {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const slideData = {
        ...form,
        order: parseInt(form.order) || 0,
      };

      if (isEditing) {
        await updateSlide(id, slideData);
      } else {
        await createSlide(slideData);
      }

      navigate('/admin/slides');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save slide');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-charcoal dark:border-rose-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark">
      <div className="container-custom max-w-2xl">
        <Link
          to="/admin/slides"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Slides
        </Link>

        <div className="bg-white dark:bg-dark-100 rounded-2xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-display font-bold text-charcoal dark:text-white mb-6">
            {isEditing ? 'Edit Slide' : 'Add New Slide'}
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slide Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Summer Sale 50% Off"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Don't miss out on our latest trends"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link URL
                </label>
                <input
                  type="text"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., /products?category=Men"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-charcoal focus:ring-charcoal dark:border-gray-600"
                id="active-checkbox"
              />
              <label htmlFor="active-checkbox" className="text-sm text-gray-700 dark:text-gray-300">
                Slide is Active
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slide Image *
              </label>

              {form.image && (
                <div className="mb-4 relative w-full aspect-[21/9] rounded-xl overflow-hidden group">
                  <img src={getImageUrl(form.image)} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, image: '' }))}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <HiOutlineX className="w-4 h-4" />
                  </button>
                </div>
              )}

              {!form.image && (
                <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-charcoal dark:hover:border-rose-gold transition-colors">
                  <HiOutlinePhotograph className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {uploading ? 'Uploading...' : 'Click to upload slide image'}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">Recommended: 1920x800px</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving || !form.image}
                className="btn-primary flex-1 py-3.5 disabled:opacity-50"
              >
                {saving ? 'Saving...' : isEditing ? 'Update Slide' : 'Create Slide'}
              </button>
              <Link to="/admin/slides" className="btn-secondary px-8 py-3.5">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SlideForm;
