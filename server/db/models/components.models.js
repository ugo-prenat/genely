const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
  id: Number,
  shortname: String,
  fullname: String,
  isPublic: Boolean,
  creator: {
    id: Number,
    username: String,
    avatarUrl: String
  },
  tree: Array,
  filters: {
    technologies: Array,
    categories: Array
  }
}, {timestamps: true})

module.exports = mongoose.model('components', componentSchema)