import axios from 'axios';

const url = process.env.REACT_APP_API_ENDPOINT;

const headersAuth = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('studhelp')
};


// Add participation for current user
export async function getUsers(eventId, setResponse, setLoading, latitude, longitude, searchBar, orderBy) {
    await axios({
        method: "POST",
        url: url + "auth/getAllUsers",
        headers: headersAuth,
        data: {
            'eventId': eventId,
            'lat': latitude,
            'lng': longitude,
            "searchBar": searchBar,
            "orderBy": orderBy
        }
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.users)
                setLoading(false)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}

// Update my Event
export async function sendInvitationUser(data, setResponse, setErrors) {
    await axios({
        method: "POST",
        url: url + "auth/sendInvitation",
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

export async function removeInvitationUser(data, setResponse) {
    await axios({
        method: "POST",
        url: url + "auth/removeInvitation",
        headers: headersAuth,
        data: data
    })
        .then((response) => {
            setResponse(response.data.success)
        }, (err) => {
            setResponse(err)
        });
}

export async function acceptInvitationUser(data, setResponse) {
    await axios({
        method: "POST",
        url: url + "auth/acceptInvitation",
        headers: headersAuth,
        data: data
    })
        .then((response) => {
            setResponse(response.data.success)
        }, (err) => {
            setResponse(err)
        });
}

// Add participation for current user
export async function getMyInvitations(setResponse, setLoading) {
    await axios({
        method: "GET",
        url: url + "auth/getMyInvitations",
        headers: headersAuth,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data)
                setLoading(false)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}

