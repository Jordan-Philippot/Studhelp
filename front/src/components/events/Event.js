import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Event(props) {
    const history = useHistory()

    return (
        <div>
            <li className="" onClick={() => history.push("/evenement/" + props.event.id)}>{props.event.title}</li>
        </div>
    )
}
