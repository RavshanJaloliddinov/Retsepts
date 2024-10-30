export declare interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export declare interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}