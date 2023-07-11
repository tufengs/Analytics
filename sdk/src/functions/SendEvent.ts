import { API, options } from "../components/_SDK";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { CheckIdle } from "./CheckIdle";


const SendEvent = async (data: { event: string, tag: string }) => {
    try {

        CheckIdle();

        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const visitorId = result.visitorId;

        await API.post('/api/events',
            {
                ...data,
                visitorId,
                appId: options.SDK_APP_ID,
                timestamp: new Date().toISOString(),
                path: window.location.pathname,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

    } catch (error) {
        console.error(error);
    }
};

export { SendEvent };