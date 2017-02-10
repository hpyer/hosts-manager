import Vue from 'Vue'
import axios from 'axios'
import querystring from 'querystring'
import {Loading} from 'element-ui'

var Api = {
  baseUri: '',

  doRequest: function (api, options, useBaseUri = true) {
    let url = (useBaseUri ? this.baseUri : '') + api

    if (!options || typeof options !== 'object') options = {}
    options.url = url

    if (!options.success || typeof options.success !== 'function') options.success = () => {}
    if (!options.error || typeof options.error !== 'function') {
      options.error = () => {
        let loading = Loading.service();
        loading.close()
        Vue.$message({
          message: '网络故障',
          type: 'error'
        })
      }
    }
    if (!options.method) options.method = 'post'
    options.method = options.method.toUpperCase()

    if (typeof options.headers !== 'object') {
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    if (typeof options.data !== 'object') {
      options.data = {}
    }
    options.data = querystring.stringify(options.data)

    axios(options).then((response) => {
      options.success(response.data)
    }).catch(options.error)
  },

  loadProfiles: function (options) {
    this.doRequest('/load', options)
  },

  activeProfile: function (options) {
    this.doRequest('/active', options)
  },

  createProfile: function (options) {
    this.doRequest('/create', options)
  },

  deleteProfile: function (options) {
    this.doRequest('/delete', options)
  },

  updateProfile: function (options) {
    this.doRequest('/update', options)
  }
}

export default Api
