import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { store } from './redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="160999596857-rdqkeihktbu76t3cc8ps9hoacb5gj2qn.apps.googleusercontent.com">
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
