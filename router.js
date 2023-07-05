const express = require('express');
const router = express.Router();
const userController = require('./controllers/userControllers');
const postController = require('./controllers/postControllers');

// user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/post/:id', postController.viewSingle)


// post related routes
router.get('/create-post', userController.mustBeloggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeloggedIn, postController.create)

module.exports = router;
