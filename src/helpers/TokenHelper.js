
export class TokenHelper {
    static getToken(request, response, next) {
        request.accessToken = request.headers.authorization.split(' ')[1];
        next();
    }
}
