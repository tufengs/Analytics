# Vue.js Tracking SDK Documentation

## Security Note
This project was developed for educational purposes. It is important to note that sending SDK_APP_SECRET in the header of requests is not secure. In a production environment, it is recommended to have a backend service that adds the SDK_APP_SECRET to the requests made by the SDK. This prevents exposure of your APP_SECRET and ensures secure communication between your Vue.js application and the backend service.

## Introduction
This SDK allows you to track user activities in a Vue.js application. It includes tracking for different types of events such as click, mouse movement, navigation, drag and drop, keyboard input, and idle time. The SDK also includes a Vue.js directive for easy integration into your Vue.js components.

## Features

- Event Tracking: Supports various event types - click, mouse movement, navigation, drag and drop, keyboard input, and idle.
- Debounce Function: Controls the frequency of tracking for certain events.
- FingerprintJS: Implements FingerprintJS for visitor identification.
- Vue.js Directive: Provides a Vue.js directive for easy tracking integration into your components.

## Quick Start

First, install the SDK using npm:

```bash
npm install vue-sdk-analytics
```

Then, import the SDK into your Vue.js application:

```js
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import SDK from 'vue-sdk-analytics'

const app = createApp(App)

app.use(SDK, router, 
    {
        SDK_APP_ID: '<YOUR_APP_ID>',
        SDK_APP_SECRET: '<YOUR_APP_SECRET>',
        SDK_API_URL: '<YOUR_API_URL>',
        IDLE_TIMEOUT: 5 * 60 * 1000, // (Optional)
    },
    /* Below : Mouse movement tracking (Optional)*/ 
    {
        pages: [
            '/',
            '/about',
            '/user/*',
            '/settings',
        ]
    }
)

app.use(router)

app.mount('#app')
```

To use the tracking directive in a component:

```html
<button v-tracker="'click.BUTTON'">Click Me</button>
```

## Documentation

### SDK Options

The Options interface defines the following properties that are required for the SDK to function:

- `SDK_APP_ID`: Your application ID.
- `SDK_APP_SECRET`: Your application secret.
- `SDK_API_URL`: The API URL the SDK should use.
- `IDLE_TIMEOUT`: Optional. The timeout in milliseconds for idle event tracking. (Default: 15 minutes)

### EventEnum
The EventEnum enumeration lists the supported event types for tracking:

- `click`: Click event.
- `mouse`: Mouse movement event. (Automatically tracked when enabled with configuration)
- `navigation`: Page navigation event. (Automatically tracked)
- `drag`: Drag and drop event.
- `keyboard`: Keyboard input event.
- `idle`: Idle time event. (Automatically tracked)
- `hover`: Mouse hover event.

## Event Tracking: Mouse Movement
The SDK also tracks mouse movement events. This feature provides insight into how users interact with your web application, including where they move their mouse and what areas of the application they interact with the most.

The SDK includes an optional mouse movement tracking feature. When enabled, the SDK tracks the position of the user's mouse pointer as it moves across the screen. The SDK sends the X and Y coordinates of the mouse pointer to the API every 5 seconds, along with a timestamp. This frequency can be adjusted to suit your application's requirements.

In order to minimize the amount of data being sent and to provide a meaningful representation of user activity, the SDK groups mouse positions onto a 5px by 5px grid. This means that every point sent represents a block of 5 pixels in both the X and Y directions.

## Output

The SDK sends the following data to the API (YOUR_API_URL):

headers : 
```json
{
    "Content-Type": "application/json",
    "App-Id": "<YOUR_APP_ID>",
    "App-Secret": "<YOUR_APP_SECRET>",
},
```

body :
```json
{
    "event": "mouse",
    "tag": "TRACK",

    "data": [
        {
            "x": 1380,
            "y": 390,
            "value": 2
        },
        {
            "x": 1400,
            "y": 391,
            "value": 2
        },
        /* ... */
    ],
    
    "host": "localhost:5173",
    "path": "/",
    
    "sessionId": "<SESSION_ID>",
    "visitorId": "<VISITOR_ID>",

    "timestamp": "2023-07-12T13:02:54.139Z",
}
```