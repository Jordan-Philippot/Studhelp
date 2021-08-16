import React, { useEffect, useState } from 'react'
import Message from './Message';
import { SendMessage } from '../../services/tchat.js'
import io from "socket.io-client"

export default function MessagesPanel(props) {


    const [responseMessage, setResponseMessage] = useState([])
    const [errorsMessage, setErrorsMessage] = useState([])


    const [message, setMessage] = useState("")

    const data = {
        "message": message,
        "conversation": props.conversation.id,
    }

    const sendMessage = () => {
        SendMessage(data, setResponseMessage, setErrorsMessage)
        setMessage("")

        // Scroll to bottom 
        var scroll = document.getElementById('messagesBlock');
        scroll.scrollTop = scroll.scrollHeight;
    }

    return (
        <div className="row justify-content-center">
            <div className="chatComponent col-10 col-sm-8 col-lg-8">
                <div className="chatContainer">
                    <div className="messagesContainer" id={"messagesBlock"}>
                        {props.conversation.messages && props.conversation.messages.map((message) => {
                            return <Message key={message.id} message={message} />
                        })}
                        {
                            props.conversation.messages && props.conversation.messages.length <= 0 &&
                            <p className="offset-1 col-10 notification-turquoise">Sois le premier a envoyer un message &#128521;</p>
                        }


                    </div>
                    <div className="sendContainer">
                        <input
                            type="text"
                            className=""
                            placeholder="Send your message..."
                            value={message.message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>
                            <svg id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m491.788.954-481.975 177.56c-10.267 3.781-13.148 16.953-5.421 24.68l96.607 96.606-18.586 112.543c-1.671 10.122 7.11 18.913 17.243 17.243l112.543-18.585 96.607 96.606c7.672 7.674 20.866 4.935 24.68-5.421l177.561-481.973c4.414-11.981-7.275-23.677-19.259-19.259zm-376.366 395.623 11.672-70.681 1.081 1.081c5.333 5.334 13.766 5.803 19.654 1.348l147.521-111.676c-119.97 158.476-112.095 148-112.824 149.314-3.241 5.842-2.213 13.152 2.506 17.871l1.071 1.071zm198.02 73.242-97.962-97.961c.81-1.07 168.63-222.747 169.337-223.7 10.425-14.048-7.515-31.177-21.095-20.89l-223.58 169.252-97.962-97.961 429.484-158.223z" /></g></svg>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}


// import React, { useEffect, useState, useRef } from 'react'
// import Message from './Message';
// import { SendMessage } from '../../services/tchat.js'
// import io from "socket.io-client"

// export default function MessagesPanel(props) {

//     const socketRef = useRef()

//     const [responseMessage, setResponseMessage] = useState([])
//     const [errorsMessage, setErrorsMessage] = useState([])

//     const [chat, setChat] = useState("")
// const [room, setRoom] = useState(props.conversation.id)
//     const [message, setMessage] = useState({
//         iamSender: true,
//         sendAt: Date.now(),
//         sender: {
//             firstname: "Vous"
//         },
//         message: ""
//     })

//     useEffect(() => {
//         setChat([...chat, props.conversation.messages])
//     }, [props.conversation.messages])

//     useEffect(() => {
//        setChat([props.conversation.messages])
//     }, [room])

//     const data = {
//         "message": message.message,
//         "conversation": props.conversation.id,
//     }

//     const sendMessage = () => {
//         SendMessage(data, setResponseMessage, setErrorsMessage)
//         // const { message, sendAt, iamSender, sender } = message
//         socketRef.current.emit("message", message)
//         setMessage({
//             message: "",
//             sendAt: Date.now(),
//             iamSender: true,
//             sender: {
//                 firstname: "Vous"
//             }
//         })

//         // Scroll to bottom 
//         var scroll = document.getElementById('messagesBlock');
//         scroll.scrollTop = scroll.scrollHeight;
//     }



//     useEffect(() => {
//         socketRef.current = io.connect("http://localhost:4000")
//         socketRef.current.on("message", (message) => {
//             setChat([...chat, message])
//         })
//         return () => socketRef.current.disconnect()
//     }, [chat])

//     const onTextChange = (e) => {
//         setMessage({
//             message: e.target.value,
//             sendAt: Date.now(),
//             iamSender: true,
//             sender: {
//                 firstname: "Vous"
//             }
//         })
//     }




//     return (
//         <div className="row justify-content-center">
//             <div className="chatComponent col-10 col-sm-8 col-lg-8">
//                 <div className="chatContainer">
//                     <div className="messagesContainer" id={"messagesBlock"}>
//                         {/* {props.conversation.messages && props.conversation.messages.map((message) => {
//                             return <Message key={message.id} message={message} />
//                         })} */}
//                         {chat[0] && chat[0].map((oneChat, index) => {
//                             return <Message key={index} message={oneChat} />
//                         })}
//                         {
//                             props.conversation.messages && props.conversation.messages.length <= 0 &&
//                             <p className="offset-1 col-10 notification-turquoise">Sois le premier a envoyer un message &#128521;</p>
//                         }


//                     </div>
//                     <div className="sendContainer">
//                         <input
//                             type="text"
//                             className=""
//                             placeholder="Send your message..."
//                             value={message.message}
//                             onChange={(e) => onTextChange(e)}
//                         />
//                         <button onClick={sendMessage}>
//                             <svg id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m491.788.954-481.975 177.56c-10.267 3.781-13.148 16.953-5.421 24.68l96.607 96.606-18.586 112.543c-1.671 10.122 7.11 18.913 17.243 17.243l112.543-18.585 96.607 96.606c7.672 7.674 20.866 4.935 24.68-5.421l177.561-481.973c4.414-11.981-7.275-23.677-19.259-19.259zm-376.366 395.623 11.672-70.681 1.081 1.081c5.333 5.334 13.766 5.803 19.654 1.348l147.521-111.676c-119.97 158.476-112.095 148-112.824 149.314-3.241 5.842-2.213 13.152 2.506 17.871l1.071 1.071zm198.02 73.242-97.962-97.961c.81-1.07 168.63-222.747 169.337-223.7 10.425-14.048-7.515-31.177-21.095-20.89l-223.58 169.252-97.962-97.961 429.484-158.223z" /></g></svg>
//                         </button>
//                     </div>


//                 </div>
//             </div>
//         </div>
//     )
// }
