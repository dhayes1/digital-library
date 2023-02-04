const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  // #swagger.tags = ['users']
  // #swagger.summary = 'Finds all users'
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('Users')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['users']
  // #swagger.summary = 'Finds a single user by ID'
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('Users')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  // #swagger.tags = ['users']
  // #swagger.summary = 'Adds a new user'
  /* #swagger.paramaters['user'] = {
        in: 'body',
        description: 'Add a new user',
        schema: {
          $firstName: 'John',
          $lastName: 'Doe',
          $email: 'email@domain.com',
          $birthYear: 'YYYY',
          $image: ''
        }
  } */
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthYear: req.body.birthYear,
      image: req.body.image
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('Users')
      .insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'ERROR: Cannot create user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res, next) => {
  // #swagger.tags = ['users']
  // #swagger.summary = 'Update details of user by ID'
  /* #swagger.paramaters['user'] = {
        in: 'body',
        description: 'Update details of user',
        schema: {
          properties:
            $firstName: 'John',
            $lastName: 'Doe',
            $email: 'email@domain.com',
            $birtYear: 'YYYY',
            $image: ''
        }
  } */
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthYear: req.body.birthYear,
      image: req.body.image
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('Users')
      .updateOne({ _id: userId }, { $set: user });
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || 'ERROR: Cannot update contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  // #swagger.tags = ['users']
  // #swagger.summary = 'Delete a user by ID'
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('Users')
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || `ERROR: Cannot delete user. ${userId}`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };