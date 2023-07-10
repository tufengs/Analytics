import { reactive } from 'vue';
import axios, { AxiosInstance } from 'axios';
import { App, DirectiveBinding } from 'vue';
import { Router, RouteLocationNormalized } from 'vue-router';
import _ from 'lodash';
import { Options } from '../interfaces/Options';
import { EventEnum } from '../enums/EventEnum';
import { SendEvent } from '../functions/SendEvent';

const options: Options = reactive({
    SDK_APP_ID: '',
    SDK_API_URL: '',
});

export let idleTimeout: number | null = null;

export const setIdleTimeout = (timeout: number | null) => {
    idleTimeout = timeout;
};

const API: AxiosInstance = axios.create({
    baseURL: options.SDK_API_URL,
});

const eventListeners: { [key: string]: (event: Event) => void } = {};

const _SDK = {
    install: (Vue: App, router: Router, _options: Options) => {

        const requiredOptions = Object.keys(options);

        const missingOptions = requiredOptions.filter((option) => !_options[option]);

        if (missingOptions.length > 0) {
            throw new Error(`Missing required options: ${missingOptions.join(', ')}`);
        }

        Object.assign(options, _options);

        idleTimeout = setTimeout(() => {
            SendEvent({ event: EventEnum.idle, tag: 'AFK' });
        }, options.IDLE_TIMEOUT ?? 15 * 60 * 1000);

        const debouncedRoute = _.debounce((to: RouteLocationNormalized) => {
            SendEvent({ event: EventEnum.navigation, tag: to.fullPath });
        }, 2000);

        router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
            if (to.fullPath !== from.fullPath)
                debouncedRoute(to);
        });

        Vue.directive('tracker', {
            mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
                const [event, tag] = binding.value.split('.');

                const debouncedEvent = _.debounce(() => {
                    SendEvent({ event, tag });
                }, 2000);

                eventListeners[binding.value] = () => {
                    debouncedEvent();
                };

                switch (event) {
                    case EventEnum.click:
                        el.addEventListener('click', eventListeners[binding.value]);
                        break;

                    case EventEnum.hover:
                        el.addEventListener('mouseleave', eventListeners[binding.value]);
                        break;

                    case EventEnum.mouse:
                        el.addEventListener('mousemove', eventListeners[binding.value]);
                        break;

                    case EventEnum.drag:
                        el.addEventListener('dragstart', eventListeners[binding.value]);
                        el.addEventListener('dragend', eventListeners[binding.value]);
                        break;

                    case EventEnum.keyboard:
                        el.addEventListener('keyup', eventListeners[binding.value]);
                        break;

                    default:
                        console.warn(`Event type "${event}" is not supported`);
                }
            },
            beforeUnmount(el: HTMLElement, binding: DirectiveBinding<string>) {
                if (idleTimeout !== null) {
                    clearTimeout(idleTimeout);
                }
                const [event] = binding.value.split('.');
                switch (event) {
                    case EventEnum.click:
                        el.removeEventListener('click', eventListeners[binding.value]);
                        delete eventListeners[binding.value];
                        break;

                    case EventEnum.mouse:
                        el.removeEventListener('mousemove', eventListeners[binding.value]);
                        delete eventListeners[binding.value];
                        break;

                    case EventEnum.drag:
                        el.removeEventListener('dragstart', eventListeners[binding.value]);
                        delete eventListeners[binding.value];
                        el.removeEventListener('dragend', eventListeners[binding.value]);
                        delete eventListeners[binding.value];
                        break;

                    case EventEnum.keyboard:
                        el.removeEventListener('keydown', eventListeners[binding.value]);
                        delete eventListeners[binding.value];
                        break;

                    default:
                        console.warn(`Event type "${event}" is not supported`);
                }
            },
        });
    },
};

export { _SDK, options, API, eventListeners };