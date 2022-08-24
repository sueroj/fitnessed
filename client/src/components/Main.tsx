import React, { useState, useEffect } from 'react';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import './main.css';

import Navigation from 'components/navigation/Navigation'
import Panels from 'components/panels/Panels'
import Footer from 'components/footer/Footer'
import ChallengeModal from 'components/common/modals/ChallengeModal'
// import Card from 'components/common/card/Card'

import Http from 'core/libs/http';
import Profiles from 'core/libs/profiles'
import Profile from 'core/objects/profile'
import Challenges from 'core/libs/challenges'

type Props = {
    strava_id: any
}

export default function Main(props: Props) {
    const http = new Http()
    const [loading, set_loading] = useState(true)
    const [profiles, set_profiles] = useState(new Profiles())
    const [challenges, set_challenges] = useState(new Challenges())
    const [challenge_modal, set_challenge_modal] = useState(false)

    // Callbacks for modal toggles (to be passed to child components)
    const toggles = {
        challenge_modal: toggle_challenge_modal
    }

    // TODO: IMPLEMENT SESSIONS
    useEffect(() => {
        if (!profiles.user) {
            get_profiles()
            get_challenges()
        }

    })

    function get_profiles() {
        // Http action
        // Get profile from server, if no profile, server will create new
        
        set_loading(true)
        http.get_profile(props.strava_id.account_id)
        .then(response => { profiles.user = new Profile(response.data) })
        .then(() => { set_loading(false) })
    }

    function get_challenges() {
        // Http action
        // Get challenges from server upon initial login or refresh (eval storing of challenge in user's page session)
        console.log('[Main:get_challenges] START')
        set_loading(true)
        http.get_challenges()
        .then(response => { challenges.initialize(response.data, profiles.user) })
        .then(() => { set_loading(false) })
        console.log('[Main:get_challenges] challenges ', challenges)
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