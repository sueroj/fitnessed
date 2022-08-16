import axios from 'axios'

import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI, STRAVA_TOKEN_URI, STRAVA_DEV_ONLY_AUTH_STATE, TC_SERVER_URL } from 'config/tokens'
import StravaId from 'core/objects/strava_id'

// TODO: Consider implement job/query queue to avoid spaming DBand APIs
export default class Http {
    public strava_server_status = true

//     // HTTP PUT action

//     // HTTP POST action


    public async get_profile(strava_id: StravaId) {
        console.log('[Http:get_profile] start')
        let json = await axios.get(`${TC_SERVER_URL}/profile/${strava_id.account_id}`)
        console.log('[Http:get_profile] Response recieved, profile:', json)
        return json.data
    }

// TODO: clean up. Eval try catch here
    public get_auth() {
        console.log('[Http:get_auth] redirect to Strava')
        try {
            window.location.href = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&approval_prompt=force&scope=activity:read&state=${STRAVA_DEV_ONLY_AUTH_STATE}`
        }
        catch (e) {
        }
        return new Promise((resolve) => setTimeout(resolve, 2000))
    }

    // TODO: Imeplement security
    public async get_auth_key() {
        console.log('[Http:gen_auth_key] start')
        let json = await axios.get(`${TC_SERVER_URL}/new_auth`)
        return json
    }

    public get_strava_id(auth_code: string) {
        
        let response = axios.post(STRAVA_TOKEN_URI, {
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            code: auth_code,
            grant_type: "authorization_code"
          })
            .then((response) => {
                console.log('[Http:get_strava_id] response recieved, strava_id:', response)
                return new StravaId().set_from_strava(response)
            })
            .catch((err) => {
                console.log("[Http:get_strava_id] error caught:", err)
            })
        return response
    }

}