var express = require("express");
var router = express.Router();
var userController = require('../controllers/userController');

router
    .get("/", function (req, res, next) {res.send("API is working")})
    .post("/", userController.create_a_user)
    // .post("/", function (req, res, next) { res.send(req.body) })

module.exports = router;