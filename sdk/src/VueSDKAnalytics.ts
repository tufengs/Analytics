import { reactive } from 'vue';
import type { App, DirectiveBinding } from 'vue';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface Options {
    apiURL: string;
    apiKey: string;
    [key: string]: string; // Index signature
}

interface State {
    visitorId: string;
}

enum EventEnum {
    click = 'click',
    mouse = 'mouse',
    navigation = 'navigation',
    drag = 'drag',
    keyboard = 'keyboard',
}

export default {
    async install(app: App, options: Options) {

        const requiredOptions: string[] = ['apiURL', 'apiKey'];

        const missingOptions: string[] = requiredOptions.filter(option => !options[option]);

        if (missingOptions.length > 0) {
            throw new Error(`Missing required options: ${missingOptions.join(', ')}`);
        }

        const API: AxiosInstance = axios.create({
            baseURL: options.apiURL,
        });

        const fp = await FingerprintJS.load();
        const result = await fp.get();

        const state: State = reactive({
            visitorId: result.visitorId,
        });

        const sendEvent = async (eventName: string, tagName: string) => {
            try {
                console.log(
                    {
                        eventName,
                        tagName,
                        visitorId: state.visitorId,
                        apiKey: options.apiKey,
                        apiURL: options.apiURL,
                    }
                )
                await API.post('/api/events', {
                    eventName,
                    tagName,
                    visitorId: state.visitorId,
                    apiKey: options.apiKey,
                });
            } catch (error) {
                console.error(error);
            }
        };

        const handleEvent = (event: Event, tagName: string) => {
            sendEvent(event.type, tagName);
        };

        app.directive('tracker', {
            mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
                const [eventType, tagName] = binding.value.split('.');

                switch (eventType) {
                    case EventEnum.click:
                        el.addEventListener('click', (event) => handleEvent(event, tagName));
                        break;

                    case EventEnum.mouse:
                        el.addEventListener('mousemove', (event) => handleEvent(event, tagName));
                        break;

                    case EventEnum.navigation:
                        window.addEventListener('popstate', (event) => handleEvent(event, tagName));
                        break;

                    case EventEnum.drag:
                        el.addEventListener('dragstart', (event) => handleEvent(event, tagName));
                        el.addEventListener('dragend', (event) => handleEvent(event, tagName));
                        break;

                    case EventEnum.keyboard:
                        el.addEventListener('keydown', (event) => handleEvent(event, tagName));
                        break;

                    default:
                        console.warn(`Event type "${eventType}" is not supported`);
                }
            },
            beforeUnmount(el: HTMLElement, binding: DirectiveBinding<string>) {
                const [eventType] = binding.value.split('.');
                switch (eventType) {
                    case EventEnum.click:
                        el.removeEventListener('click', (event) => handleEvent(event, binding.value));
                        break;

                    case EventEnum.mouse:
                        el.removeEventListener('mousemove', (event) => handleEvent(event, binding.value));
                        break;

                    case EventEnum.navigation:
                        window.removeEventListener('popstate', (event) => handleEvent(event, binding.value));
                        break;

                    case EventEnum.drag:
                        el.removeEventListener('dragstart', (event) => handleEvent(event, binding.value));
                        el.removeEventListener('dragend', (event) => handleEvent(event, binding.value));
                        break;

                    case EventEnum.keyboard:
                        el.removeEventListener('keydown', (event) => handleEvent(event, binding.value));
                        break;

                    default:
                        console.warn(`Event type "${eventType}" is not supported`);
                }
            },
        });
    },
};
