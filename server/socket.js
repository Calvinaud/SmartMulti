/** @type {SocketIO.Server} */
let io;

/**
 * @param {Express.Application} app
 */
module.exports.init = function(app){
    io = require('socket.io')(app);
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

