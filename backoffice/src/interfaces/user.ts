export interface UserI {
    id: string
    email: string
    company: string
    kbis: string
    role: string
    phoneNumber: string
    baseUrl: string
}

export interface CreateUserI {
    email: string
    password: string
    company: string
    baseUrl: string
}

export interface UpdateUserI {
    email: string
    password: string
    company: string
    kbis: string
    phoneNumber: string
    websiteUrl: string
}

export interface LoginUserI {
    email: string
    password: string
}

export interface PasswordForgotUserI {
    email: string
}
