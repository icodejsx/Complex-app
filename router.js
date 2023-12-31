const express = require('express');
const router = express.Router();
const userController = require('./controllers/userControllers');
const postController = require('./controllers/postControllers');
const { route } = require('./app');

// user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/post/:id', postController.viewSingle)


// profiles related routes
router.get('/profile/:username', userController.ifUserExists, userController.profilePostsScreen)

// post related routes
router.get('/create-post', userController.mustBeloggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeloggedIn, postController.create)
router.get('/post/:id', postController.viewSingle)
router.get('/post/:id/edit', userController.mustBeloggedIn, postController.viewEditScreen)
router.post('/post/:id/edit', userController.mustBeloggedIn, postController.edit)
router.post('/post/:id/delete', userController.mustBeloggedIn, postController.delete)
router.post('/search', postController.search)

module.exports = router;
