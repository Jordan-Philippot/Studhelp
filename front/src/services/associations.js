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

// Get Profile
export async function getAssocs(setResponse, latitude, longitude, perimeter) {
    await axios({
        method: "POST",
        url: url + "getassociations",
        headers: headers,
        data: {
            'lat': latitude,
            'lng': longitude,
            'perimeter': perimeter
        }
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.nearMe)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}
