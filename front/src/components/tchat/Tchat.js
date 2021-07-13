import React, { useState, useEffect } from 'react'

// import { StreamChat } from 'stream-chat';

// const chatClient = StreamChat.getInstance("rc8zz9vnkey6");

// chatClient.connectUser({ id: 1 }, localStorage.getItem('studhelp'));

// import { connectUser } from '../../services/tchat'

export default function Tchat(props) {
    const [response, setResponse] = useState([])

    useEffect(() => {
        // connectUser(setResponse)
    }, [])
    console.log(props)
    return (
        <div>
            ok
            {/* <Chat client={chatClient}>
                <ChannelList />
                <Channel>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat> */}
        </div>
    )
}
