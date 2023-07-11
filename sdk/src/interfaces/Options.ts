export interface Options {
    SDK_APP_ID: string;
    SDK_APP_SECRET: string;
    SDK_API_URL: string;
    IDLE_TIMEOUT?: number;
    [key: string]: string | number | undefined;
}