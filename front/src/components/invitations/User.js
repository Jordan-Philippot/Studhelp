import React from 'react'
import { useHistory } from 'react-router-dom'

export default function User(props) {
    const history = useHistory()
    console.log(props)
    const sendInvitation = () =>{
        
    }
    return (
        <div className="association-component col-10 col-sm-8 col-lg-5 col-xl-5">
            <h4>{props.user.email}</h4>
            <div className="d-flex justify-content-center address">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <p>{props.user.city && props.user.city} </p>
            </div>
            <div className="d-flex justify-content-center address">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <p>{props.user.school && props.user.school} <br></br> {props.user.age && props.user.age + " ans"}</p>
            </div>
            <button className="btn btn-turquoiseOut" onClick={sendInvitation}>Envoyer invitation</button>

        </div>
    )
}
