import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { getEvent } from '../../services/events'
import { addParticipation, getParticipants, removeParticipant } from '../../services/user'

import Illustration from '../../images/Associations/product_launch.png'
import Title from '../Title'
import dateFormat from 'dateformat';

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
        if (!props.token.user) {
            window.location.href = "/connexion"
        } else {
            addParticipation(data, setResponseParticipation, setErrorsParticipation)
        }
    }

    useEffect(() => {
        if (responseParticipation === "success") {
            window.location.href = "/evenement/" + id + "?event=addParticipation"
        }
    }, [responseParticipation])

    const handleRemoveParticipant = () => {
        removeParticipant(data, setIsRemove)
    }

    useEffect(() => {
        console.log(isRemove)
        if (isRemove) {
            window.location.href = "/evenement/" + id + "?event=removeParticipation"
        }
    }, [isRemove])
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-textarea-t" viewBox="0 0 16 16">
                                        <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z" />
                                    </svg>
                                    <p>Organisation: {event.organisation}</p>
                                </div>
                                }
                                {event.admin && <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-textarea-t" viewBox="0 0 16 16">
                                        <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z" />
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

