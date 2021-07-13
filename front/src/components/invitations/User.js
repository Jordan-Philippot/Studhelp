import React, { useState, useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { sendInvitationUser, removeInvitationUser } from '../../services/invitations'


export default function User(props) {

    const [response, setResponse] = useState("")
    const [errors, setErrors] = useState([])
    const [responseRemove, setResponseRemove] = useState("")

    const data = {
        "eventId": props.eventId,
        "receiveId": props.user.id,
        "message": props.message ? props.message : null
        // "senderId": props.user.id,
    }
    console.log(props)
    const sendInvitation = () => {
        confirmAlert({
            title: "Envoyer une invitation",
            message: 'Êtes-vous sûr de vouloir envoyer une invitation à cet utilisateur?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => { sendInvitationUser(data, setResponse, setErrors) }
                },
                {
                    label: 'Non',
                    onClick: () => alert("L'invitation n'a pas été envoyée")
                }
            ]
        });
    }

    const removeInvitation = () => {
        confirmAlert({
            title: "Supprimer votre invitation",
            message: "Êtes-vous sûr de vouloir supprimer l'invitation envoyée à cet utilisateur?",
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => { removeInvitationUser(data, setResponseRemove) }
                },
                {
                    label: 'Non',
                    onClick: () => alert("L'invitation n'a pas été supprimée")
                }
            ]
        });
    }

    useEffect(() => {
        if (response === "success") {
            window.location.href = "/espace-client/nouvel-invitation/" + props.eventId + "?invitation=invitationSend"
        }
        // eslint-disable-next-line
    }, [response])

    useEffect(() => {
        if (responseRemove === "success") {
            window.location.href = "/espace-client/nouvel-invitation/" + props.eventId + "?invitation=invitationRemove"
        }
        // eslint-disable-next-line
    }, [responseRemove])

    return (
        <div className="association-component col-10 col-sm-8 col-lg-5 col-xl-5">
            <h4>{props.user.email}</h4>
            {props.user.lastname &&
                <div className="d-flex justify-content-center address">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                    </svg>
                    <p> {props.user.lastname} {props.user.firstname} </p>
                </div>
            }
            {props.user.city &&
                <div className="d-flex justify-content-center address">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <p> {props.user.city} </p>
                </div>
            }
            {props.user.school &&
                <div className="d-flex justify-content-center address">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-textarea-t" viewBox="0 0 16 16">
                        <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z" />
                    </svg>
                    <p> {props.user.school}</p>
                </div>
            }
            {props.user.age &&
                <div className="d-flex justify-content-center address">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass-top" viewBox="0 0 16 16">
                        <path d="M2 14.5a.5.5 0 0 0 .5.5h11a.5.5 0 1 0 0-1h-1v-1a4.5 4.5 0 0 0-2.557-4.06c-.29-.139-.443-.377-.443-.59v-.7c0-.213.154-.451.443-.59A4.5 4.5 0 0 0 12.5 3V2h1a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1h1v1a4.5 4.5 0 0 0 2.557 4.06c.29.139.443.377.443.59v.7c0 .213-.154.451-.443.59A4.5 4.5 0 0 0 3.5 13v1h-1a.5.5 0 0 0-.5.5zm2.5-.5v-1a3.5 3.5 0 0 1 1.989-3.158c.533-.256 1.011-.79 1.011-1.491v-.702s.18.101.5.101.5-.1.5-.1v.7c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13v1h-7z" />
                    </svg>
                    <p>  {props.user.age + " ans"}</p>
                </div>
            }
            {errors.message && <span className="text-error">{errors.message}</span>}
            {errors.user && <span className="text-error">{errors.user}</span>}
            {errors.event && <span className="text-error">{errors.event}</span>}

            {(() => {
                if (props.user.isInvited) {
                    return <button className="btn-redOut" onClick={removeInvitation}>Supprimer Invitation</button>;
                } else if (props.user.isParticipate) {
                    return <button className="btn-greenFull">Participe Déjà</button>;
                } else {
                    return <button className="btn-turquoiseOut" onClick={sendInvitation}>Envoyer invitation</button>
                }
            })()}

        </div>
    )
}
