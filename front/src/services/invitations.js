import axios from 'axios';

const url = process.env.REACT_APP_API_ENDPOINT;

const headersAuth = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('studhelp')
};


// Add participation for current user
export async function getUsers(eventId, setResponse, setLoading, latitude, longitude, perimeter, searchBar, orderBy) {
    await axios({
        method: "POST",
        url: url + "auth/getAllUsers",
        headers: headersAuth,
        data: {
            'eventId': eventId,
            'lat': latitude,
            'lng': longitude,
            'perimeter': perimeter,
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
