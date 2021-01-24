'use strict';

var User = require('../model/userModel.js');

exports.list_all_tasks = function(req, res) {
  User.getAllTask(function(err, user) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });
};

exports.create_a_user = function (req, res) {
  var new_user = new User(req.body.user);
  //handles null error 
   if(!new_user.email || !new_user.password){
      return res.status(400).send({ error:true, message: 'Please provide email/password' });
  }
  User.createUser(new_user, function (err, user) { 
    if (err) return res.status(400).send({ error:true, message: err });  
    res.json(user);
  });
  
};