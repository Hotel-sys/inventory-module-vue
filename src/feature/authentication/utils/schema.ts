import { z } from "zod";
import type { Config } from "@/components/auto-form";


export const loginSchema = z.object({
    email: z.string().email("The email field is required").describe("Email"),
    senha: z.string().min(6, "Passwords have a minimum of 6 characters")
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const loginFieldConfig: Config<TLoginSchema> = {
    email: {
        label: "Email",
        inputProps: {
            type: 'email'
        }
    },
    senha: {
        label: "Password",
        inputProps: {
            type: 'password'
        }
    }
}
