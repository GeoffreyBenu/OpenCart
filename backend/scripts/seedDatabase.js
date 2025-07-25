
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const cars = [
  {
    name: '2023 BMW M3 Competition',
    description: 'High-performance luxury sedan with twin-turbo inline-6 engine, 503 HP. Features sophisticated suspension system, premium leather interior, advanced infotainment system, and cutting-edge safety features.',
    price: 89999.99,
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    stock: 3
  },
  {
    name: '2024 Tesla Model S Plaid',
    description: 'Revolutionary electric luxury sedan with tri-motor setup delivering 1020 HP and 0-60 mph in under 2 seconds. Features full self-driving capability, 17-inch touchscreen, premium audio system.',
    price: 129999.99,
    category: 'Electric Sedan',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
    stock: 5
  },
  {
    name: '2023 Ford Mustang GT',
    description: 'Classic American muscle car with 5.0L V8 engine producing 450 HP. Features iconic design, performance suspension, Recaro seats, and advanced driver assistance technologies.',
    price: 45999.99,
    category: 'Sports Coupe',
    image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=600&fit=crop',
    stock: 7
  },
  {
    name: '2024 Audi Q7 Premium Plus',
    description: 'Luxury 7-seater SUV with advanced technology, premium materials, and Quattro all-wheel drive. Features virtual cockpit, MMI infotainment, adaptive air suspension.',
    price: 72999.99,
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    stock: 4
  },
  {
    name: '2023 Porsche 911 Carrera',
    description: 'Iconic sports car with rear-engine layout and 379 HP flat-six engine. Features precision handling, sport suspension, premium interior, and timeless design.',
    price: 115999.99,
    category: 'Sports Coupe',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    stock: 2
  },
  {
    name: '2024 Toyota Prius Prime',
    description: 'Hybrid plug-in sedan with excellent fuel economy and eco-friendly technology. Features advanced hybrid system, solar roof panel, smart connectivity.',
    price: 32999.99,
    category: 'Hybrid Sedan',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
    stock: 12
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/magariseller');
    console.log(' Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('  Cleared existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(cars);
    console.log(` Created ${createdProducts.length} products`);

    console.log('\n Seeded Products:');
    createdProducts.forEach(product => {
      console.log(`- ${product.name} (${product.category}) - $${product.price.toLocaleString()}`);
    });

    console.log('\n Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
