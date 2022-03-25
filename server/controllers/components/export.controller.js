const create = require('./create.controller')
const getAll = require('./get.controller').getAll
const getSpecific = require('./get.controller').getSpecific


module.exports = { create, getAll, getSpecific }