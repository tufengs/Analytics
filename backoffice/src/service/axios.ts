import axios, { type AxiosInstance } from "axios";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import router from "@/router";
export const token = useStorage('access_token', '');

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
