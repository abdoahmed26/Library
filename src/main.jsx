import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
    </Provider>
  </React.StrictMode>,
)
