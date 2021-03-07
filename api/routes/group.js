var express = require("express");
var router = express.Router();
var groupController = require("../controllers/groupController");

router
  .get("/getGroups", groupController.get_groups)
  .get("/getGroupInfo", groupController.get_group_info)
  .post("/createGroup", groupController.create_group)
  .post("/assignGroup", groupController.assign_group);

module.exports = router;
