const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance');

let io;

//Armazenamento das conexões no banco de dados (no caso, um array no próprio node)

const connections = [];


exports.setupWebSocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;
        if (techs) {
            connections.push({
                id: socket.id,
                coordinates: {
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                },
                techs: parseStringAsArray(techs),
            });
        }
        console.log(techs)
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(coonection.id).emit(message, data)
    })
}