const router = require("express").Router();
const userController = require("../../controllers/v1/userControllers");
const accountController = require("../../controllers/v1/accountControllers");
const transactionController = require("../../controllers/v1/transactionControllers");

router.get("/users", userController.getUser);
router.get("/users/:id", userController.getSpecificUser);
router.post("/users", userController.createUser);

router.get("/accounts", accountController.getAccount);
router.get("/accounts/:id", accountController.getSpecificAccount);
router.post("/accounts", accountController.createAccount);

router.get("/transactions", transactionController.getTransaction);
router.get("/transactions/:id", transactionController.getSpecificTransaction);
router.post("/transactions", transactionController.createTransaction);

module.exports = router;
