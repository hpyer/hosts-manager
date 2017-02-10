'use strict'

const fs = require('fs')
const uuid = require('node-uuid')
const Host = require('./Host')

const Profile = {
  file: './src/server/data/profiles.json',

  profiles: [],

  init: function () {
    this.load()
    if (this.profiles.length == 0) {
      let content = Host.readFile()
      this.create('Default', content, true)
    }
  },

  load: function () {
    if (!fs.existsSync(this.file)) {
      return false
    }
    try {
      let data = fs.readFileSync(this.file)
      this.profiles = JSON.parse(data)
    } catch (e) {
      console.log('Profile.load():', e)
      return e
    }
    return true
  },

  get: function () {
    return this.profiles
  },

  save: function () {
    try {
      fs.writeFileSync(this.file, JSON.stringify(this.profiles))
    } catch (e) {
      console.log('Profile.save():', e)
      return e
    }
    return true
  },

  getProfileContent: function (profile) {
    let content = profile.content
    return content
  },

  active: function (id) {
    try {
      let content = ''
      this.profiles.map((profile, i) => {
        if (profile.id == id) {
          this.profiles[i].isChecked = true
          content = this.getProfileContent(profile)
        } else {
          this.profiles[i].isChecked = false
        }
      })
      Host.writeFile(content)
      this.save()
    } catch (e) {
      console.log('Profile.active():', e)
      return e
    }
    return true
  },

  create: function (name, content='', isChecked=false) {
    try {
      this.profiles.push({
        id: uuid.v4(),
        name: name,
        content: content,
        depends: [],
        isChecked: isChecked
      })
      this.save()
    } catch (e) {
      console.log('Profile.create():', e)
      return e
    }
    return true
  },

  update: function (id, data) {
    try {
      let content = ''
      this.profiles.map((profile, i) => {
        if (profile.id == id) {
          for (var key in profile) {
            if (typeof data[key] != 'undefined') {
              profile[key] = data[key]
            }
          }
          this.profiles[i] = profile
          if (profile.isChecked) {
            content = this.getProfileContent(profile)
          }
          return
        }
      })
      if (content != '') Host.writeFile(content)
      this.save()
    } catch (e) {
      console.log('Profile.update():', e)
      return e
    }
    return true
  },

  delete: function (id) {
    try {
      this.profiles.map((profile, i) => {
        if (profile.id == id) {
          this.profiles.splice(i, 1)
          return
        }
      })
      this.save()
    } catch (e) {
      console.log('Profile.delete():', e)
      return e
    }
    return true
  }

}

Profile.init()

module.exports = Profile
