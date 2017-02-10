'use strict'

var Utils = require('../assets/utils')
var Profile = require('../models/Profile')

var Delete = function (req, res) {
  if (!req.body.id) {
    Utils.jsonError(res, 'ID呢?')
    return
  }
  let result = Profile.delete(req.body.id)
  if (result === true) {
    Utils.jsonSuccess(res, {profiles: Profile.get()})
  } else {
    Utils.jsonError(res, '操作错误')
  }
}

module.exports = Delete
