import { connectToDatabase } from './db';
import { Product } from './models/Product';

const sampleProducts: Product[] = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound with these premium over-ear headphones featuring active noise cancellation.',
    category: 'electronics',
    price: 249.99,
    stock: 50,
    images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Smartwatch with Fitness Tracker',
    description: 'Stay connected and track your fitness goals with this sleek and powerful smartwatch.',
    category: 'electronics',
    price: 199.00,
    stock: 75,
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart Rate, GPS, Accelerometer',
      'Compatibility': 'iOS & Android'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with this rugged, waterproof Bluetooth speaker with rich bass.',
    category: 'electronics',
    price: 89.50,
    stock: 100,
    images: ['https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Power': '20W',
      'Battery Life': '12 hours',
      'Water Resistance': 'IPX7',
      'Connectivity': 'Bluetooth 5.0',
      'Range': '30 meters'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '4K Action Camera',
    description: 'Capture your adventures in stunning 4K resolution with this durable and versatile action camera.',
    category: 'electronics',
    price: 150.00,
    stock: 40,
    images: ['https://images.pexels.com/photos/3062946/pexels-photo-3062946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Resolution': '4K @ 30fps',
      'Water Resistance': '10m without case',
      'Battery Life': '2 hours recording',
      'Storage': 'MicroSD up to 128GB',
      'Weight': '100g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ergonomic Mechanical Keyboard',
    description: 'Enhance your typing experience with this backlit mechanical keyboard with customizable switches.',
    category: 'electronics',
    price: 125.00,
    stock: 60,
    images: ['https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Switch Type': 'Cherry MX Blue',
      'Backlight': 'RGB',
      'Connectivity': 'USB-C',
      'Layout': 'Full Size',
      'Weight': '1.2kg'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'High-Performance Gaming Mouse',
    description: 'Gain a competitive edge with this ultra-responsive gaming mouse with programmable buttons.',
    category: 'electronics',
    price: 75.00,
    stock: 80,
    images: ['https://images.pexels.com/photos/7915428/pexels-photo-7915428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'DPI': '16000',
      'Polling Rate': '1000Hz',
      'Buttons': '8 programmable',
      'Connectivity': 'USB',
      'Weight': '85g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Car Phone Mount',
    description: 'Secure your phone while driving with this adjustable car phone mount with wireless charging.',
    category: 'car_accessories',
    price: 35.00,
    stock: 120,
    images: ['https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Compatibility': 'Universal',
      'Charging': 'Wireless 15W',
      'Mount Type': 'Dashboard',
      'Adjustable': '360° rotation',
      'Weight': '200g'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Dash Cam with Night Vision',
    description: 'Record your drives with this high-quality dash cam featuring night vision and loop recording.',
    category: 'car_accessories',
    price: 120.00,
    stock: 45,
    images: ['https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Resolution': '1080p @ 60fps',
      'Storage': 'MicroSD up to 256GB',
      'Night Vision': 'Yes',
      'Loop Recording': 'Yes',
      'G-Sensor': 'Yes'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Smart Home Hub',
    description: 'Control all your smart devices from one central hub with voice commands and mobile app.',
    category: 'home_appliances',
    price: 180.00,
    stock: 30,
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Connectivity': 'WiFi, Zigbee, Z-Wave',
      'Voice Control': 'Alexa, Google Assistant',
      'Range': '100m',
      'Compatible Devices': '1000+',
      'Power': 'AC Adapter'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Robot Vacuum Cleaner',
    description: 'Keep your floors clean with this intelligent robot vacuum that maps your home and schedules cleaning.',
    category: 'home_appliances',
    price: 300.00,
    stock: 25,
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    specs: {
      'Battery Life': '120 minutes',
      'Dustbin Capacity': '0.6L',
      'Suction Power': '2000Pa',
      'Mapping': 'LIDAR',
      'App Control': 'Yes'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    const db = await connectToDatabase();
    const productsCollection = db.collection<Product>('products');
    
    // Clear existing products
    await productsCollection.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    const result = await productsCollection.insertMany(sampleProducts);
    console.log(`Inserted ${result.insertedCount} products`);
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => {
    console.log('Seeding process finished');
    process.exit(0);
  });
}

export { seedDatabase };
