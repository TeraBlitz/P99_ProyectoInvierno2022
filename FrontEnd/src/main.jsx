import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Auth0Provider
        domain="dev-0c7l137a.auth0.com"
        clientId="JkLqnIILVcazmfCezRETzzrkn5BCXpZv"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://dev-0c7l137a.auth0.com/api/v2/",
          // scope: "read:current_user update:current_user_metadata"
        }}
      >
        <App />
    </Auth0Provider>
  </React.StrictMode>,
)
