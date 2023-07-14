import { debounce, size } from 'lodash';
import { reactive } from '@vue/reactivity';
import { sendEvent } from '../functions/SendEvent';
import { EventEnum } from '../enums/EventEnum';

const eventPositions: { [tag: string]: { x: number, y: number }[] } = reactive({})
const events = ['mousemove', 'click', 'touchstart']

const debounceMouse = debounce((event) => {
  if (!eventPositions[event.type])
    eventPositions[event.type] = [];

  eventPositions[event.type].push(
    {
      x: +event.offsetX ?? 0,
      y: +event.offsetY ?? 0,
    }
  )
}, 3)

const debouncePosition = debounce(() => {
  if (Object.keys(eventPositions).length) {
    for (const [key, value] of Object.entries(eventPositions)) {
      if (!value.length) continue;

      sendEvent({
        event: EventEnum.mouse,
        tag: key,
        data: compressPoints(value),
      }).then(() => {
        delete eventPositions[key];
      })

    }
  }
}, 2000)

const getZoomRatio = () => {
  let zoom: number = 1;

  if (window.devicePixelRatio !== undefined) {
    zoom = +window.devicePixelRatio.toFixed(2);
  }

  return zoom;
}

const MouseTracker = () => {

  events.map((event) => {
    window.addEventListener(event, debounceMouse);
  })

  setInterval(() => {
    debouncePosition();
  }, 5000);
}

const StopMouseTracker = () => {
  events.map((event) => {
    window.removeEventListener(event, debounceMouse);
  })
}

function compressPoints(points: { x: number, y: number }[]) {
  const compressed: { x: number, y: number, value: number }[] = [];

  const grid: number = 5;

  for (let i = 0; i < points.length; i++) {
    const zoom = getZoomRatio();
    let { x, y } = points[i];

    x *= zoom;
    y *= zoom;

    const adjustedPoint = {
      x: Math.round(x / grid) * grid,
      y: Math.round(y / grid) * grid,
    };

    const existingPoint = compressed.find(p =>
      p.x === adjustedPoint.x &&
      p.y === adjustedPoint.y
    );

    if (existingPoint) {
      existingPoint.value++;
    } else {
      compressed.push({ ...adjustedPoint, value: 1 });
    }
  }

  return compressed;
}

function sizeof(object: any) {
  const stringifiedObject = JSON.stringify(object);
  const sizeInBytes = size(stringifiedObject);

  return sizeInBytes
}

export { MouseTracker, StopMouseTracker };