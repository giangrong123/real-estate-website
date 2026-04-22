// app.js
const express = require('express');
const cors = require('cors');
const mainRouter = require('./router');

const app = express();

// ==================== CORS - PHẢI ĐẶT ĐẦU TIÊN ====================
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware khác
app.use(express.json());

// Nhúng router
app.use(mainRouter);

// Xử lý lỗi 404 (nếu có)
app.use((req, res) => {
  res.status(404).json({ message: 'Route không tồn tại' });
});

module.exports = app;