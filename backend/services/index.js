const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const conn = require('./utils/conn')
const userRoute = require('./routes/user.route')
const agentRoute = require('./routes/agent.route')

app.use('/api/user', userRoute)
app.use('/api/agent', agentRoute)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'http://localhost'


app.listen(PORT,()=>{
    console.log(`Running the service at ${HOST}:${PORT}`)
} )
