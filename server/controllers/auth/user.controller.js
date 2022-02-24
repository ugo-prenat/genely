module.exports = (req, res) => {
  // Return user based on his authentication token
  res.status(200).send({ status: 200, user: req.user })
}