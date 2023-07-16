import axios, { type AxiosInstance } from "axios";
import { useStorage } from "@vueuse/core";
import { computed, ref } from "vue";

export const token = useStorage('access_token', '');
export const tokenAsAdmin = useStorage('access_token_admin', '');
export const appId = useStorage('app_id', '');

const config = computed(() => {
    return {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
        }
    }
});

const configFormData = computed(() => {
    return {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
});

const client: AxiosInstance = axios.create(config.value);

const clientWithoutAuth: AxiosInstance = axios.create(config.value);

const clientFormData: AxiosInstance = axios.create(configFormData.value);

client.interceptors.request.use(
    (config: any) => {
        config.headers.Authorization = `Bearer ${token.value ? token.value : ''}`;
        config.headers['App-Id'] = appId.value;
        return config;
    }
);

clientFormData.interceptors.request.use(
    function (config: any) {
        config.headers.Authorization = `Bearer ${token.value ? token.value : ''}`;
        return config;
    }
);

export { client, clientWithoutAuth, clientFormData };
