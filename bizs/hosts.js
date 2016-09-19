var fs = require("fs");
var os = require("os");

var hosts = {
    /**
     * 根据系统获取hosts文件的位置
     * @return string
     */
    getFile: function() {
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

module.exports = hosts;
