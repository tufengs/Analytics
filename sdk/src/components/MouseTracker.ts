import { debounce } from 'lodash';
import { reactive } from '@vue/reactivity';
import { sendEvent } from '../functions/SendEvent';
import { EventEnum } from '../enums/EventEnum';

const mousePositions: object[] = reactive([])

const debounceMouse = debounce((event) => {
  mousePositions.push({
    x: event.clientX,
    y: event.clientY,
  })
}, 200)
window.addEventListener('mousemove', debounceMouse)

const debounceMousePosition = debounce(() => {
  if (mousePositions.length) {
    sendEvent({
      event: EventEnum.mouse,
      tag: 'move',
      data: mousePositions,
    })
      .then(
        () => mousePositions.splice(0, mousePositions.length)
      )
  }
}, 2000)

setInterval(() => {
  debounceMousePosition();
}, 5000);