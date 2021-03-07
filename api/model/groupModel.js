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

Group.createUser = function (new_group, result) {
  sql.query("INSERT INTO groupSettings SET ?", new_group, function (err, res) {
    if (err) result(err, null);
    result(null, res);
  });
};

module.exports = Group;
