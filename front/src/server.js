const express = require('express');
const socket = require('socket.io');

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('server is running on port ' + PORT)
});

const io = socket(server);

io.on('connection', socket => {
    console.log("socket=",socket.id);
    socket.on('CLIENT_MSG', data => {
        console.log("msg=",data);
        io.emit('SERVER_MSG', data);
    })
});