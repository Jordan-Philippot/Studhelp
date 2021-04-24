import React from 'react'
import Logo from './../images/hat.png'

export default function Title(props) {
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-xl-4">
                <img className="logo" src={Logo} alt="student hat" />
                <h1>{props.title && props.title}</h1>
            </div>
        </div>
    )
}
