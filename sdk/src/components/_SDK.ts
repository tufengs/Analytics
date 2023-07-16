import { reactive } from '@vue/reactivity';
import { debounce } from 'lodash';
import { EventEnum } from '../enums/EventEnum';
import { sendEvent } from '../functions/SendEvent';
import { checkIdle, clearIdleTimeout } from '../functions/Idle';
import { MouseTracker, StopMouseTracker } from './MouseTracker';

import type { App, DirectiveBinding } from 'vue';
import type { Router } from 'vue-router';
import type { Options } from '../interfaces/Options';

const config: Options = reactive({
    SDK_APP_ID: '',
    SDK_APP_SECRET: '',
    SDK_API_URL: '',
    IDLE_TIMEOUT: 15 * 60 * 1000,
});

const eventListeners: { [key: string]: (event: Event) => void } = {};

const _SDK = {
    install: (Vue: App, _router: Router, _config: Options, _options?: any) => {

        const requiredOptions = ['SDK_APP_ID', 'SDK_APP_SECRET', 'SDK_API_URL'];
        const missingOptions = requiredOptions.filter((option) => !_config[option]);

        if (missingOptions.length > 0) {
            throw new Error(`Missing required options: ${missingOptions.join(', ')}`);
        }

        Object.assign(config, _config);

        _router.afterEach((to) => {
            StopMouseTracker()

            if (_options?.trackMouse) {
                if (_options.trackMouse.includes(to.path))
                    MouseTracker(_router)
            }

            if (_options?.trackChange) {
                for (const route of _options.trackChange) {
                    if (route.to === to.path) {
                        sendEvent({
                            event: EventEnum.navigation,
                            tag: route.tag,
                        });
                    }
                }
            }
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

export { _SDK, config };