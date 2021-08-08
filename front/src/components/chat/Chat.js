
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
import { useLocation, useHistory } from "react-router-dom";

import { getConversationsByUser, getConversation } from '../../services/conversations'

import Channel from './Channel';
import MessagesPanel from './MessagesPanel';

import Loader1 from '../loader/Loader1'
import Title from '../Title'

import Illustration from '../../images/User/Humaaans-PhoneGreen.png'


import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";

export default function Chat() {

    // Get params 
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();

    const history = useHistory();

    const [oneConversation, setOneConversation] = useState([])
    const [conversations, setConversations] = useState([])
    const [loadedConversations, setLoadedConversations] = useState(false)

    const [conversationId, setConversationId] = useState(query.get("conversation") ? query.get("conversation") : "")

    //get all conversation
    // inscrire des qu'un user s'inscris à l'évènement
    useEffect(() => {
        getConversationsByUser(setConversations, setLoadedConversations)
    }, [])

    useEffect(() => {
        setConversationId(query.get("conversation") ? query.get("conversation") : "")
    }, [query])

    useEffect(() => {
        if (conversationId !== "") {
            getConversation(setOneConversation, conversationId)
        }
    }, [conversationId])

    // console.log(oneConversation)
    return (
        <div className="oneAssociation">

            <Title title="Mes Tchats" />


            {/* Presentation associations */}
            <div className="row justify-content-center description-page">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Voici toute les conversations auxquelles tu es inscris<br></br>
                        Ici, tu peux échanger avec toute les personnes qui participent aux même évènements que toi.
                        <br></br>
                        <br></br>
                        Les chat sont listés ci-dessous, pour en rejoindre un rien de plus simple, il suffit de cliquer sur celui de ton choix!
                        <br></br><br></br>
                        Pour t'inscrire à de nouveaux évènements et ainsi participer au chat qui lui est dédié, <i onClick={() => history.push("/evenements")}>c'est ici</i> !
                    </p>
                </div>
                <div className="col-8 col-sm-5 col-md-4 col-lg-3 offset-xl-1 col-xl-2">
                    <img className="rocket-illustration" src={Illustration} alt="Men searching with binoculars" />
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="choiceChat">
                    <h4>Liste des Tchats</h4>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="allChannels col-10 col-sm-8 col-lg-6">
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
            </div>


            {oneConversation && query &&
                <MessagesPanel conversation={oneConversation} />
            }
        </div>
    )
}
