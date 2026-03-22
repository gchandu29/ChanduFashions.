const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Men', 'Women', 'Kids'],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    sizes: [
      {
        size: {
          type: String,
          required: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],
    description: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
