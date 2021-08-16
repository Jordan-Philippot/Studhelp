import axios from 'axios';

const url = process.env.REACT_APP_API_ENDPOINT;

const headersAuth = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('studhelp')
};

export async function SendMessage(data, setSuccess, setErrors) {
    await axios({
        method: "post",
        url: url + 'auth/sendMessage',
        headers: headersAuth,
        data: data
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
