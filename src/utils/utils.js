
const BASE_URL = 'https://norma.nomoreparties.space/api'
const ERROR403 = 'Error: 403'



function checkResponse(res) {
    if(res.ok) { 
        return res.json()
    }
    else {
        throw { status: res.status, message: `Error: ${res.status}` };
        // Promise.reject(`Error: ${res.status}`)
    }
}

export function request(endpoint, options) {
    const url = `${BASE_URL}${endpoint}`;
    return fetch(url, options).then(checkResponse);
}


export function checkAccess (error, action) {
    if (error === ERROR403) {
        return action()
    } else {
        console.log(`Get access: ${error}`)
        
    }
}