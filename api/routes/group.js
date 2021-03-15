var express = require("express");
var router = express.Router();
var groupController = require("../controllers/groupController");

router
  .get("/getGroups", groupController.get_groups)
  .get("/getGroupInfo", groupController.get_group_info)
  .get("/getSchedules", groupController.get_schedules)
  .get("/getScheduleSettings", groupController.get_schedule_settings)
  .post("/createGroup", groupController.create_group)
  .post("/assignGroup", groupController.assign_group)
  .post("/createSchedule", groupController.create_schedule);

module.exports = router;
