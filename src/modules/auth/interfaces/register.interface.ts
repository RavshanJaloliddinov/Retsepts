export declare interface RegisterRequest {
    fullName: string;
    email: string;
    phone: string;
}

export declare interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}