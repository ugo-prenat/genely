const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  fullName: String,
  email: String,
  password: String,
  avatarUrl: String,
  isAdmin: Boolean,
  publicComponents: Number,
  privateComponents: Number,
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)