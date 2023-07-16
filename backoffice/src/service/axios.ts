import axios, { type AxiosInstance } from "axios";
import { useStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import router from "@/router";
export const token = useStorage('access_token', '');
export const tokenAsAdmin = useStorage('access_token_admin', '');
export const appId = ref('');

const config = computed(() => {
    return {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
            "App-Id": "52915a91-cee2-4209-80cc-0667c44c439e"
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
