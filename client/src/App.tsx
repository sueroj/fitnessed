/*App.tsx
  Used for app login and routing
*/
import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import axios from 'axios'

import Http from 'core/libs/http'
import Main from 'components/Main'
import Login from 'components/Login'
import StravaId from 'core/objects/strava_id'
import Navigation, { LoginNavigation } from 'components/navigation/Navigation'
// import { STRAVA_DEV_ONLY_AUTH_STATE } from 'config/tokens'
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI, STRAVA_TOKEN_URI, STRAVA_DEV_ONLY_AUTH_STATE, TC_SERVER_URL } from 'config/tokens'


export default function App() {
  const http = new Http()
  const [login_status, set_login_status] = useState(false)
  const [loading, set_loading] = useState(false)
  const [strava_id, set_strava_id] = useState(new StravaId())

  let url = new URLSearchParams(document.location.search)
  let state = url.get('state')
  let error = url.get('error')

  // TODO: Debug Only
  console.log('[TC] Load App (ignore second load via React.StrictMode)')

  if (!login_status && state !== null && !loading ) {
    get_auth()
  } else if (!login_status) {
    get_from_session()
  }

  function get_from_session() {
    let success = strava_id.set_from_session(sessionStorage.getItem('session_strava_id'))
    if (success) {
      set_login_status(true)
    }
  }

  function get_auth() {
    console.log('[Login:check_auth] Start')
    if (error === 'access_denied') {
        console.log('[Login] API access denied. Possible user auth decline')
        // TODO: DEV ONLY AUTH . MUST BE CHANGES TO SECURE LOGIN HASH 
        // TODO: Eval refactor for better error handling / Likely need resolution for API server error
    } else if (state === STRAVA_DEV_ONLY_AUTH_STATE && login_status === false) {
        let auth_code = get_auth_code()
        if (auth_code) {
            set_loading(true)

            http.get_strava_id(auth_code)
            .then((response) => { strava_id.set_from_strava(response.data) })
            .then(() => {
              sessionStorage.setItem('session_expire', (Date.now() + 3.6e+6).toString())
              sessionStorage.setItem('session_strava_id', JSON.stringify(strava_id))
              set_login_status(true)
              set_loading(false)
            })
            .catch((err) => { console.log("[Http:get_strava_id] error caught:", err) })
        }
    }
  }

  function get_auth_code() {
    let auth_code = url.get('code')
    if (!auth_code) {
      console.log('[Login] Error reading Strava auth code')
    }
    return auth_code
  }

  return (
    <BrowserRouter>
      <Container fluid>
        <Routes>
          <Route path='/' element={<LoginNavigation />} />
          <Route index element={login_status && !loading ? <Main strava_id={strava_id} /> : <Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
