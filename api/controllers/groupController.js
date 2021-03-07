"use strict";

const { Group, Assignment } = require("../model/groupModel.js");

exports.get_groups = function (req, res) {
  Group.getGroups(req.query.user, function (err, groups) {
    if (err) res.status(400).send({ error: true, message: err });
    res.json(groups);
  });
};

exports.get_group_info = function (req, res) {
  Group.getGroupInfo(req.query.groupId, function (err, groups) {
    if (err) res.status(400).send({ error: true, message: err });
    res.json(groups);
  });
};

exports.create_group = function (req, res) {
  var new_group = new Group(req.body.group);
  console.log(new_group);
  Group.createGroup(new_group, function (err, group) {
    if (err) {
      res.status(400).send({ error: true, message: err });
      res.json();
    }
    var response = { group: group };
    console.log(response);
    assign_group(req, res, response);
  });
};

var assign_group = function (req, res, pack = null) {
  var new_assignment = new Assignment(req.body.group);
  Assignment.createAssignment(new_assignment, function (err, assignment) {
    if (err) res.status(400).send({ error: true, message: err });
    if (pack) {
      pack.assignment = assignment;
    } else {
      pack = assignment;
    }
    res.json(pack);
  });
};

exports.assign_group = assign_group;
