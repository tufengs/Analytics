import { options } from "../components/_SDK";
import { sendEvent } from "./SendEvent";
import { EventEnum } from "../enums/EventEnum";

let idleTimeout: number | null = null;

const setIdleTimeout = (timeout: number | null) => {
    idleTimeout = timeout;
};

const clearIdleTimeout = () => {
    if (idleTimeout !== null) {
        clearTimeout(idleTimeout);
        idleTimeout = null;
    }
};

const checkIdle = () => {

    if (idleTimeout !== null) {
        clearTimeout(idleTimeout);
        idleTimeout = null;
    }

    idleTimeout = setTimeout(() => {
        sendEvent({ event: EventEnum.idle, tag: 'AFK' });
    }, options.IDLE_TIMEOUT);

    setIdleTimeout(idleTimeout);
};

export { checkIdle, clearIdleTimeout };