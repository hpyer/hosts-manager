'use strict'

var Utils = require('../assets/utils')
var Profile = require('../models/Profile')

var Update = function (req, res) {
  if (!req.body.id) {
    Utils.jsonError(res, 'ID呢?')
    return
  }
  if (!req.body.name) {
    Utils.jsonError(res, '名称呢?')
    return
  }
  let result = Profile.update(req.body.id, {
    'name': req.body.name,
    'content': req.body.content
  })
  if (result === true) {
    Utils.jsonSuccess(res, {profiles: Profile.get()})
  } else {
    Utils.jsonError(res, '操作错误')
  }
}

module.exports = Update
