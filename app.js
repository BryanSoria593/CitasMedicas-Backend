const express = require('express')
const morgan = require("morgan")
const cors = require('cors')


const app = express()
app.set("port", process.env.PORT_APP)
app.use(morgan('dev'))
app.use(cors())

//Lectura y parseo del body
app.use(express.json())

const authRoutes = require('./routes/auth')
const availableRoutes = require('./routes/available')
const citesRoutes = require('./routes/cite')
const doctorRoutes = require('./routes/doctor')
const medicalHistory = require('./routes/medicalHistory')

app.use('/api/auth', authRoutes)
app.use('/api/available', availableRoutes)
app.use('/api/cites', citesRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/medicalHistory', medicalHistory)

module.exports = { app }