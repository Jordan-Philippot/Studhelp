import axios from 'axios';

const url = "http://localhost:8000/api/";

const headersAuth = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('studhelp')
};
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
};

// Get Events
export async function getEvents(setResponse, setLoading, latitude, longitude, perimeter, searchBar) {
    await axios({
        method: "POST",
        url: url + "events",
        headers: headers,
        data: {
            'lat': latitude,
            'lng': longitude,
            'perimeter': perimeter,
            "searchBar": searchBar
        }
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.nearMe)
                setLoading(false)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}

// Get One Event
export async function getEvent(setResponse, id) {
    await axios({
        url: url + "event/" + id,
        headers: headers
    })
        .then((response) => {
            if (response.data) {
                setResponse(response.data.event)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}

// Get Events by User
export async function getEventsByUser(setResponse, setLoading) {
    await axios({
        url: url + "auth/eventsByUser",
        headers: headersAuth
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.myevents)
                setLoading(false)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}