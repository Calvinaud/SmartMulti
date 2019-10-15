module.exports = require("./calendar").then((calendar) => {

    return {

        /**
        * 
        * @param {import("./socket").WebSocketMessage} message 
        */
        webSocketMessageHandler: function(connection, message) {
            if (message.type === 'utf8') {
                console.log('Received Message: ' + message.utf8Data);
                connection.sendUTF("hello");
            }
            else if (message.type === 'binary') {
                console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                connection.sendBytes(message.binaryData);
            }
        }
    }

});

    
