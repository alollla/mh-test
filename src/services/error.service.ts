import TokenService from "@/services/token.service";

function handleError(error: any) {
    console.error(error);
    TokenService.updateLocalRefreshToken("");
    TokenService.updateLocalAccessToken("");
}

const ErrorService = {
    handleError,
};

export default ErrorService;