import React from 'react'
import SendIcon from '../../images/Chat/send.png'


export default function Input(props) {
    return (
        <form>
            <input
                type="text"
                className=""
                placeholder="Send your message..."
                value={props.message}
                onChange={props.setHandleMessage}
            />
            <button className="btn btn-dark" onClick={(e)=> props.setHandleMessage(e.target.value)}>Envoyer</button>
        </form>
    )
}
