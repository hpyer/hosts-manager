'use strict'

var Utils = require('../assets/utils')
var Profile = require('../models/Profile')

var Active = function (req, res) {
  if (!req.body.id) {
    Utils.jsonError(res, 'ID呢?')
    return
  }
  let result = Profile.active(req.body.id)
  if (result === true) {
    Utils.jsonSuccess(res, {profiles: Profile.get()})
  } else {
    Utils.jsonError(res, '操作错误')
  }
}

module.exports = Active
