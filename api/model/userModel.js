'user strict';
var sql = require('./db.js');

//Task object constructor
var User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.name = user.email;
};
User.createUser = function (newUser, result) {    
    sql.query("INSERT INTO users SET ?", newUser, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId, newUser.email);
            result(null, res);
        }
    })   
};
User.getUser = function (email, result) {
    sql.query("SELECT * FROM users WHERE email='"+email+"';", function (err, res) { 
        if(err) result(err, null)
        result(null, res);
    })
}
module.exports=User;