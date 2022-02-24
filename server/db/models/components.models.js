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
  tree: Object,
  technologies: {
    framework: {
      name: String,
      icon: String
    },
    css: {
      name: String,
      icon: String
    }
  },
  filters: Array
}, {timestamps: true})

module.exports = mongoose.model('components', componentSchema)