import axios from 'axios';

const url = toString(process.env.REACT_APP_API_ENDPOINT);

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
export async function getAssocs(setResponse, setLoading, latitude, longitude, perimeter, searchBar, orderBy) {
    await axios({
        method: "POST",
        url: url + "associations",
        headers: headers,
        data: {
            'lat': latitude,
            'lng': longitude,
            'perimeter': perimeter,
            "searchBar" : searchBar,
            "orderBy": orderBy
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

// Get One Assoc by Id
export async function getAssoc(setResponse, id) {
    await axios({
        url: url + "association/" + id,
        headers: headers
    })
        .then((response) => {
            if (response.data) {
                setResponse(response.data.assoc)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}
