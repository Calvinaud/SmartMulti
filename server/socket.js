/** @type {SocketIO.Server} */
let io;

/**
 * @param {Express.Application} app
 */
module.exports.init = function(app){
    io = require('socket.io')(app);
    console.log("socket io listening on", io.path());

    io.on('connection', (socket) => { 
        console.log("new socket ---> " + socket.handshake.address);
        socket.emit("a", "hello")
    });
}

