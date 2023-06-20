const BASE_URL: string = 'https://norma.nomoreparties.space/api';

class APIError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

function checkResponse(res: Response): Promise<any> {
    if(res.ok) { 
        return res.json()
    }
    else {
        throw new APIError(res.status, `Error: ${res.status}`);
    }
}

export function request(endpoint: string, options?: RequestInit): Promise<any> {
    const url: string = `${BASE_URL}${endpoint}`;
    return fetch(url, options).then(checkResponse);
}