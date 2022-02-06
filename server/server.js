require('dotenv').config()

const express = require('express')
const cors = require('cors')
const figlet = require('figlet')

// App init
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listenning on port ${PORT}`)
  figlet('Genely', (err, data) => console.log(data))
})

// DB init
const db = require('./db/export')
db.connect()

// Routes init
const routes = require('./routes/export.routes')

app.use('/auth', routes.auth)
app.use('/users', routes.users)
app.use('/components', routes.components)