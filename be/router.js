// router.js
const express = require('express');
const authController = require('./controllers/auth.controller');
const propertyController = require('./controllers/property.controller');

const router = express.Router();

// API Login
router.post('/login', authController.login);

router.get('/properties', propertyController.getProperties);

// có thể thêm các route khác sau này
// router.get('/posts', postController.getAll);

module.exports = router;
