
const controller=require("../Microservices/serviceController")

module.exports=function(app)
{
    app.route("/getmedicines").get(controller.getMedicine);
    app.route("/belowthreshold").get(controller.getMedicinebyvalue);
    app.route("/login").post(controller.Login);
    app.route("/reordermedicines").post(controller.reorderMed);

}