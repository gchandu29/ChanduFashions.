const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Product = require('./models/Product');

const checkProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is undefined. Check your .env file.');
    }
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Product.countDocuments();
    console.log(`Total products in database: ${count}`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkProducts();
