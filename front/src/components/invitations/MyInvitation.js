import React, { useState, useEffect } from 'react'
import dateFormat from 'dateformat';
import { removeInvitationUser, acceptInvitationUser } from '../../services/invitations'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function MyInvitation(props) {
    console.log(props.invitation.event.id)

    const [responseRemove, setResponseRemove] = useState("")
    const [responseAccept, setResponseAccept] = useState("")

    const data = {
        "eventId": props.invitation.event ? props.invitation.event.id : null,
        "receiveId": props.who && props.who === "receiver" ? props.invitation.receiver.id: props.invitation.receiver.id,
        "senderId": props.who && props.who === "sender" ? props.invitation.currentUser :props.invitation.sender.id,
    }

    console.log(props.who)
    const removeInvitation = () => {
        confirmAlert({
            title: "Supprimer votre invitation",
            message: props.who && props.who === "sender" ? "Êtes-vous sûr de vouloir supprimer l'invitation envoyée à cet utilisateur?" : "Êtes-vous sûr de vouloir refuser l'invitation envoyée par cet utilisateur?",
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


    const acceptInvitation = () => {
        confirmAlert({
            title: "Accepter l'invitation",
            message: "Êtes-vous sûr de vouloir accepter l'invitation envoyée par cet utilisateur?",
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => { acceptInvitationUser(data, setResponseAccept) }
                },
                {
                    label: 'Non',
                    onClick: () => alert("L'invitation n'a pas été supprimée")
                }
            ]
        });
    }

    useEffect(() => {
        if (responseRemove === "success") {
            window.location.href = "/espace-client/mes-invitations?invitation=invitationRemove"
        }
    }, [responseRemove])

    useEffect(() => {
        if (responseAccept === "success") {
            window.location.href = "/espace-client/mes-invitations?invitation=invitationAccept"
        }
    }, [responseAccept])


    return (
        <div className="oneAssociation invitation">

            {props.who === "sender" && props.invitation.sender ?
                <div className="row justify-content-center">
                    <div className={`association-component invitation col-10 col-sm-8 col-md-10 col-lg-11 col-xl-9 ${props.invitation.event.isPassed ? "isPassed" : ""}`}>
                        {props.invitation.event.isPassed && <div className="isPassedBrand">Fin</div>}

                        <div className="row max-md-flex-direction-column ">

                            <div className="offset-1 col-10 offset-lg-0 col-lg-7">
                                <h4 className="my-0">{props.invitation.event && props.invitation.event.title}</h4>

                                <p className="association-description my-0">invité : {props.invitation.sender.email && props.invitation.sender.email}
                                    <br></br>
                                    Nom : {props.invitation.sender.firstname && props.invitation.sender.firstname}  {props.invitation.sender.lastname && props.invitation.sender.lastname}
                                    <br></br>
                                    {props.invitation.sender.school && "Organisation / École : " + props.invitation.sender.school}
                                </p>
                                {!props.invitation.event.isPassed &&
                                    <div className="d-flex max-sm-flex-direction-column mt-5 ">
                                        <button className="col-12 offset-md-1 col-md-4 btn-redFull" onClick={removeInvitation}>Supprimer Invitation</button>
                                    </div>
                                }

                            </div>

                            <div className="col-1 hr"></div>

                            <div className="offset-1 col-10 offset-lg-0 col-lg-4 right-side">
                                <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                    <p>{props.invitation.event.location}</p>
                                </div>
                                <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16">
                                        <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg>
                                    <p>Commence le {dateFormat(props.invitation.event.startedAt, "d/mm, yyyy à HH:MM TT")}</p>
                                </div>
                                {props.invitation.event.type && <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-laptop" viewBox="0 0 16 16">
                                        <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                                    </svg>
                                    <p>{props.invitation.event.type}</p>
                                </div>
                                }
                                {props.invitation.event.organisation && <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                                        <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                                    </svg>
                                    <p>Organisation: {props.invitation.event.organisation}</p>
                                </div>
                                }
                                {props.invitation.event.admin && <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                    <p>Organisateur: {props.invitation.event.admin} <br></br>
                                        {props.invitation.sender.lastname.toUpperCase()} {props.invitation.sender.firstname}
                                        <br></br>
                                        {props.invitation.sender.school}
                                    </p>
                                </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                : props.who === "receiver" && props.invitation.receiver ?
                    <div className="row justify-content-center">
                        <div className={`association-component col-10 col-sm-8 col-md-10 col-lg-11 col-xl-9 ${props.invitation.event.isPassed ? "isPassed" : ""}`}>
                            {props.invitation.event.isPassed && <div className="isPassedBrand">Fin</div>}

                            <div className="row max-md-flex-direction-column ">

                                <div className="offset-1 col-10 offset-lg-0 col-lg-7">
                                    <h4>{props.invitation.event.title}</h4>
                                    <p className="association-description">{props.invitation.event.description}</p>
                                    <p className="association-description">{props.invitation.sender.firstname && props.invitation.sender.firstname} {props.invitation.sender.lastname && props.invitation.sender.lastname} ({props.invitation.sender.email}) vous a envoyé cet invitation</p>
                                    {!props.invitation.event.isPassed && props.invitation.invitation.status === "send" &&
                                        <div className="d-flex max-sm-flex-direction-column">
                                            <button className="col-12 offset-md-1 col-md-4 btn-turquoiseFull" onClick={acceptInvitation}>Accepter Invitation</button>
                                        </div>
                                    }
        
                                    {!props.invitation.event.isPassed && props.invitation.invitation.status === "send" &&
                                        <div className="d-flex max-sm-flex-direction-column">
                                            <button className="col-12 offset-md-1 col-md-4 btn-redOut" onClick={removeInvitation}>Refuser Invitation</button>
                                        </div>
                                    }
                                    {props.invitation.invitation.status === "accepted" &&
                                        <div className="d-flex max-sm-flex-direction-column">
                                            <button className="col-12 offset-md-1 col-md-4 btn-redOut" onClick={removeInvitation}>Retirer ma participation</button>
                                        </div>
                                    }
                                </div>

                                <div className="col-1 hr"></div>

                                <div className="offset-1 col-10 offset-lg-0 col-lg-4 right-side">
                                    <div className="d-flex information">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                        </svg>
                                        <p>{props.invitation.event.location}</p>
                                    </div>
                                    <div className="d-flex information">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16">
                                            <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                        <p>Commence le {dateFormat(props.invitation.event.startedAt, "d/mm, yyyy à HH:MM TT")}</p>
                                    </div>
                                    {props.invitation.event.type && <div className="d-flex information">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-laptop" viewBox="0 0 16 16">
                                            <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                                        </svg>
                                        <p>{props.invitation.event.type}</p>
                                    </div>
                                    }
                                    {props.invitation.event.organisation && <div className="d-flex information">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-textarea-t" viewBox="0 0 16 16">
                                            <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z" />
                                        </svg>
                                        <p>Organisation: {props.invitation.event.organisation}</p>
                                    </div>
                                    }
                                    {props.invitation.event.admin && <div className="d-flex information">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-textarea-t" viewBox="0 0 16 16">
                                            <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z" />
                                        </svg>
                                        <p>Organisateur: {props.invitation.event.admin} <br></br>
                                            {props.invitation.receiver.firstname} {props.invitation.receiver.lastname}
                                            <br></br>
                                            {props.invitation.receiver.school}
                                        </p>
                                    </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    : <p className="geolocalisation-none">Pour voir tes invitations, selectionne un des boutons ci-dessus</p>
            }
        </div>
    )
}
