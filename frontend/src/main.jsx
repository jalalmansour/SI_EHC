import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './redux/store.js'
import './assets/styles/globals.css'
import './App.css'
import {setupInterceptors} from "./services/axios.js";
import { App as AntdApp} from 'antd';

setupInterceptors(); // no dispatch here, only attaches interceptors once

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <AntdApp>
          <App />
        </AntdApp>
    </Provider>
  </React.StrictMode>
)

// Signal to index.html loader that the app is ready to display
// Do this on the next frame to ensure initial paint is committed
requestAnimationFrame(() => {
  try {
    window.dispatchEvent(new Event('app-ready'))
  } catch (e) {
    // Fallback: directly add the class if events are blocked
    document.body.classList.add('app-loaded')
  }
})
