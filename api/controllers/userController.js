"use strict";

var User = require("../model/userModel.js");

exports.create_a_user = function (req, res) {
  var new_user = new User(req.body.user);
  //handles null error
  if (!new_user.email || !new_user.password) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide email/password" });
  }
  User.createUser(new_user, function (err, user) {
    if (err) return res.status(400).send({ error: true, message: err });
    res.json(user);
  });
};

exports.update_user = function (req, res) {
  var new_user = new User(req.body.user);
  User.updateUser(new_user, function (err, user) {
    if (err) return res.status(400).send({ error: true, message: err });
    res.json(user);
  });
};

exports.get_user = function (req, res) {
  console.log("email", req.query.email);
  User.getUser(req.query.email, function (err, user) {
    if (err) return res.status(400).send({ error: true, message: err });
    res.json(user);
  });
};
