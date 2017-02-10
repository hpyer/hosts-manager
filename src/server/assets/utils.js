
const Utils = {
  jsonResult: function (res, code, message, data={}) {
    res.json({
      code,
      message,
      data
    })
    res.end()
  },

  jsonError: function (res, message, code=1) {
    this.jsonResult(res, code, message)
  },

  jsonSuccess: function (res, data={}, message='ok') {
    this.jsonResult(res, 0, message, data)
  }
}

module.exports = Utils
