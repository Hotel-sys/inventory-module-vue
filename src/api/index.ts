import StorageManager, { StorageKey } from "@/lib/storage"
import router from "@/router";
import axios from "axios"

const ApiClient = axios.create<any>({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL ?? 'http://localhost:8080',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
})

ApiClient.interceptors.request.use((config) => {
    const ACCESS_TOKEN = StorageManager.retrieve(StorageKey.TOKEN);

    return {
        ...config,
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }
});

ApiClient.interceptors.response.use((config) => {
    if (config.status === 401 || config.status === 403) {
        router.push('/error/resource-not-found')
    }

    return config;
})

export default ApiClient;


// ONLY AN EXAMPLE FOR TESTING.
export const ExampleApiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
})