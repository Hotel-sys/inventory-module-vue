import ApiClient from "@/api";
import type { JwtPayload, LoginRequest, LoginResponse } from "../auth.types";
import StorageManager, { StorageKey } from "../../../lib/storage";


export async function login(payload: LoginRequest): Promise<LoginResponse> {
    try {
        const res = await ApiClient.post<JwtPayload>('/auth/login', payload);

        const { jwt, ...loginResponse } = res.data;

        StorageManager.save(StorageKey.TOKEN, JSON.stringify(jwt));
        return loginResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}