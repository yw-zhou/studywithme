'use strict';

var Group = require('../model/groupModel.js');

exports.get_groups = function (req, res) {
  Group.getGroups(req.query.user, function (err, groups) { 
    if (err) return res.status(400).send({ error:true, message: err });  
    res.json(groups);
  });
};