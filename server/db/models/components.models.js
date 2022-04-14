const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
  id: Number,
  url: String,
  shortname: String,
  fullname: String,
  isPublic: Boolean,
  description: String,
  creator: {
    id: Number,
    username: String,
    fullname: String,
    avatarUrl: String
  },
  tree: Array,
  filters: Array,
  illustrations: Array
}, {timestamps: true})

module.exports = mongoose.model('components', componentSchema)