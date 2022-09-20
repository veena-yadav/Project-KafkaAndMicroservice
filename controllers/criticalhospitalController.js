const axios = require('axios')
const asyncHandler = require('express-async-handler')
axios.default.withCredentials = true
let Resources = require('../models/hospitals.js');
let CriticalReorder = require('../models/criticalreorder.js')
//Add this to same servicecontroller file

var getdetails = {
    gethospitals: asyncHandler(async (req, res) => {
        const items = await Resources.find()

        res.status(200).json(items)
    }),
    getreorders: asyncHandler(async (req, res) => {
        const items = await CriticalReorder.find()

        res.status(200).json(items)
    }),
    postreorder: asyncHandler(async (req, res) => {
        const item = await CriticalReorder.create({
            medicineName: req.body.medicineName,
            quantity: req.body.quantity,
            hospitalName: req.body.hospitalName
        })

        res.status(200).json(item)
    })
}

module.exports = getdetails