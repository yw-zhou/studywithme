"user strict";
var sql = require("./db.js");

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

exports.Group = Group;
exports.Assignment = Assignment;
