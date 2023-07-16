import { debounce, size } from 'lodash';
import { reactive } from '@vue/reactivity';
import { sendEvent } from '../functions/SendEvent';
import { compressPoints } from '../functions/CompressPoints';
import { EventEnum } from '../enums/EventEnum';
import type { Router } from 'vue-router';

const eventPositions: { [tag: string]: { x: number, y: number }[] } = reactive({})
const events: { [key: string]: string } = { mousemove: "MOUSE-TRACKER", click: "CLICK-TRACKER", touchstart: "TOUCH-TRACKER", scroll: "SCROLL-TRACKER" }

const debounceMouse = debounce((event) => {
  if (!eventPositions[event.type])
    eventPositions[event.type] = [];

  eventPositions[event.type].push(
    {
      x: +event.offsetX ?? 0,
      y: +event.offsetY ?? 0,
    }
  )
}, 1)

const debouncePosition = () => {
  if (Object.keys(eventPositions).length) {
    for (const [key, value] of Object.entries(eventPositions)) {
      if (!value.length) continue;

      sendEvent({
        event: key,
        tag: events[key],
        data: compressPoints(value),
      }).then(() => {
        delete eventPositions[key];
      })

    }
  }
}

const MouseTracker = (_router: Router) => {

  _router.beforeEach(() => {
    debouncePosition();
  });

  Object.keys(events).map((event) => {
    window.addEventListener(event, debounceMouse);
  })

  setInterval(() => {
    debouncePosition();
  }, 5000);
}

const StopMouseTracker = () => {
  Object.keys(events).map((event) => {
    window.removeEventListener(event, debounceMouse);
  })
}

export { MouseTracker, StopMouseTracker };