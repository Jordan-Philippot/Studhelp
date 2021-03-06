import axios from 'axios';

const url = process.env.REACT_APP_API_ENDPOINT;

const headersAuth = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('studhelp')
};
// const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
// };

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
