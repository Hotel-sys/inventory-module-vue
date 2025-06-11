import { useMutation, type UseMutationReturnType } from "@tanstack/vue-query";
import type { LoginRequest, LoginResponse } from "../auth.types";
import { login } from "../service/auth.post";

export const AUTH_MUTATION_KEYS = {
    LOGIN_WITH_EMAIL: 'login-user-with-email'
} as const;


export function useSignInWithEmail(): UseMutationReturnType<LoginResponse, unknown, LoginRequest, void> {
    return useMutation({
        mutationKey: [AUTH_MUTATION_KEYS.LOGIN_WITH_EMAIL],
        mutationFn: login
    })
}