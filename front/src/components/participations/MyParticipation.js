import React from 'react'
import { useHistory } from 'react-router-dom'

export default function MyParticipation(props) {
    const history = useHistory()

    return (
        <div className={`association-component col-10 col-sm-8 col-md-5 col-lg-5 col-xl-5 ${props.event.isPassed ? "isPassed" : ""}`}>
            {props.event.isPassed && <div className="isPassedBrand">Fin</div>}
            <h4>{props.event.title}</h4>
            <div className="d-flex justify-content-center address">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <p>{props.event.location}</p>
            </div>
            <button className="btn btn-turquoiseOut" onClick={() => history.push("/evenement/" + props.event.id)}>Voir l'évènement</button>
        </div>
    )
}
