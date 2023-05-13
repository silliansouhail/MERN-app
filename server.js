const express = require('express')
const cors = require('cors')
const connect = require('./helpers/dbConnect')

//routes
const userRoute = require('./router/route')

const app = express()
const port = process.env.CONNECTIONS_PORT

app.use(express.json())
app.use(cors())

//connection to the database
connect()

app.use('/api',userRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))