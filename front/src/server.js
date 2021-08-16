// import React, { useEffect, useState } from 'react'

// import { getConversationsByUser } from "./services/conversations"

// const url = process.env.REACT_APP_API_ENDPOINT;

// const headersAuth = {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ` + localStorage.getItem('studhelp')
// };
// const [loaded, setLoaded] = useState("")
// const [responseConv, setResponseConv] = useState("")

// getConversationsByUser(setResponseConv, setLoaded)


// const express = require('express');
// const socket = require('socket.io');

// const app = express();
// const PORT = 8080;

// const server = app.listen(PORT, () => {
//     console.log('server is running on port ' + PORT)
// });

// const io = socket(server);

// io.on('connection', socket => {
//     console.log("socket=", socket.id);
//     socket.emit('connection', null);
//     socket.on('channel-join', id => {
//         // On join channel, post user to conversation_user table,
//         // 10 participants on this channel
//         // And load all messages 
//         console.log('channel join', id);
//         responseConv.forEach(conv => {
//             if (conv.id === id) {
//                 if (conv.sockets.indexOf(socket.id) == (-1)) {
//                     conv.sockets.push(socket.id);
//                     // 2 participants is online
//                     conv.participants++;
//                     io.emit('channel', conv);
//                 }
//             } else {
//                 let index = conv.sockets.indexOf(socket.id);
//                 if (index != (-1)) {
//                     conv.sockets.splice(index, 1);
//                     conv.participants--;
//                     io.emit('channel', conv);
//                 }
//             }
//         });

//         return id;
//     });


//     socket.on('send-message', message => {
//         // On send message, post message to table m
//         io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//         responseConv.forEach(c => {
//             let index = conv.sockets.indexOf(socket.id);
//             if (index != (-1)) {
//                 // User is disconnected
//                 conv.sockets.splice(index, 1);
//                 conv.participants--;
//                 io.emit('channel', conv);
//             }
//         });
//     });
// });


