const controller=require('../controllers/criticalhospitalController.js')

module.exports=function(app){
    app.route('/gethospitals').get(controller.gethospitals)
    app.route('/getreorders').get(controller.getreorders)
    app.route('/postreorder').post(controller.postreorder)
}