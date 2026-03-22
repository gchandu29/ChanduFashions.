const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/products — List products with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, search, featured, limit, page = 1, subcategory, type, sizes } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }
    if (subcategory) query.subcategory = subcategory;
    if (type) query.type = type;
    if (sizes) {
      const sizeList = sizes.split(',');
      query.sizes = { $elemMatch: { size: { $in: sizeList }, available: true } };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = parseInt(limit) || 12;
    const skip = (parseInt(page) - 1) * pageSize;

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      Product.countDocuments(query),
    ]);

    res.json({
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/products/stats — Product statistics for admin dashboard
router.get('/stats', auth, async (req, res) => {
  try {
    const [total, men, women, kids, featured] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ category: 'Men' }),
      Product.countDocuments({ category: 'Women' }),
      Product.countDocuments({ category: 'Kids' }),
      Product.countDocuments({ featured: true }),
    ]);

    res.json({ total, men, women, kids, featured });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/products/:id — Single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/products — Create product (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, price, category, subcategory, type, sizes, description, images, featured } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      subcategory,
      type,
      sizes: sizes || [],
      description,
      images: images || [],
      featured: featured || false,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// PUT /api/products/:id — Update product (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// DELETE /api/products/:id — Delete product (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
