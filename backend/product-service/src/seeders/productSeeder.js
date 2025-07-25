const mongoose = require('mongoose');
const Product = require('../models/Product');
const faker = require('faker');

const categories = ['Luxury Sedan', 'Sports Coupe', 'Electric Sedan', 'Luxury SUV', 'Hybrid Sedan'];

const seedProducts = async (count = 20) => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany();

  const products = Array.from({ length: count }, () => ({
    name: faker.vehicle.model(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(20000, 150000),
    category: categories[Math.floor(Math.random() * categories.length)],
    images: [faker.image.transport()],
    stock: Math.floor(Math.random() * 100),
    features: Array.from({ length: 5 }, () => faker.lorem.sentence()),
    specifications: {
      engine: faker.vehicle.vin(),
      color: faker.vehicle.color(),
      fuelType: faker.random.arrayElement(['Gasoline', 'Diesel', 'Electric', 'Hybrid']),
      mileage: `${Math.floor(Math.random() * 50)} MPG`
    }
  }));

  await Product.insertMany(products);
  console.log(`${count} products seeded successfully`);
  process.exit(0);
};

seedProducts(50).catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});