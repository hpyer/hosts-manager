'use strict'

const os = require('os')
const fs = require('fs')

const Host = {
  getFilePath: function () {
    return os.platform() === 'win32' ? 'C:/windows/system32/drivers/etc/hosts' : '/etc/hosts'
  },

  readFile: function () {
    let file = this.getFilePath()
    if (!fs.existsSync(file)) {
      return ''
    }
    let data
    try {
      data = fs.readFileSync(file, "utf8")
    } catch (e) {
      console.log('Host.readFile():', e)
      return ''
    }
    return data
  },

  writeFile: function (data) {
    let file = this.getFilePath()
    try {
      fs.writeFileSync(file, data)
    } catch (e) {
      console.log('Host.writeFile():', e)
      return false
    }
    return true
  }
}

module.exports = Host
