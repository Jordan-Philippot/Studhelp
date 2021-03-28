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

// Check Token
export async function checkUser(setResponse) {
    await axios({
        method: "GET",
        url: url + 'auth/user',
        headers: headersAuth
    })
        .then((response) => {
            // Send response for check token 
            if (response.data) {
                setResponse(response.data)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}

// Get Profile
export async function getProfile(setResponse) {
    await axios({
        method: "GET",
        url: url + 'auth/profile',
        headers: headersAuth
    })
        .then((response) => {
            // Send response for check token 
            if (response.data) {
                setResponse(response.data.profile)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}


export async function setUserProfile(data, setErrors, setSuccess) {
    await axios({
        method: "post",
        url: url + 'auth/setprofile',
        headers: headersAuth,
        data: data
    })
        .then(function (response) {
            // console.log(response)
            if (response.data.errors) {
                setErrors(response.data.errors)

            } else if (typeof response.data.email !== 'undefined' && response.data.email === 'change') {
                setSuccess("email");
            } else {
                setSuccess("success");

            }
        }, (err) => {
            alert(err)
        });
}

// Get Profile
export async function getAssocs(setResponse, latitude, longitude) {
    await axios({
        method: "POST",
        url: url + "getassociations",
        headers: headers,
        data: {
            'lat': latitude,
            'lng': longitude
        }
    })
        .then((response) => {
            // Send response for check token 
            if (response) {
                setResponse(response.data)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}

//______________________GEOLOCALISATION______________________ 
// export async function getGeoInfo(setCity) {
//     await axios({
//         method: 'POST',
//         url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU'
//     })
//         .then((response) => {
//             setCity(response.data);
//         })
// };

// export async function getGeopositionInfo(setCity, latitude, longitude) {
//     await axios({
//         method: 'GET',
//         url: 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude + '&zoom=18&addressdetails=1'
//     })
//         .then((response) => {
//             setCity(response.data);
//         })
// };
//______________________GOOGLE DISTANCE BETWEEN 2 COORDONATE______________________ 

export async function getDistance(setDistance, latitude, longitude) {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + latitude + ',' + longitude + '&destinations=' + (latitude + 2) + ',' + (longitude + 25) + '&key=AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU')
        setDistance(response.data);
    } catch (err) {
        throw new Error('Unable to get a token, or get a valid coordonates')
    }
};
