import axios from 'axios';

const url = "http://localhost:8000/api/";

const headersAuth = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('studhelp')
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
                setResponse(response.data)
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
        url: url + 'auth/setsmallprofile',
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