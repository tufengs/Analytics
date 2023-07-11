import { options, setIdleTimeout } from "../components/_SDK";
import { SendEvent } from "./SendEvent";
import { EventEnum } from "../enums/EventEnum";

const CheckIdle = () => {
    let idleTimeout: number | null = null;

    if (idleTimeout !== null) {
        clearTimeout(idleTimeout);
        idleTimeout = null;
    }

    idleTimeout = setTimeout(() => {
        SendEvent({ event: EventEnum.idle, tag: 'idle' });
    }, options.IDLE_TIMEOUT);

    setIdleTimeout(idleTimeout);
};

export { CheckIdle };