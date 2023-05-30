const BASE_URL = 'https://norma.nomoreparties.space/api'
const ERROR401 = 'Error: 401'


function checkResponse(res) {
    if(res.ok) { 
        return res.json()
    }
    else {
        return Promise.reject(`Error: ${res.status}`)
    }
}

export function request(endpoint, options) {
    const url = `${BASE_URL}${endpoint}`;
    return fetch(url, options).then(checkResponse);
}


export function checkAccess (error, action) {
    if (error === ERROR401) {
        return action()
    } else {
        console.log("Get access")
    }
}