var http = require("http");
var fs = require("fs");
var os = require("os");
var path = require("path");
var url = require("url");

var server = http.createServer(function(req, res) {
        // var pathname = url.parse(req.url).pathname;
        // console.log(pathname);

        // 根据系统判断hosts文件的位置
        var filepath = '/etc/hosts';
        if (os.type() == 'Windows_NT') {
            filepath = 'C:/Windows/System32/drivers/etc/hosts';
        }
        console.log(filepath);

        var rOption = {
            flags : 'r',
            encoding : null/*,
            mode : 0666*/
        };
        var wOption = {
            flags: 'a',
            encoding: null/*,
            mode: 0666*/
        };
        var data = '\n\
127.0.0.1 localhost\n\
127.0.0.1 officegate.local\n\
60.190.212.98 oa.liandu.cc\n\
';

        var writeStream = fs.createWriteStream(filepath, wOption);
        writeStream.write(data);
        writeStream.end();

        var readStream = fs.createReadStream(filepath, rOption);
        readStream.on("error", function() {
                res.writeHead(404);
                res.end();
        });
        readStream.pipe(res);

        res.writeHead(200, {'Content-Type': 'text/plain'});
        // res.end();
});
server.on("error", function(error) {
        console.log(error);
});
server.listen(8080,function(){
        console.log('server listen on 8080');
});
