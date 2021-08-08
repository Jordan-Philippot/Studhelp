// import React from 'react';


// export class Message extends React.Component {

//     render() {
//         return (
//             <div className='message-item'>
//                 <div><b>{this.props.senderName}</b></div>
//                 <span>{this.props.text}</span>
//             </div>
//         )
//     }
// }


import React from 'react'
import ReactEmoji from 'react-emoji';


export default function Message(props) {
    const classe = props.message.iamSender ? "message" : "messageGrey";

    return (
        <div className={classe + "Component col-sm-12"}>
        <div className={classe + "Block"}>
            <p> {ReactEmoji.emojify(props.message.message)} </p>
        </div>

        <div className={classe + "nameContainer"}>
            <p>{props.message.sender.firstname}</p>
        </div>
    </div >
    )
}
