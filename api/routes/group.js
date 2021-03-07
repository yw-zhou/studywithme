var express = require("express");
var router = express.Router();
var groupController = require("../controllers/groupController");

router
  .get("/getGroups", groupController.get_groups)
  .post("/createGroup", groupController.create_group)
  .post("/assignGroup", groupController.assign_group);

module.exports = router;
