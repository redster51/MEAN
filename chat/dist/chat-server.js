"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var dbURI = 'mongodb://redster51:222149id@cluster0-shard-00-00-ykvld.mongodb.net:27017,cluster0-shard-00-01-ykvld.mongodb.net:27017,cluster0-shard-00-02-ykvld.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
        mongoose.connect(dbURI);
    }
    ChatServer.prototype.createApp = function () {
        this.app = express();
    };
    ChatServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    ChatServer.prototype.config = function () {
        this.port = process.env.PORT || ChatServer.PORT;
    };
    ChatServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    ChatServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        var chatModel = new mongoose.Schema({
            id: { type: Number },
            avatar: { type: String },
            name: { type: String },
            content: { type: String }
        });
        var ChatModel = mongoose.model('ChatModel', chatModel);
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('message', function (m) {
                if (m.content) {
                    new ChatModel({ id: m.from.id, name: m.from.name, content: m.content, avatar: m.from.avatar }).save();
                }
                _this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    ChatServer.PORT = 8080;
    return ChatServer;
}());
exports.ChatServer = ChatServer;
