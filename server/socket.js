const WebSocketServer = require("websocket").server;
const socketIO = require("socket.io");
let wsServer;

/** @type {SocketIO.Server} */
let io;

/**
 * @typedef WebSocketMessage
 * @property {string} type
 * @property {string} utf8Data
 * @property {Buffer} binaryData
 * 
 */

/**
 * @param {(connection: any, msg: WebSocketMessage) => void} messageCallback
 */
module.exports.initWebSocket = function(server, messageCallback){
    wsServer = new WebSocketServer({
        httpServer: server, 
        autoAcceptConnections: false
    })
    console.log("web socket listening");

    wsServer.on('request', function(request) {
        const connection = request.accept();
        const address = connection.socket.address();

        console.log("web socket connection accepted", address);
        connection.on('close', () => {
            console.log("web socket connection closed", address);
        })

        connection.on('message', (message) => messageCallback(connection, message));
        
    });
}


module.exports.initSocketIO = function(server){
    io = socketIO(server);
    console.log("socket io listening on", io.path());

    io.on('connection', (socket) => { 
        console.log(`[${new Date().toLocaleTimeString()}] new socket --->  ${socket.handshake.address}`);
        let timeout = setInterval(() => {
            if(socket.connected){
                socket.emit("a", {a: "hello"}); 
            } else {
                clearInterval(timeout);
            }
        }, 1000);

        socket.on("disconnect" ,()=> {
            console.log(`[${new Date().toLocaleTimeString()}] socket on ${socket.handshake.address} has disconnected`);
        });
    });
}

