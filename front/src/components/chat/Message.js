import React from 'react'
import ReactEmoji from 'react-emoji';

export default function Message(props) {
    const classe = props.message.iamSender ? "message" : "messageGrey";
    // console.log(props)

    return (
        <div className={classe + "Component message col-sm-12"}>
            <div className={"sendAt"}>
                <p>{props.message.sendAt.date ? props.message.sendAt.date.substr(0, 16) : props.message.sendAt}</p>
            </div>

            <div className={"messageBlock"}>
                <p> {ReactEmoji.emojify(props.message.message)} </p>
            </div>

            <div className={"messagenameContainer"}>
                <p>{classe && classe === "message" ? "Vous" : props.message.sender.firstname}</p>
            </div>

        </div >
    )
}
