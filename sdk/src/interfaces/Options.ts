export interface Options {
    SDK_APP_ID: string;
    SDK_API_URL: string;
    IDLE_TIMEOUT?: number | null;
    [key: string]: string | number | null | undefined;
}