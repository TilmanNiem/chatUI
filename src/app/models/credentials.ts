export interface Credentials {
    email: string;
    password: string;
}

export interface LoginResponse extends Credentials {
    token: string
}