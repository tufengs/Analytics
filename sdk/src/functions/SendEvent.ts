import { API, options } from "../components/_SDK";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { CheckIdle } from "./CheckIdle";


const SendEvent = async (data: { event: string, tag: string, data?: object | string | undefined }) => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const visitorId = result.visitorId;

    const obj = {
        ...data,

        visitorId,

        appId: options.SDK_APP_ID,
        appSecret: options.SDK_APP_SECRET,

        host: window.location.host,
        path: window.location.pathname,

        timestamp: new Date().toISOString(),
    };

    try {
        CheckIdle();

        await API.post('/api/events',
            { ...obj },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

    } catch (error) {
        console.error(error, obj);
    }
};

export { SendEvent };