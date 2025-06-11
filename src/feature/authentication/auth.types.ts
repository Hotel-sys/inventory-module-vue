
export interface JwtPayload {
    jwt: string;
    user: any;
    message: string;
}


export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse extends Pick<JwtPayload, 'user'|'message'> {}