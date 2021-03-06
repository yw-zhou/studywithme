var express = require("express");
var router = express.Router();
var groupController = require('../controllers/groupController');

router
    .get("/getGroups", groupController.get_groups)
    // .post("/", userController.create_a_user)
    // .post("/", function (req, res, next) { res.send(req.body) })

module.exports = router;