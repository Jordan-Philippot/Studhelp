
// import React, { useState, useEffect } from 'react';
// import { ChannelList } from './ChannelList';
// import './chat.scss';
// import { MessagesPanel } from './MessagesPanel';
// import socketClient from "socket.io-client";
// const SERVER = "http://127.0.0.1:8080";

// export default function Chat() {
//     const [Channels, setChannels] = useState([])
//     const [ThisSocket, setThisSocket] = useState([])
//     const [channel, setChannel] = useState([])

//     // state = {
//     //     channels: null,
//     //     socket: null,
//     //     channel: null
//     // }


//     configureSocket = () => {
//         var socket = socketClient(SERVER);
//         socket.on('connection', () => {
//             if (channel) {
//                 handleChannelSelect(channel.id);
//             }
//         });
//         socket.on('channel', channel => {
//             channels.forEach(c => {
//                 if (c.id === channel.id) {
//                     c.participants = channel.participants;
//                 }
//             });
//             // this.setState({ channels });
//         });
//         socket.on('message', message => {

//             channels.forEach(c => {
//                 if (c.id === message.channel_id) {
//                     if (!c.messages) {
//                         c.messages = [message];
//                     } else {
//                         c.messages.push(message);
//                     }
//                 }
//             });
//             // setChannels(channels)
//             // this.setState({ channels });
//         });
//         // this.socket = socket;
//     }

//     const loadChannels = async () => {
//         fetch('http://localhost:8080/getChannels').then(async response => {
//             let data = await response.json();
//             setChannels(data.channels)
//             // this.setState({ channels: data.channels });
//         })
//     }

//     useEffect(() => {
//         loadChannels()
//         configureSocket()
//     }, [])

//     const handleChannelSelect = (id) => {
//         let channel = channels.find(c => {
//             return c.id === id;
//         });
//         setChannel(channel)
//         // this.setState({ channel });
//         socket.emit('channel-join', id, ack => {
//         });
//     }

//     const handleSendMessage = (channel_id, text) => {
//         socket.emit('send-message', { channel_id, text, senderName: socket.id, id: Date.now() });
//     }



//     return (
//         <div className='chat-app'>
//             <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
//             <MessagesPanel onSendMessage={handleSendMessage} channel={channel} />
//         </div>
//     );

// }


import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Channel from './Channel';
import { getConversationsByUser, getConversation } from '../../services/conversations'
import Loader1 from '../loader/Loader1'

import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";

export default function Chat() {
    let { id } = useParams();

    const [conversation, setConversation] = useState([])
    const [conversations, setConversations] = useState([])
    const [loadedConversations, setLoadedConversations] = useState(false)

    //get all conversation
    // il faut créer une conversation dès qu'un event est crée, puis inscrire des qu'un user s'inscris à l'évènement
    useEffect(() => {
        getConversationsByUser(setConversations, setLoadedConversations)
        if (id) {
            getConversation(setConversation)
        }
    }, [])

    return (
        <div>
            {(() => {
                if (conversations.length === 0 && loadedConversations === true) {
                    return <p className="geolocalisation-none">Désolé, Vous n'avez aucune conversation en cours</p>
                } else if (conversations.length > 0 && loadedConversations === true) {
                    return conversations
                        .map((conversation, key) => {
                            return <Channel key={key} conversation={conversation} />
                        })
                } else {
                    return <Loader1 />;
                }
            })()}
        </div>
    )
}
