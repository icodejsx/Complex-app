const express = require('express');
const router = express.Router();
const userController = require('./controllers/userControllers');
const postController = require('./controllers/postControllers');

// user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// post related routes
router.get('/create-post', postController.viewCreateScreen)

module.exports = router;
