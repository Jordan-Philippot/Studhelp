import React from 'react'

export default function Popup(props) {

    return (
        <div className={`success-popup ${typeof props.className != "undefined" ? "failed-popup" : ""}`} id={props.id ? props.id : ""}>
            <div className="row justify-content-center">
                <p>{props.text && props.text}</p>
            </div>
        </div>
    )
}