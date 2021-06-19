import axios from 'axios';

const url = process.env.REACT_APP_API_ENDPOINT;

const headersAuth = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('studhelp')
};

// Add participation for current user
export async function addParticipation(data, setResponse, setErrors) {
    await axios({
        method: "POST",
        url: url + "auth/addParticipation",
        headers: headersAuth,
        data: data
    })
        .then((response) => {
            if (response.data.errors) {
                setErrors(response.data.errors)
            } else {
                setResponse(response.data.success)
            }
        }, (err) => {
            setResponse(err)
        });
}

// Get Participants for current event
export async function getParticipants(eventId, setResponse) {
    await axios({
        method: "POST",
        url: url + "auth/getParticipants",
        headers: headersAuth,
        data: {
            "eventId": eventId
        }
    })
        .then((response) => {
            setResponse(response.data.participate)
        }, (err) => {
            setResponse(false)
        });
}

// Get Participants for current event
export async function removeParticipant(eventId, setResponse) {
    await axios({
        method: "POST",
        url: url + "auth/removeParticipant",
        headers: headersAuth,
        data: {
            "eventId": eventId
        }
    })
        .then((response) => {
            setResponse(response.data.remove)
        }, (err) => {
            setResponse(false)
        });
}

// Get Profile
export async function getMyParticipations(setResponse, setLoading) {
    await axios({
        method: "GET",
        url: url + 'auth/getMyParticipations',
        headers: headersAuth
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.myParticipations)
                setLoading(false)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}
