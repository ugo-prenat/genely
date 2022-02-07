const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
  id: Number,
  shortName: String,
  fullName: String,
  creator: {
    id: Number,
    username: String,
    avatarUrl: String
  },
  isPublic: Boolean,
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