"user strict";
var sql = require("./db.js");
var moment = require("moment");
var uuid = require("uuid");

//Task object constructor
var Group = function (group) {
  this.groupId = group.groupCode;
  this.groupName = group.groupName;
  this.password = group.password;
  this.isPublic = group.isPublic;
  this.description = group.description;
};

Group.getGroups = function (user, result) {
  sql.query(
    "SELECT * FROM groupMembers WHERE user='" + user + "';",
    function (err, res) {
      if (err) result(err, null);
      result(null, res);
    }
  );
};

Group.getGroupInfo = function (groupId, result) {
  sql.query(
    "SELECT * FROM groupSettings WHERE groupId='" + groupId + "';",
    function (err, res) {
      if (err) result(err, null);
      result(null, res);
    }
  );
};

Group.getSchedules = function (groupId, result) {
  const start_day = moment().startOf("week").format("YYYY-MM-DD HH:mm:ss");
  const end_day = moment().endOf("week").format("YYYY-MM-DD HH:mm:ss");
  console.log(start_day, end_day);
  sql.query(
    `SELECT user, datetime FROM schedule WHERE groupId='${groupId}' AND datetime >= '${start_day}' AND datetime <= '${end_day}' ORDER BY datetime ASC;`,
    function (err, res) {
      if (err) result(err, null);
      result(null, res);
    }
  );
};

Group.createGroup = function (new_group, result) {
  sql.query("INSERT INTO groupSettings SET ?", new_group, function (err, res) {
    if (err) result(err, null);
    result(null, res);
  });
};

var Assignment = function (assignment) {
  this.groupId = assignment.groupCode;
  this.groupName = assignment.groupName;
  this.user = assignment.user;
};

Assignment.createAssignment = function (new_assignment, result) {
  sql.query(
    "INSERT INTO groupMembers SET ?",
    new_assignment,
    function (err, res) {
      if (err) result(err, null);
      result(null, res);
    }
  );
};

var Schedule = function (schedule) {
  this.groupId = schedule.groupId;
  this.user = schedule.user;
  this.datetime = schedule.date;
  this.scheduleId = uuid.v4();
};

Schedule.createSchedule = function (new_schedule, result) {
  sql.query("INSERT INTO schedule SET ?", new_schedule, function (err, res) {
    console.log(err);
    if (err) result(err, null);
    result(null, res);
  });
};

exports.Group = Group;
exports.Assignment = Assignment;
exports.Schedule = Schedule;
