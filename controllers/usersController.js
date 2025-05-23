// controllers/usersController.js
const usersStorage = require('../storages/usersStorage');
// This just shows the new stuff we're adding to the existing contents
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';
const emailErr = 'must be formatted properly.';
const intErr = 'must be a number between 18 and 120.';
const bioLengthMaxErr = 'maximum 200 characters.';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body('email').trim().isEmail().withMessage(`Email ${emailErr}`),
  body('age')
    .optional()
    .trim()
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age ${intErr}`),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage(`Bio ${bioLengthMaxErr}`),
];

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const { firstName, lastName, email, age, bio } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('createUser', {
        title: 'Create user',
        firstName,
        lastName,
        email,
        age,
        bio,
        errors: errors.array(),
      });
    }
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect('/');
  },
];

exports.usersListGet = (req, res) => {
  res.render('index', {
    title: 'User list',
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render('createUser', {
    title: 'Create user',
  });
};

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render('updateUser', {
    title: 'Update user',
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('updateUser', {
        title: 'Update user',
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect('/');
  },
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect('/');
};

exports.usersSearchListGet = (req, res) => {
  const { query } = req.query;
  res.render('index', {
    title: 'User Search Results',
    users: usersStorage.getUsersByEmailOrName(query),
  });
};

exports.usersSearchFormGet = (req, res) => {
  res.render('searchUser', {
    title: 'User Search Form',
  });
};
