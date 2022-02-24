const mongoose = require('mongoose')

const filterSchema = new mongoose.Schema({
  name: String,
  type: String
}, {timestamps: true})

module.exports = mongoose.model('filters', filterSchema)