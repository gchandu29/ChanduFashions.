const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const Product = require('../models/Product');
const Admin = require('../models/Admin');

const sampleProducts = [
  // Men's Collection
  {
    name: 'Classic Slim Fit Shirt',
    price: 1299,
    category: 'Men',
    description: 'Premium cotton slim-fit formal shirt perfect for office wear and special occasions. Available in multiple sizes.',
    images: [],
    featured: true,
  },
  {
    name: 'Casual Denim Jacket',
    price: 2499,
    category: 'Men',
    description: 'Stylish denim jacket with a modern cut. Perfect for layering in any season.',
    images: [],
    featured: true,
  },
  {
    name: 'Chino Trousers',
    price: 1599,
    category: 'Men',
    description: 'Comfortable stretch chino trousers with a tailored fit. Ideal for both casual and semi-formal wear.',
    images: [],
    featured: false,
  },
  {
    name: 'Premium Polo T-Shirt',
    price: 899,
    category: 'Men',
    description: 'Breathable cotton polo with ribbed collar. Available in solid and striped variants.',
    images: [],
    featured: false,
  },
  // Women's Collection
  {
    name: 'Elegant Floral Kurti',
    price: 1199,
    category: 'Women',
    description: 'Beautiful printed floral kurti made from soft cotton fabric. Perfect for daily wear and festive occasions.',
    images: [],
    featured: true,
  },
  {
    name: 'Designer Saree',
    price: 3499,
    category: 'Women',
    description: 'Exquisite designer saree with intricate embroidery work. Comes with matching blouse piece.',
    images: [],
    featured: true,
  },
  {
    name: 'Palazzo Pants Set',
    price: 1799,
    category: 'Women',
    description: 'Trendy palazzo pants with matching crop top. Comfortable and stylish for all occasions.',
    images: [],
    featured: false,
  },
  {
    name: 'Anarkali Dress',
    price: 2299,
    category: 'Women',
    description: 'Stunning floor-length Anarkali dress with detailed embroidery. Perfect for weddings and parties.',
    images: [],
    featured: false,
  },
  // Kids Collection
  {
    name: 'Kids Party Dress',
    price: 999,
    category: 'Kids',
    description: 'Adorable party dress for girls with lace detailing and ribbon accents. Available in multiple colors.',
    images: [],
    featured: true,
  },
  {
    name: 'Boys Casual Set',
    price: 799,
    category: 'Kids',
    description: 'Comfortable cotton t-shirt and shorts set for boys. Perfect for everyday play.',
    images: [],
    featured: false,
  },
  {
    name: 'Kids Ethnic Wear',
    price: 1499,
    category: 'Kids',
    description: 'Traditional ethnic wear for kids. Ideal for festivals and special celebrations.',
    images: [],
    featured: true,
  },
  {
    name: 'School Uniform Set',
    price: 699,
    category: 'Kids',
    description: 'Durable and comfortable school uniform set. Easy to wash and long-lasting.',
    images: [],
    featured: false,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Product.deleteMany({});
    await Admin.deleteMany({});
    console.log('Cleared existing data.');

    // Create admin
    const admin = await Admin.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    });
    console.log(`Admin created: ${admin.username} / ${process.env.ADMIN_PASSWORD ? '********' : 'admin123'}`);

    // Create products
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products seeded.`);

    console.log('\\nSeeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
