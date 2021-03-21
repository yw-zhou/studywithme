var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router
  .get("/", userController.get_user)
  .post("/", userController.create_a_user)
  .post("/update", userController.update_user);
// .post("/", function (req, res, next) { res.send(req.body) })

module.exports = router;
