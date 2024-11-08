import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

const handleResfreshToken = async () => {
    const res = await instance.get("/api/v1/auth/refresh")
    if (res?.data) return res.data.access_token;
    else null
}

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

const NO_RETRY_HEADER = 'x-no-retry';

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response ? response.data : response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.config && error.response && +error.response.status === 401
        && !error.config.headers[NO_RETRY_HEADER]
    ) {
        const access_token = await handleResfreshToken();
        error.config.headers[NO_RETRY_HEADER] = 'true'
        if (access_token) {
            error.config.headers['Authorization'] = `Bearer ${access_token}`;
            localStorage.setItem("access_token", access_token)
            return instance.request(error.config);
        }
    }
    if (error.config && error.response && +error.response.status === 400
        && error.config.url === "/api/v1/auth/refresh"
    ) {
        const localhost = "http://localhost:3001/"
        if (window.location.href === localhost) {
            //
        }
        else {
            window.location.href = "/login"
        }
    }

    return error?.response?.data ?? Promise.reject(error);
});

export default instance;