'use strict'

var Utils = require('../assets/utils')
var Profile = require('../models/Profile')

var Create = function (req, res) {
  if (!req.body.name) {
    Utils.jsonError(res, '名称呢?')
    return
  }
  let result = Profile.create(req.body.name, req.body.content)
  if (result === true) {
    Utils.jsonSuccess(res, {profiles: Profile.get()})
  } else {
    Utils.jsonError(res, '操作错误')
  }
}

module.exports = Create
