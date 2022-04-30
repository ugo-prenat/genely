const mongoose = require('mongoose')

const filterSchema = new mongoose.Schema({
  name: String,
  lowercase: String,
  type: String
}, {timestamps: true})

module.exports = mongoose.model('filters', filterSchema)