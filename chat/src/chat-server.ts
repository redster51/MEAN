var mongoose = require('mongoose');
var dbURI = 'mongodb://redster51:222149id@cluster0-shard-00-00-ykvld.mongodb.net:27017,cluster0-shard-00-01-ykvld.mongodb.net:27017,cluster0-shard-00-02-ykvld.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message } from './model';

export class ChatServer {
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
        mongoose.connect(dbURI);
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        var chatModel = new mongoose.Schema({
            id: {type: Number},
            avatar: {type: String},
            name: {type: String},
            content: {type: String},
            date: {type: String}
        });

        var ChatModel = mongoose.model('ChatModel', chatModel);
        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m) => {
                if (m.content) {
                    new ChatModel({id: m.from.id,
                        name: m.from.name,
                        content: m.content,
                        avatar: m.from.avatar,
                        date: m.from.date}).save();
                }
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
