//mongo --host 127.13.122.129

var application_root = __dirname;
var express = require('express');
var path = require("path");
var http = require('http');
app = express();



app.configure(function() {
    app.set('port', process.env.PORT);
    //app.set('views', __dirname + '/app/server/views');
    //app.set('view engine', 'jade');
    //app.engine('html',tmpl);
    //app.set("view options", {layout: false});
    //app.register(".html");
    app.locals.pretty = true;
    //	app.use(express.favicon());
    //	app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'super-duper-secret-secret'
    }));
    app.use(express.methodOverride());
    //app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
    //app.use(express.static(__dirname + '/app/public'));

    app.use(express.logger('dev'));
    //app.use(express.bodyParser());
    app.use(express.static(path.join(application_root, "public")));
    // app.use(express.static(__dirname + '/app/public'));
});

var	server = require('http').createServer(app);
	var io = require('socket.io').listen(server);


var messagesArray = [{ 'message':'welcome to Node showcase' }];

io.sockets.on('connection', function (socket) {
	
	socket.emit('pushdata', messagesArray);
	
	socket.on('input', function (data) {
		messagesArray.push(data);
		io.sockets.emit('pushdata', messagesArray);
	});
	
	socket.on('disconnect', function () {
    	io.sockets.emit('user disconnected');
	});
  
});

server.listen(process.env.PORT);
console.log('Node Showcase is listening on port' + process.env.PORT);