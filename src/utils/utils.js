const BASE_URL = 'https://norma.nomoreparties.space/api'


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