"user strict";
var sql = require("./db.js");

//Task object constructor
var User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.name = user.email;
  this.intro = user.intro;
};
User.createUser = function (newUser, result) {
  sql.query("INSERT INTO users SET ?", newUser, function (err, res) {
    if (err) result(err, null);
    result(null, res);
  });
};
User.getUser = function (email, result) {
  console.log("loading");
  sql.query(
    "SELECT * FROM users WHERE email='" + email + "';",
    function (err, res) {
      if (err) result(err, null);
      result(null, res);
    }
  );
};

User.updateUser = function (newUser, result) {
  sql.query(
    `UPDATE users SET intro='${newUser.email}', name='${newUser.name}' WHERE email='${newUser.email}';`,
    function (err, res) {
      if (err) result(err, null);
      result(null, res);
    }
  );
};
module.exports = User;
