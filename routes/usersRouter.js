// routes/usersRouter.js
const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get('/search-users', usersController.usersSearchFormGet);
usersRouter.get('/search', usersController.usersSearchListGet);
usersRouter.get('/create', usersController.usersCreateGet);
usersRouter.post('/create', usersController.usersCreatePost);
usersRouter.get('/', usersController.usersListGet);
usersRouter.get('/:id/update', usersController.usersUpdateGet);
usersRouter.post('/:id/update', usersController.usersUpdatePost);
usersRouter.post('/:id/delete', usersController.usersDeletePost);

module.exports = usersRouter;
