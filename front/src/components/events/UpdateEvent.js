import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import { getEvent, updateMyEvent } from '../../services/events.js'
import { TimelineMax } from 'gsap'
import DateTimePicker from 'react-datetime-picker';

import Illustration from '../../images/User/Profile/workspace_solid.png'
import Humaaans from '../../images/User/Profile/Humaaans.png'
import Humaaans2 from '../../images/User/Profile/Humaaans2.png'

import Title from './../Title'

export default function UpdateEvent() {
    let { id } = useParams();

    const [myEvent, setMyEvent] = useState([])

    // My event informations form 
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startedAt, setStartedAt] = useState(null)
    const [duration, setDuration] = useState("")
    const [organisation, setOrganisation] = useState("")
    const [location, setLocation] = useState("")


    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState("")


    const data = {
        "id": id,
        "type": type,
        "title": title,
        "description": description,
        "startedAt": startedAt,
        "duration": duration,
        "organisation": organisation,
        "location": location
    }

    // Get profile
    useEffect(() => {
        getEvent(setMyEvent, id)
    }, [])


    // put event in input
    useEffect(() => {
        if (myEvent) {
            setType(myEvent.type)
            setTitle(myEvent.title)
            setDescription(myEvent.description)
            setStartedAt(myEvent.startedAt)
            setDuration(myEvent.duration)
            setOrganisation(myEvent.organisation)
            setLocation(myEvent.location)
        }
    }, [myEvent])

    // A rajouter !!! existe plus success popup -> successProfile
    useEffect(() => {
        if (success === "success") {
            setSuccess("")
            window.location.href = '/espace-client/mes-evenements?event=updateEvent'
        }
        // eslint-disable-next-line
    }, [success])

    const HandleUpdateEvent = () => {
        updateMyEvent(data,setSuccess, setErrors)
    }

    return (
        <div className="profile">



            <img className="humaaans" src={Humaaans} alt="caracter standing" />
            <img className="humaaans2" src={Humaaans2} alt="caracter standing" />

            <Title title={"Modifier mon Évènement"} />

            <div className="row justify-content-center mt-5">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4">
                    <p>
                        Modifie à tout moment les informations de ton évènement dans cet espace.<br></br>
                        Tu souhaites modifier la date ou encore l'endroit? Aucun soucis, tout les participants recevront une notification &#128521;
                    </p>


                    <p> <i> Stud'help s'engage à n'exploiter aucune données à des fins commerciales et n'utilise aucun traceur.</i><br></br>
                        Tes informations sont uniquement utilisées par Stud'help pour que d'autres utilisateurs
                        puissent intéragir avec toi.<br></br><br></br>
                        Pour toute question, le <b>support</b> reste disponible 7j/7.
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
                                    value={title || ""}
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
                                    value={description || ""}
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
                                    value={type || ""}
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
                                        value={duration || ""}
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
                                        value={organisation || ""}
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
                                    value={startedAt || ""}
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
                                    value={location || ""}
                                    required
                                    maxLength="255"
                                    minLength="3"
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                {errors.location && <span className="text-error">{errors.location}</span>}
                            </div>


                            <button className="btn-turquoiseOut my-5" onClick={HandleUpdateEvent}>Modifier</button>

                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}
