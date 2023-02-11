const express = require('express');
const validation = require('../validation/validator');
const usersController = require('../controllers/users');

const router = express.Router();



router.get('/', usersController.getAll);

router.get('/:id', usersController.getUser);

router.post('/', validation.validateUser, usersController.createUser);

router.put('/:id', validation.validateUser, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;