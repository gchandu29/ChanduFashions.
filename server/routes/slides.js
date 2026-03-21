const express = require('express');
const Slide = require('../models/Slide');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/slides — Get all active slides
router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find({ active: true }).sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/slides/admin — Get all slides for admin
router.get('/admin', auth, async (req, res) => {
  try {
    const slides = await Slide.find().sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/slides — Create a slide (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const slide = await Slide.create(req.body);
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// PUT /api/slides/:id — Update a slide (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json(slide);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// DELETE /api/slides/:id — Delete a slide (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
