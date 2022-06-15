const create = require('./create.controller')
const getAll = require('./get.controller').getAll
const getSpecific = require('./get.controller').getSpecific
const getLiked = require('./get.controller').getLiked
const remove = require('./delete.controller')

module.exports = { create, getAll, getSpecific, getLiked, remove }