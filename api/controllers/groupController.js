"use strict";

var Group = require("../model/groupModel.js");

exports.get_groups = function (req, res) {
  Group.getGroups(req.query.user, function (err, groups) {
    if (err) return res.status(400).send({ error: true, message: err });
    res.json(groups);
  });
};

exports.create_group = function (req, res) {
  console.log(req.body.group);
  var new_group = new Group(req.body.group);
  console.log(new_group);
  Group.createUser(new_group, function (err, group) {
    if (err) return res.status(400).send({ error: true, message: err });
    res.json(group);
  });
};
