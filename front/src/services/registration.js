import axios from 'axios';

const url = process.env.REACT_APP_API_ENDPOINT;
const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:8000/',
    'Content-Type': 'application/json'
};

// Login
export async function loginUser(setResponse, setErrors, email, password) {
    await axios({
        method: 'POST',
        url: url + 'login_check',
        headers: headers,
        data: {
            "email": email,
            "password": password
        }
    })
        .then((response) => {
            // Send response for check token 
            setResponse(response.data);
        }, (err) => {
            if (err.response.status) {
                setErrors(err.response.data);
            }
        });
}

// Login
export async function registerUser(setSuccess, setErrors, data) {
    await axios({
        method: 'POST',
        url: url + 'register',
        headers: headers,
        data: data
    })
        .then((response) => {
            if (response.data.errors) {
                setErrors(response.data.errors)

            } else {
                setSuccess("success");
            }
        }, (err) => {
            if (err.response.status) {
                setErrors(err.response.data);
            }
        });
}

export async function GoogleAuth(tokenId, setSuccess, setErrors) {
    await axios({
        method: "post",
        url: url + 'googleAuth',
        headers: headers,
        data: {
            'tokenId': tokenId
        }
    })
        .then(function (response) {
            if (response.data.errors) {
                setErrors(response.data.errors)
            } else {
                setSuccess(response);
            }
        }, (err) => {
            setErrors(err)
        });
}