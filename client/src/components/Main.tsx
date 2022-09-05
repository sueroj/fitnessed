import React, { useState, useEffect } from 'react';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import './main.css';
import { Button } from 'react-bootstrap'

import Navigation from 'components/navigation/Navigation'
import Panels from 'components/panels/Panels'
import Footer from 'components/footer/Footer'
import ChallengeModal from 'components/common/modals/ChallengeModal'
// import Card from 'components/common/card/Card'

import Http from 'core/libs/http';
import Profiles from 'core/libs/profiles'
import Profile from 'core/objects/profile'
import StravaId from 'core/objects/strava_id'
import Challenges from 'core/libs/challenges'

type Props = {
    strava_id: StravaId
}

// TODO: TEST - Run manual exploration test checkout cycle
// TODO: EVAL - check out many times states are being updated. Check useState() with functions/class inits, etc
export default function Main(props: Props) {
    const http = new Http()
    const [loading, set_loading] = useState(true)
    const [profiles, set_profiles] = useState(new Profiles())
    const [challenges, set_challenges] = useState(new Challenges())
    const [leaderboard, set_leaderboard] = useState({})
    const [challenge_modal, set_challenge_modal] = useState(false)

    // Callbacks for modal toggles (to be passed to child components)
    const toggles = {
        challenge_modal: toggle_challenge_modal
    }

    // TODO: IMPLEMENT SESSIONS
    useEffect(() => {
        if (!profiles.user) {
            let success = get_from_session()
            if (!success) {
                get_profiles()
                get_challenges()
                get_leaderboard()
            }
        }
    })

    function get_from_session() {
        profiles.set_from_session(sessionStorage.getItem('session_profile'))
        challenges.set_from_session(sessionStorage.getItem('session_challenges'))
        if (profiles.user && challenges.get_status()) {
            return true
        } else return false
    }

    // Validate challenges are loaded upon profile state update. 
    // Required because profile can load before challenges, causing issues with loading/login
    useEffect(() => {
        if (profiles.user && challenges.get_status()) {
            set_loading(false)
        }
    }, [challenges, profiles])

    function get_profiles() {
        // Http action
        // Get profile from server, if no profile, server will create new
        

        http.get_profile(props.strava_id.account_id)
        .then(response => { profiles.user = new Profile().create_from_json(response.data) })
        .then(() => {
            sessionStorage.setItem('session_profile', JSON.stringify(profiles.user))
        })
        console.log('[Main:get_profiles] profiles ', profiles)

    }

    function get_challenges() {
        // Http action
        // Get challenges from server upon initial login or refresh (eval storing of challenge in user's page session)

        console.log('[Main:get_challenges] START')
        http.get_challenges()
        .then(response => { challenges.initialize(response.data) })
        .then(() => { 
            sessionStorage.setItem('session_challenges', JSON.stringify(challenges)) })
            // set_loading(false) })
        console.log('[Main:get_challenges] challenges ', challenges)
    }

    function get_leaderboard() {
        // Http action
        // Get leaderboard profiles from server

        console.log('[Main:get_leaderboard] START')
        http.get_leaderboard()
        .then(response => { set_leaderboard(response.data) })
        .then(() => { 
            // sessionStorage.setItem('session_challenges', JSON.stringify(challenges))
            set_loading(false) })
        console.log('[Main:get_leaderboard] ', leaderboard)
    }

    function toggle_challenge_modal() {
        set_challenge_modal(!challenge_modal)
    }
    

    // Update profile from latest activities
        // If activity update found, launch interactive window
        // showing what has changed, like a 'quest' completion screen
    return (
        <React.StrictMode>
            { loading || !profiles.user ? <p>loading</p> :
                <div className='main'>
                <Navigation strava_id={props.strava_id} profile={profiles.user} toggles={toggles} />
                <Panels profiles={profiles} challenges={challenges} toggles={toggles}/>
                <Footer toggles={toggles}/>
                </div>
            }
        </React.StrictMode>
    );
}