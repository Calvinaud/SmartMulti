const WebSocketServer = require("websocket").server;
const socketIO = require("socket.io");
let wsServer;

/** @type {SocketIO.Server} */
let io;


module.exports.initWebSocket = function(server){
    wsServer = new WebSocketServer({
        httpServer: server, 
        autoAcceptConnections: false
    })
    console.log("web socket listening");

    wsServer.on('request', function(request) {
        console.log(request);
        const connection = request.accept();
        console.log("web socket connection accepted", connection.socket.address);
        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                console.log('Received Message: ' + message.utf8Data);
                connection.sendUTF("hello");
            }
            else if (message.type === 'binary') {
                console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                connection.sendBytes(message.binaryData);
            }
        });
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

