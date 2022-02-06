module.exports = {
  connect: require('./connection'),
  schema: {
    users: require('./models/users.models'),
    components: require('./models/components.models')
  }
}