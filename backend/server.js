// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware (Allows frontend to talk to backend and read JSON data)
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// 2. DATABASE MODELS (The Blueprint)
// ==========================================

const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true }));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  description: String,
  image: String,
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 10 },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true }));

const Order = mongoose.model('Order', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number, price: Number }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  shippingAddress: { street: String, city: String, zip: String }
}, { timestamps: true }));

// ==========================================
// 3. API ROUTES (The Endpoints)
// ==========================================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured products (for homepage)
app.get('/api/products/featured', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Securely encrypts password
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: 'Email already exists' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress } = req.body;
    const order = await Order.create({ userId, items, totalAmount, shippingAddress });
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 4. SEED ROUTE (Populates database with dummy data)
// ==========================================
app.get('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({}); // Clear existing products
    await Product.create([
      { name: "Minimalist Leather Sneakers", brand: "Aura", category: "Footwear", price: 120, originalPrice: 150, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", description: "Premium Italian leather.", rating: 4.8, isFeatured: true },
      { name: "Merino Wool Overcoat", brand: "Vertex", category: "Outerwear", price: 299, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500", description: "Tailored fit, 100% Merino wool.", rating: 4.9, isFeatured: true },
      { name: "Organic Cotton Tee", brand: "Essence", category: "Tops", price: 45, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", description: "Breathable, sustainable cotton.", rating: 4.5, isFeatured: true },
      { name: "Slim-Fit Chino Trousers", brand: "Vertex", category: "Bottoms", price: 85, originalPrice: 110, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500", description: "Stretch fabric for all-day comfort.", rating: 4.7, isFeatured: true },
      { name: "Ceramic Dial Watch", brand: "Chronos", category: "Accessories", price: 240, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500", description: "Swiss movement, sapphire crystal.", rating: 4.9, isFeatured: true },
      { name: "Canvas Weekender Bag", brand: "Aura", category: "Bags", price: 160, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", description: "Water-resistant waxed canvas.", rating: 4.6, isFeatured: true }
    ]);
    res.json({ message: '✅ Database seeded with premium products!' });
  } catch (error) {
    res.status(500).json({ message: 'Seeding error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});