import { options } from "../components/_SDK";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { checkIdle } from "./Idle";
import axios from "axios";

const sendEvent = async (data: { event: string, tag: string, data?: object | string | undefined }) => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const visitorId = result.visitorId;

    const sessionId = sessionStorage.getItem('sessionId') || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('sessionId', sessionId);

    const obj = {
        ...data,

        visitorId,

        sessionId,

        host: window.location.host,
        path: window.location.pathname,

        timestamp: new Date().toISOString(),
    };

    try {
        checkIdle();

        await axios
            .post(`${options.SDK_API_URL}/api/events`,
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

export { sendEvent };