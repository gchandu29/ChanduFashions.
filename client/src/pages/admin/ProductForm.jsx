import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, createProduct, updateProduct, uploadImages, getImageUrl } from '../../api/axios';
import { HiOutlinePhotograph, HiOutlineX, HiArrowLeft } from 'react-icons/hi';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Men',
    description: '',
    featured: false,
    images: [],
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const { data } = await getProduct(id);
          setForm({
            name: data.name,
            price: data.price.toString(),
            category: data.category,
            description: data.description || '',
            featured: data.featured || false,
            images: data.images || [],
          });
        } catch {
          setError('Failed to load product');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
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
    const files = e.target.files;
    if (!files.length) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      const { data } = await uploadImages(formData);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));
    } catch {
      setError('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
      };

      if (isEditing) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }

      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
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
      <div className="container-custom max-w-3xl">
        {/* Back */}
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-charcoal dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="bg-white dark:bg-dark-100 rounded-2xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-display font-bold text-charcoal dark:text-white mb-6">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Classic Cotton Shirt"
                required
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="999"
                  min="0"
                  step="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="input-field resize-none"
                rows={4}
                placeholder="Describe the product..."
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-charcoal focus:ring-charcoal dark:border-gray-600"
                id="featured-checkbox"
              />
              <label htmlFor="featured-checkbox" className="text-sm text-gray-700 dark:text-gray-300">
                Mark as Featured Product
              </label>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Images
              </label>

              {/* Image Preview */}
              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {form.images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden group">
                      <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <HiOutlineX className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload area */}
              <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-charcoal dark:hover:border-rose-gold transition-colors">
                <HiOutlinePhotograph className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {uploading ? 'Uploading...' : 'Click to upload images'}
                </span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP up to 5MB</span>
                <span className="text-xs font-medium text-rose-gold mt-1">Tip: You can select and upload at least 4 images at once</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex-1 py-3.5 disabled:opacity-50"
              >
                {saving ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
              </button>
              <Link to="/admin/products" className="btn-secondary px-8 py-3.5">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
