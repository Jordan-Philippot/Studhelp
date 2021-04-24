import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getEvent } from '../../services/events'

export default function OneEvent() {
    const [event, setEvent] = useState([])

    let { id } = useParams();
    console.log(id)
    useEffect(() => {
        getEvent(setEvent, id)
        console.log(event)
    }, [])
    return (
        <div>
            {event.title && event.title}
        </div>
    )
}
