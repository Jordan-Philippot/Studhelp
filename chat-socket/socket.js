const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', client => {
    client.on('message', console.log)
})

server.listen(7742)