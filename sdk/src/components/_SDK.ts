import { reactive } from '@vue/reactivity';
import { debounce } from 'lodash';
import { EventEnum } from '../enums/EventEnum';
import { sendEvent } from '../functions/SendEvent';
import { checkIdle, clearIdleTimeout } from '../functions/Idle';

import type { App, DirectiveBinding } from 'vue';
import type { Router, RouteLocationNormalized } from 'vue-router';
import type { Options } from '../interfaces/Options';

const options: Options = reactive({
    SDK_APP_ID: '',
    SDK_APP_SECRET: '',
    SDK_API_URL: '',
    IDLE_TIMEOUT: 15 * 60 * 1000,
});

const eventListeners: { [key: string]: (event: Event) => void } = {};

const _SDK = {
    install: (Vue: App, router: Router, _options: Options) => {

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

        router.afterEach((to, from) => {
            if (to.fullPath !== from.fullPath)
                debouncedRoute({ to, from, tag: 'change' });
        })

        checkIdle();

        Vue.directive('tracker', {
            mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
                const [event, tag] = binding.value.split('.');

                const debouncedEvent = debounce(() => {
                    sendEvent({ event, tag });
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
                clearIdleTimeout();

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

export { _SDK, options };