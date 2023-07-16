export interface UserI {
    id: string
    email: string
    company: string
    kbis: string
    role: string
    phoneNumber: string
    baseUrl: string
    application: ApplicationI
}

export interface CurrentUserI {
    email: string
    role: "WEBMASTER"
    sub: "2ef722ee-f961-4c87-96a2-f5c0dff30fc2"
}

export interface ApplicationI {
    id: string
    userId: string
    user: UserI
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
