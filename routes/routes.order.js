const { controller, operationsOnOrders, operationsOnReorders } = require('../controllers/controller.order')
const router = require('express').Router();

router.post("/placeOrder", controller.PlaceOrder);
router.post("/getOrdersByEmail", operationsOnOrders.fetchOrdersByEmail);
router.post("/getOrdersByEmailSortByPriceAsc", operationsOnOrders.fetchOrdersByEmailSortByPriceAsc);
router.post("/getOrdersByEmailSortByPriceDesc", operationsOnOrders.fetchOrdersByEmailSortByPriceDesc);
router.post("/getOrdersByEmailSortByQuantityAsc", operationsOnOrders.fetchOrdersByEmailSortByQuantityAsc);
router.post("/getOrdersByEmailSortByQuantityDesc", operationsOnOrders.fetchOrdersByEmailSortByQuantityDesc);
router.delete("/cancelAnOrder", operationsOnOrders.deleteAnOrder);

router.post("/getReodersByEmail", operationsOnReorders.fetchReordersByEmail);
router.post("/getReodersByEmailSortByQuantityAsc", operationsOnReorders.fetchReordersByEmailSortByQuantityAsc);
router.post("/getReodersByEmailSortByQuantityDesc", operationsOnReorders.fetchReordersByEmailSortByQuantityDesc);
router.post("/getReodersByEmailSortByPriceAsc", operationsOnReorders.fetchReordersByEmailSortByPriceAsc);
router.post("/getReodersByEmailSortByPriceDesc", operationsOnReorders.fetchReordersByEmailSortByPriceDesc);
router.delete("/cancelAnReorder", operationsOnReorders.deleteAnReorder);

module.exports = router;