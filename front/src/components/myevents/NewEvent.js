import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { newEvent } from '../../services/events.js'
import DateTimePicker from 'react-datetime-picker';

import Illustration from '../../images/Home/process_outline.png'
import Humaaans from './../../images/User/Profile/Humaaans.png'
import Humaaans2 from './../../images/User/Profile/Humaaans2.png'

import Title from '../Title'

export default function NewEvent() {
    // Data
    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [startedAt, setStartedAt] = useState("")
    const [duration, setDuration] = useState("")
    const [organisation, setOrganisation] = useState("")
    const [location, setLocation] = useState("")

    // Response 
    const [response, setResponse] = useState([])
    const [errors, setErrors] = useState([])

    const history = useHistory()


    const data = {
        "title": title,
        "type": type,
        "description": description,
        "startedAt": startedAt,
        "duration": duration,
        "organisation": organisation,
        "location": location,
    }

    const createEvent = () => {
        newEvent(data, setResponse, setErrors)
    }

    useEffect(() => {
        if (response === "success") {
            window.location.href = '/espace-client/mes-evenements?event=create'
        }
    }, [response])

    console.log(startedAt)
    return (
        <div className="profile">
            <img className="humaaans" src={Humaaans} alt="caracter standing" />
            <img className="humaaans2" src={Humaaans2} alt="caracter standing" />

            <Title title="Créer un Évènement" />

            <div className="row justify-content-center mt-5">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4">
                    <p>
                        Créer ton propre évènement et invite les personnes de ton choix !<br></br><br></br>
                        Libe à toi de choisir le type de ton évènement, l'adresse ou encore la date (hier ne sera pas accepté &#128540;)
                        <br></br><br></br>
                        Et sinon pour revenir à la page précédente, <i onClick={() => history.goBack()}>c'est ici</i> !
                    </p>
                </div>
                <div className="col-8 col-sm-5 col-md-5 col-lg-5 offset-xl-1 col-xl-4">
                    <img className="workspace-illustration" src={Illustration} alt="Poste de travail" />
                </div>
            </div>


            <div className="row justify-content-center">

                <div className="col-11 col-md-10 col-lg-8 col-xl-6 profileForm">

                    <div className="row justify-content-center">
                        <div className="col-10">

                            <div className="flex-direction-column">
                                <label htmlFor="title">Titre de l'évènement </label>
                                <input type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    required
                                    maxLength="255"
                                    minLength="3"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {errors.title && <span className="text-error">{errors.title}</span>}
                            </div>

                            <div className="flex-direction-column">
                                <label htmlFor="description">Description </label>
                                <input type="textarea"
                                    name="description"
                                    id="description"
                                    value={description}
                                    required
                                    maxLength="255"
                                    minLength="3"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <span className="text-error">{errors.description}</span>}
                            </div>

                            <div className="flex-direction-column">
                                <label htmlFor="type">Type </label>
                                <input type="text"
                                    name="type"
                                    id="type"
                                    value={type}
                                    required
                                    maxLength="255"
                                    minLength="3"
                                    onChange={(e) => setType(e.target.value)}
                                />
                                {errors.type && <span className="text-error">{errors.type}</span>}
                            </div>


                            <div className="d-flex">
                                <div className="col-lg-5">
                                    <label htmlFor="duration">Durée</label>
                                    <input type="text"
                                        name="duration"
                                        id="duration"
                                        maxLength="5"
                                        value={duration}
                                        required
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                    {errors.duration && <span className="text-error">{errors.duration}<br></br></span>}
                                </div>
                                <div className="offset-2 col-5">
                                    <label htmlFor="organisation">Organisation</label>
                                    <input type="text"
                                        name="organisation"
                                        id="organisation"
                                        value={organisation}
                                        maxLength="255"
                                        required
                                        onChange={(e) => setOrganisation(e.target.value)}
                                    />
                                    {errors.organisation && <span className="text-error">{errors.organisation}</span>}
                                </div>
                            </div>


                            <div className="flex-direction-column">
                                <label htmlFor="startedAt">Date</label>
                                <DateTimePicker
                                    name={"startedAt"}
                                    id="startedAt"
                                    className={"dateTimePicker"}
                                    // format={"commence le d-MM-y  à hh:mm"}
                                    value={startedAt}
                                    required={true}
                                    minDate={new Date()}
                                    onChange={(e) => setStartedAt(e)}
                                />

                                {errors.startedAt && <span className="text-error">{errors.startedAt}</span>}
                            </div>

                            <div className="flex-direction-column">
                                <label htmlFor="location">Adresse de l'évènement </label>
                                <input type="text"
                                    name="location"
                                    id="location"
                                    value={location}
                                    required
                                    maxLength="255"
                                    minLength="3"
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                {errors.location && <span className="text-error">{errors.location}</span>}
                            </div>


                            <button className="btn-turquoiseOut my-5" onClick={createEvent}>Créer</button>

                        </div>

                    </div>
                </div>
            </div>

        </div >

    )
}
