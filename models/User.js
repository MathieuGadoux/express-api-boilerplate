const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id:        mongoose.Schema.Types.ObjectId,
  username:   {type: String, required: true},
  email:      {type: String, required: true},
  firstname:  {type: String},
  lastname:   {type: String},
  }, 
  {timestamps: true} 
);

module.exports = mongoose.model('User', userSchema);
