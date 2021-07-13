import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { getEvent } from '../../services/events'
import { addParticipation, getParticipants, removeParticipant } from '../../services/participation'

import Illustration from '../../images/Associations/product_launch.png'
import Title from '../Title'
import dateFormat from 'dateformat';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function OneEvent(props) {
    const [event, setEvent] = useState([])

    const [responseParticipation, setResponseParticipation] = useState('')
    const [errorsParticipation, setErrorsParticipation] = useState([])
    const [isParticipate, setIsParticipate] = useState(false)
    const [isRemove, setIsRemove] = useState(false)

    const history = useHistory()
    let { id } = useParams();

    useEffect(() => {
        getEvent(setEvent, id)
        getParticipants(id, setIsParticipate)
        // eslint-disable-next-line
    }, [])

    const data = {
        'eventId': id
    }
 
    const addParticipationtUser = () => {
        confirmAlert({
            title: "Participer a cet évènement",
            message: "Êtes-vous sûr de vouloir vous inscrire a cet évènement?",
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        if (!props.token.user) {
                            window.location.href = "/connexion"
                        } else {
                            addParticipation(data, setResponseParticipation, setErrorsParticipation)
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick: () => alert("Votre participation n'a pas été supprimé")
                }
            ]
        });
    }

    useEffect(() => {
        if (responseParticipation === "success") {
            window.location.href = "/evenement/" + id + "?event=addParticipation"
        }
        // eslint-disable-next-line
    }, [responseParticipation])


    const handleRemoveParticipant = () => {
        confirmAlert({
            title: "Annuler votre participation",
            message: "Êtes-vous sûr de vouloir supprimer votre participation à cet évènement?",
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => { removeParticipant(data, setIsRemove) }
                },
                {
                    label: 'Non',
                    onClick: () => alert("Votre participation n'a pas été supprimé")
                }
            ]
        });
    }

    useEffect(() => {
        if (isRemove) {
            window.location.href = "/evenement/" + id + "?event=removeParticipation"
        }
        // eslint-disable-next-line
    }, [isRemove])

    console.log(props)
    return (
        <div className="oneAssociation">

            <Title title="Évènement" />


            {/* Presentation associations */}
            <div className="row justify-content-center description-page">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Voici l'évènement que tu as choisis<br></br><br></br>
                        Tu peux t'y inscrire et participer au tchat privé de chacun des évènements auquels tu souhaites participer
                        <br></br><br></br>
                        Et sinon pour revenir à la page précédente, <i onClick={() => history.goBack()}>c'est ici</i> !
                    </p>
                </div>
                <div className="col-10 col-sm-7 col-md-5 col-lg-5 offset-xl-1 col-xl-4">
                    <img className="rocket-illustration" src={Illustration} alt="Men searching with binoculars" />
                </div>
            </div>


            {/* New Invitation */}
            {props.token.user && isParticipate && <div className="row justify-content-center">
                <button className="col-8 col-xl-3 btn-orangeFull my-5 py-4" onClick={() => history.push("/espace-client/nouvel-invitation/" + id)}>Lancer une invitation</button>
            </div>
            }

            {/* Number of Participants */}
            <div className="row justify-content-center">
                <button className="col-10 col-xl-6 my-5 py-4 btn-purpleOut">Il y a actuellement {event.numberOfParticipants} participant(s) à cet évènement</button>
            </div>

            {event !== null ?
                <div className="row justify-content-center">
                    <div className={`association-component col-10 col-sm-8 col-md-10 col-lg-11 col-xl-9 ${event.isPassed ? "isPassed" : ""}`}>
                        {event.isPassed && <div className="isPassedBrand">Fin</div>}

                        <div className="row max-md-flex-direction-column ">

                            <div className="offset-1 col-10 offset-lg-0 col-lg-7">
                                <h4>{event.title}</h4>
                                <p className="association-description">{event.description}</p>
                                <div className="d-flex max-sm-flex-direction-column mt-5 ">
                                    {(() => {
                                        if (isParticipate) {
                                            return <button className="col-12 offset-md-1 col-md-4  btn-redFull" onClick={handleRemoveParticipant}>Me désinscrire</button>
                                        } else {
                                            return <button className="col-12 offset-md-1 col-md-4 btn-orangeFull" onClick={addParticipationtUser}>Participer</button>
                                        }
                                    })()}


                                    <button className="col-12 offset-md-1 col-md-4 btn-turquoiseFull">Rejoindre le tchat</button>
                                </div>

                                {errorsParticipation.event && <div className="text-error mt-5">{errorsParticipation.event}</div>}
                                {errorsParticipation.user && <div className="text-error mt-5">{errorsParticipation.user}</div>}
                            </div>

                            <div className="col-1 hr"></div>

                            <div className="offset-1 col-10 offset-lg-0 col-lg-4 right-side">
                                <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                    <p>{event.location}</p>
                                </div>
                                <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16">
                                        <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg>
                                    <p>Commence le {dateFormat(event.startedAt, "d/mm, yyyy à HH:MM TT")}</p>
                                </div>
                                {event.type && <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-laptop" viewBox="0 0 16 16">
                                        <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                                    </svg>
                                    <p>{event.type}</p>
                                </div>
                                }
                                {event.organisation && <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                                        <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                                    </svg>
                                    <p>Organisation: {event.organisation}</p>
                                </div>
                                }
                                {event.admin && <div className="d-flex information">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z" />
                                    </svg>
                                    <p>Organisateur: {event.admin}</p>
                                </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                : <p className="geolocalisation-none">Désolé, aucun résultat n'a été trouvé</p>
            }


        </div >
    )
}

