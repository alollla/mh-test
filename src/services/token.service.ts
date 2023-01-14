import cookies from '@/services/cookie.service'

function getLocalRefreshToken () {
    return cookies.get('refresh_token');
}

function getLocalAccessToken () {
    return cookies.get('access_token');
}

function updateLocalRefreshToken (token:string) {
    return cookies.set('refresh_token', token);
}

function updateLocalAccessToken (token:string) {
    return cookies.set('access_token', token);
}

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    updateLocalRefreshToken,
};

export default TokenService;