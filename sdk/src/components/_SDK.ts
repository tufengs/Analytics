import { reactive } from '@vue/reactivity';
import { debounce } from 'lodash';
import { EventEnum } from '../enums/EventEnum';
import { sendEvent } from '../functions/SendEvent';
import { checkIdle, clearIdleTimeout } from '../functions/Idle';
import { MouseTracker, StopMouseTracker } from './MouseTracker';

import type { App, DirectiveBinding } from 'vue';
import type { Router, RouteLocationNormalized } from 'vue-router';
import type { Options } from '../interfaces/Options';

const options: Options = reactive({
    SDK_APP_ID: '',
    SDK_APP_SECRET: '',
    SDK_API_URL: '',
    IDLE_TIMEOUT: 15 * 60 * 1000,
});

//const router: Router = reactive(null);
let router: Router | null = null;

const eventListeners: { [key: string]: (event: Event) => void } = {};

const _SDK = {
    install: (Vue: App, _router: Router, _options: Options, _mouseTrackingOptions?: any) => {

        router = _router;

        if (!router) {
            console.warn('Router is not specified');
            return;
        }

        const requiredOptions = ['SDK_APP_ID', 'SDK_APP_SECRET', 'SDK_API_URL'];

        const missingOptions = requiredOptions.filter((option) => !_options[option]);

        if (missingOptions.length > 0) {
            throw new Error(`Missing required options: ${missingOptions.join(', ')}`);
        }

        Object.assign(options, _options);

        const debouncedRoute = debounce(
            ({ to, from, tag }: { to: RouteLocationNormalized, from: RouteLocationNormalized, tag: string }) => {
                sendEvent({
                    event: EventEnum.navigation,
                    tag: tag,
                    data: {
                        to: to.fullPath,
                        from: from.fullPath,
                    },
                });
            }, 2000);

        _router.afterEach((to, from) => {
            StopMouseTracker()
            if (_mouseTrackingOptions?.pages) {
                if (_mouseTrackingOptions.pages.includes(_router.currentRoute.value.path))
                    MouseTracker()
            }
            if (to.fullPath !== from.fullPath)
                debouncedRoute({ to, from, tag: 'change' });
        })

        checkIdle();


        Vue.directive('tracker', {
            mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
                const event = binding.arg;

                if (!event) {
                    console.warn('Event type is not specified');
                    return;
                }

                for (const tag in binding.modifiers) {
                    const debouncedEvent = debounce(() => {
                        sendEvent({ event, tag });
                    }, 2000);

                    eventListeners[tag] = () => {
                        debouncedEvent();
                    };

                    switch (event) {
                        case EventEnum.click:
                            el.addEventListener('click', eventListeners[tag]);
                            break;

                        case EventEnum.hover:
                            el.addEventListener('mouseenter', eventListeners[tag]);
                            break;

                        case EventEnum.mouse:
                            el.addEventListener('mousemove', eventListeners[tag]);
                            break;

                        case EventEnum.drag:
                            el.addEventListener('dragstart', eventListeners[tag]);
                            el.addEventListener('dragend', eventListeners[tag]);
                            break;

                        case EventEnum.keyboard:
                            el.addEventListener('keyup', eventListeners[tag]);
                            break;

                        default:
                            console.warn(`Event type "${event}" is not supported`);
                    }
                }
            },
            beforeUnmount(el: HTMLElement, binding: DirectiveBinding<string>) {
                clearIdleTimeout();

                const event = binding.arg;

                if (!event) {
                    console.warn('Event type is not specified');
                    return;
                }

                for (const tag in binding.modifiers) {
                    switch (event) {
                        case EventEnum.click:
                            el.removeEventListener('click', eventListeners[tag]);
                            delete eventListeners[tag];
                            break;

                        case EventEnum.mouse:
                            el.removeEventListener('mousemove', eventListeners[tag]);
                            delete eventListeners[tag];
                            break;

                        case EventEnum.drag:
                            el.removeEventListener('dragstart', eventListeners[tag]);
                            delete eventListeners[tag];
                            el.removeEventListener('dragend', eventListeners[tag]);
                            delete eventListeners[tag];
                            break;

                        case EventEnum.keyboard:
                            el.removeEventListener('keydown', eventListeners[tag]);
                            delete eventListeners[tag];
                            break;

                        default:
                            console.warn(`Event type "${event}" is not supported`);
                    }
                }
            },
        });
    },
};

export { _SDK, options, router };