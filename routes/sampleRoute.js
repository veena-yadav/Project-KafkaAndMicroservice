const express = require('express')
const controller = require('../controllers/sampleController')
const route = express.Router()
module.exports = function (app) {
    app.route('/sample/view').get(controller.getSample)
    app.route('/sample/add').post(controller.addSample)
}