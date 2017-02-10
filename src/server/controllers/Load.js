'use strict'

var Utils = require('../assets/utils')
var Profile = require('../models/Profile')

var Load = function (req, res) {
  Utils.jsonSuccess(res, {profiles: Profile.get()})
}

module.exports = Load
