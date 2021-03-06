'user strict';
var sql = require('./db.js');

//Task object constructor
var Group = function (groupAssignment) {
    this.user = groupAssignment.user;
    this.groupId = groupAssignment.groupId;
    this.groupName = groupAssignment.groupName;
};
Group.getGroups = function (user, result) {
    sql.query("SELECT * FROM groupMembers WHERE user='"+user+"';", function (err, res) { 
        if(err) result(err, null)
        result(null, res);
    })
}
module.exports=Group;