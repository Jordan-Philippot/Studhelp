// import React, { useState, useEffect } from 'react';
// // import '../../services/server'
// import io from 'socket.io-client';


// export default function Tchat() {
//     const socket = io('localhost:7742');


//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState([])

//     function sendMessage(e) {
//         e.preventDefault();
//         const msg = {
//             username: e.target.username.value,
//             text: e.target.text.value
//         };
//         socket.emit('CLIENT_MSG', msg);
//         setNewMessage(msg);
//     }
//     socket.on('SERVER_MSG', msg => {
//         setNewMessage(msg);
//     });

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-4">
//                     <div className="card">
//                         <div className="card-body">
//                             <div className="card-title">My first chat</div>
//                             <hr />
//                             <div className="messages">
//                                 {messages && messages.map(msg => {
//                                     return (
//                                         <div key>{msg.username}: {msg.text}</div>
//                                     )
//                                 })}
//                             </div>
//                         </div>
//                         <form onSubmit={e => sendMessage(e)}>
//                             <div className="card-footer">
//                                 <input id="username"
//                                     type="text"
//                                     placeholder="Username"
//                                     className="form-control"
//                                 />
//                                 <br />
//                                 <input id="text"
//                                     type="text"
//                                     placeholder="Your message"
//                                     className="form-control"
//                                 />
//                                 <br />
//                                 <button type="submit"
//                                     className="btn btn-primary form-control">
//                                     send
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

