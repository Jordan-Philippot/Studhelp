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
export async function getAssocs(setResponse, setLoading, latitude, longitude, perimeter, searchBar) {
    await axios({
        method: "POST",
        url: url + "associations",
        headers: headers,
        data: {
            'lat': latitude,
            'lng': longitude,
            'perimeter': perimeter,
            "searchBar" : searchBar
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
