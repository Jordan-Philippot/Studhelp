import axios from 'axios';

const url = process.env.REACT_APP_API_ENDPOINT;

const headersAuth = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ` + localStorage.getItem('studhelp')
};


// Get Conversations by user
export async function getConversationsByUser(setResponse, setLoaded) {
    await axios({
        method: "GET",
        url: url + "auth/conversationsByUser",
        headers: headersAuth,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.conversations)
                setLoaded(true)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}

// Get One Conversation by Id
export async function getConversation(setResponse, id) {
    await axios({
        url: url + "auth/conversation/" + id,
        headers: headersAuth
    })
        .then((response) => {
            if (response.data) {
                setResponse(response.data.conversation)
            } else {
                setResponse(false)
            }
        }, (err) => {
            setResponse(err)
        });
}
