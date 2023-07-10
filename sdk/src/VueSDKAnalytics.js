import { reactive } from 'vue';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const EventEnum = {
    click: "click",
    mouse: "mouse",
    navigation: "navigation",
    drag: "drag",
    keyboard: "keyboard",
    connection: "connection",
};

const EnvRequirements = ['SDK_API_URL', 'SDK_API_KEY'];

const checkEnvRequirements = () => {
    EnvRequirements.forEach((v) => {
        if (!process.env[v]) {
            console.error(`The ${v} environment variable is not defined!`);
        }
    });
};

export default {
    async install(app, options) {

        if (options.apiKey) {
            EnvRequirements.splice(EnvRequirements.indexOf('SDK_API_KEY'), 1);
        }

        checkEnvRequirements();

        const API = axios.create({
            baseURL: process.env.SDK_API_URL || "http://localhost:3000",
        });

        app.config.globalProperties.$apiKey = options.apiKey || process.env.SDK_API_KEY;

        const fp = await FingerprintJS.load();
        const result = await fp.get();

        const state = reactive({
            visitorId: result.visitorId,
        });

        const sendEvent = async (eventName, tagName) => {
            try {
                await API.post('/api/events', {
                    eventName,
                    tagName,
                    visitorId: state.visitorId,
                    apiKey: app.config.globalProperties.$apiKey,
                });
            } catch (error) {
                console.error(error);
            }
        };

        app.directive("tracker", {
            mounted(el, binding) {
                const [eventType, tagName] = binding.value.split(".");

                const handleEvent = (event) => {
                    sendEvent(event.type, tagName);
                };

                switch (eventType) {
                    case EventEnum.click:
                        el.addEventListener("click", handleEvent);
                        break;

                    case EventEnum.mouse:
                        el.addEventListener("mousemove", handleEvent);
                        break;

                    case EventEnum.navigation:
                        window.addEventListener("popstate", handleEvent);
                        break;

                    case EventEnum.drag:
                        el.addEventListener("dragstart", handleEvent);
                        el.addEventListener("dragend", handleEvent);
                        break;

                    case EventEnum.keyboard:
                        el.addEventListener("keydown", handleEvent);
                        break;

                    default:
                        console.warn(`Event type "${eventType}" is not supported`);
                }
            },
            beforeUnmount(el, binding) {
                const [eventType] = binding.value.split(".");
                switch (eventType) {
                    case EventEnum.click:
                        el.removeEventListener("click", handleEvent);
                        break;

                    case EventEnum.mouse:
                        el.removeEventListener("mousemove", handleEvent);
                        break;

                    case EventEnum.navigation:
                        window.removeEventListener("popstate", handleEvent);
                        break;

                    case EventEnum.drag:
                        el.removeEventListener("dragstart", handleEvent);
                        el.removeEventListener("dragend", handleEvent);
                        break;

                    case EventEnum.keyboard:
                        el.removeEventListener("keydown", handleEvent);
                        break;

                    default:
                        console.warn(`Event type "${eventType}" is not supported`);
                }
            },
        });
    },
};
