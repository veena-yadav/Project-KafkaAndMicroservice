const controller = require("../Microservices/serviceController")
//const kafkademo=require("../kafka/consumer")
module.exports = function (app) {
    app.route("/getmedicines").get(controller.getMedicine);
    app.route("/belowthreshold").get(controller.getMedicinebyvalue);
    app.route("/move").post(controller.moveOrderBucket);
    app.route("/login").post(controller.Login);
    app.route("/getnotification").post(controller.getNotification);
    app.route("/order").post(controller.order);
    app.route("/reordermedicines").post(controller.reorderMed);
    app.route("/accept/:itemName").patch(controller.updateMedicine)

}