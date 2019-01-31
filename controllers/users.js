const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

// Get all users
router.get('/', (req, res, next) => {
  User.find()
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

// Get user by id
router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  
  User.findById(id)
    .exec()
    .then(result => {
      console.log(result);
      if (result) {
      res.status(200).json(result);
      } 
      else {
        res.status(404).json({message: 'No valid entry found for provided ID'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

// Post a user
router.post('/', (req, res, next) => {

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });

  user.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'User was created',
        createdUSer: user
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

// Update a user
router.patch('/:userId', (req, res, next) => {
  const id = req.params.userId;
  const props = req.body;

  User.updateOne({_id: id}, props)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

// Delete a user
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;
  
  User.deleteOne({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: error});
  });
});

module.exports = router;