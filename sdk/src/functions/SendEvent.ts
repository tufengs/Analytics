import { options } from "../components/_SDK";
import { load as fpLoad, } from '@fingerprintjs/fingerprintjs';
import { checkIdle } from "./Idle";
import axios from "axios";

const sendEvent = async (data: { event: string, tag: string, data?: object | string | undefined }) => {
    try {
        const fp = await fpLoad();
        const result = await fp.get();
        const visitor_id = result.visitorId;

        const session_id = sessionStorage.getItem('session_id') || generateSessionId();
        sessionStorage.setItem('session_id', session_id);

        const obj = {
            ...data,

            visitor_id,

            session_id,

            host: window.location.host,
            path: window.location.pathname,

            timestamp: new Date().toISOString(),
        };

        checkIdle();

        await axios.post(`${options.SDK_API_URL}`,
            { ...obj },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'App-Id': options.SDK_APP_ID,
                    'App-Secret': options.SDK_APP_SECRET,
                },
            }
        );

    } catch (error) {
        console.error(error);
    }
};

const generateSessionId = () => {
    let res = '';
    for (let i = 0; i < 3; i++)
        res += Math.random().toString(36).substring(2, 15);
    return res;
};

export { sendEvent };