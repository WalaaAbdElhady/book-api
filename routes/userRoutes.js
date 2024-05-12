const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router({ mergeParams: true });

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  authController.restrictTo('user'),
  userController.updateMe
);
router.delete(
  '/deleteMe',
  authController.restrictTo('user'),
  userController.deleteMe
);

router.delete(
  '/delete-account',
  authController.restrictTo('user', 'admin'),
  userController.deleteAccount
);

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers)
  .post(authController.restrictTo('admin'), userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
