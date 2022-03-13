const users = require('./users.routes')
const components = require('./components.routes')
const auth = require('./auth.routes')
const filters = require('./filters.routes')
const uploads = require('./uploads.routes')

module.exports = { users, components, auth, filters, uploads }