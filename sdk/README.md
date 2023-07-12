# Vue.js Tracking SDK Documentation

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

app.use(SDK, router, {
    SDK_APP_ID: '<YOUR_APP_ID>',
    SDK_APP_SECRET: '<YOUR_APP_SECRET>',
    SDK_API_URL: '<YOUR_API_URL>',
    IDLE_TIMEOUT: 5 * 60 * 1000, // Optional
})

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

- `click`
- `mouse`
- `navigation` (Automatically tracked)
- `drag`
- `keyboard`
- `idle` (Automatically tracked)
- `hover`

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
    "event": "keyboard",
    "tag": "INPUT",
    
    "host": "localhost:5173",
    "path": "/",
    
    "sessionId": "<SESSION_ID>",
    "visitorId": "<VISITOR_ID>",

    "timestamp": "2023-07-12T13:02:54.139Z",
}
```