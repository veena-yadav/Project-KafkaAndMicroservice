var express = require('express')
const consumer = require('../kafka/consumer.js')
var app = express()
const cors=require('cors')
app.use(cors())
app.use(express.json())

const microroutes = require('../micro_routes/micromediroute')

microroutes(app)
app.listen(5050, function () {
    console.log("server started")
})
consumer()