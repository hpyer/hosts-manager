var express = require('express');
var router = express.Router();

var profiles = require('../data/profiles.json');
var config = require('../config');
var json = require('json-string');

var hosts = {
    /**
     * 根据系统获取hosts文件的位置
     * @return string
     */
    getFile: function() {
        var os = require("os");
        var file = '/etc/hosts';
        if (os.type() == 'Windows_NT') {
            file = 'C:/Windows/System32/drivers/etc/hosts';
        }

        return file;
    },

    /**
     * 读取hosts文件内容
     * @return string 返回false表示读取失败
     */
    read: function() {
        var fs = require("fs");
        var option = {
            flags : 'r',
            encoding : null/*,
            mode : 0666*/
        };
        var file = this.getFile();
        var content = false;
        fs.readFile(file, option, function(err, data) {
            if (!err) content = data;
        });
        return content;
    },

    /**
     * 写入hosts文件内容
     * @param  string content 文件内容
     * @return bool
     */
    write: function(content) {
        var fs = require("fs");
        var option = {
            flags: 'a',
            /*encoding: null,
            mode: 0666*/
        };
        var file = this.getFile();
        var result = true;
        fs.writeFile(file, content, option, function(err) {
            if (err) result = false;
        });
        return result;
    }

};

var main = {
    index: function(req, res, next) {
        var data = {
            title: config.name,
            profiles: json(profiles)
        };
        res.render('index', data);
    },

    default: function(req, res, next) {
    },

    create: function(req, res, next) {
    },

    edit: function(req, res, next) {
    },

    del: function(req, res, next) {
    }

};

router.get('/', main.index);

module.exports = router;
