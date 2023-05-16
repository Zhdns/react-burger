const BASE_URL = 'https://norma.nomoreparties.space/api'
export const REGISTRATION_IRL = 'https://norma.nomoreparties.space/api/auth/register'
export const LOGIN_URL = 'https://norma.nomoreparties.space/api/auth/login'
export const LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout'
export const REFRESHTOKEN_URL = 'https://norma.nomoreparties.space/api/auth/token'


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