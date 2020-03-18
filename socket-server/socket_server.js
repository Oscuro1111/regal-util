var socket_ = require('../node_modules/socket.io');

var Socket__= {
    sockets:null
};
var HelperServer = function (socket) {

    this.socket = socket;
    this.io;
    this.clients = [];

}


HelperServer.prototype.install = function (server) {
    this.io = this.socket.listen(server);
    this.io.sockets.on("connection",  (socket)=>{

        var clients = this.clients;
        socket.emit("connection", {
            msg: "connected!"
        });
        socket.on('disconnect', function () {
            for (let client = 0; client < clients.length; client++) {
                if (clients[client].id == this.id) {
                    delete clients;
                } 
            }
            console.log("Disconnected");
        });
        this.clients.push({
            id: socket.id,
            socket: socket
        });
    });
}

module.exports.listen = function (server) {
    var hServer = new HelperServer(socket_);
    hServer.install(server);
    Socket__.sockets= hServer.io;

}
module.exports.SK=Socket__;