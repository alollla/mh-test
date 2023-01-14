import axios from "axios";
import TokenService from "@/services/token.service";

const instance = axios.create({
    baseURL: "http://rest-test.machineheads.ru"
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            // @ts-ignore
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/token-generate" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await instance.post("/auth/token-refresh", {
                        refresh_token: TokenService.getLocalRefreshToken(),
                    });

                    const { access_token, refresh_token } = rs.data;
                    TokenService.updateLocalAccessToken(access_token);
                    TokenService.updateLocalRefreshToken(refresh_token);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;

