const { Router } = require("express");
const orderController = require("../../controllers/orders");

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.post("/", orderController.saveOrder);
router.put("/", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
module.exports = router;
