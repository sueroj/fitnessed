import axios from 'axios'

import { MAPBOX_TOKEN, MAPBOX_STATIC_URL, STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI, STRAVA_TOKEN_URI, STRAVA_DEV_ONLY_AUTH_STATE, TC_SERVER_URL } from 'config/tokens'
import StravaId from 'core/objects/strava_id'
import Profile from 'core/objects/profile'
import mock_strava_id from 'test/mocks/mock_strava_id.json'
import { GeoJSON } from 'core/objects/misc'

// TODO: Consider implement job/query queue to avoid spaming DBand APIs
export default class Http {
    public strava_server_status = true

    // HTTP PUT actions



    // HTTP POST actions

    public post_test_challenge(challenge: any) {
        return axios.post(`${TC_SERVER_URL}/new_challenge`, {
            'headers': {
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: JSON.stringify(challenge)
        })
    }

    public post_test_profile(profile: any) {
        return axios.post(`${TC_SERVER_URL}/new_profile`, {
            'headers': {
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: JSON.stringify(profile)
        })
    }

    // HTTP GET actions
    
    public get_profile(strava_id: number) {
        return axios.get(`${TC_SERVER_URL}/profile/${strava_id}`)
    }

    public get_challenges() {
        return axios.get(`${TC_SERVER_URL}/challenges`)
    }

    public get_leaderboard() {
        return axios.get(`${TC_SERVER_URL}/leaderboard`)
    }

    public get_map_static_img(start_coords: GeoJSON) {
        return axios.get(`${MAPBOX_STATIC_URL}/${start_coords.lng},${start_coords.lat},5,0/300x200?access_token=${MAPBOX_TOKEN}`)
    }

    public get_activities(token: string, _before: number, _after: number) {
        return axios.get((`https://www.strava.com/api/v3/athlete/activities`), {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                before: _before,
                after: _after
            }
        })
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
        let json = await axios.get(`${TC_SERVER_URL}/new_auth`)
        return json
    }

    public get_strava_id(auth_code: string) {
        // TODO: dev only, remove mock
        // let response = mock_strava_id
        
        return axios.post(STRAVA_TOKEN_URI, {
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            code: auth_code,
            grant_type: "authorization_code"
          })
    }

}