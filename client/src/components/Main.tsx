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
import Challenges from 'core/libs/challenges'
import StravaId from 'core/objects/strava_id'


type Props = {
    strava_id: any
}

export default function Main(props: Props) {
    const http = new Http()
    const [profiles, set_profiles] = useState(get_profiles())
    const [challenges, set_challenges] = useState(get_challenges())
    const [challenge_modal, set_challenge_modal] = useState(false)

    // Callbacks for modal toggles (to be passed to child components)
    const toggles = {
        challenge_modal: toggle_challenge_modal
    }

    // useEffect(() => {
    //     if (!profiles.user) {
    //       // TODO: Experiment w/ alternatives
    //       if (Object.hasOwn(strava_id, 'firstname')) {
    //         sessionStorage.setItem('session_expire', (Date.now() + 3.6e+6).toString())
    //         sessionStorage.setItem('session_strava_id', JSON.stringify(strava_id))
    //         set_login_status(true)
    //         set_loading(false)
    //       }
    //     }
    //   }, [loading, strava_id]
    //   )


    function get_profiles() {
        // Http action
        // Get profile from server, if no profile, server will create new

        let profiles = new Profiles()
        profiles.load_current_user(props.strava_id)
        console.log(profiles)
        return profiles
    }

    function get_challenges() {
        // Http action
        // Get challenges from server upon initial login or refresh (eval storing of challenge in user's page session)
        
        // return new Challenges(profiles.current)
    }

    function toggle_challenge_modal() {
        set_challenge_modal(!challenge_modal)
    }

    // Update profile from latest activities
        // If activity update found, launch interactive window
        // showing what has changed, like a 'quest' completion screen

    return (
        <React.StrictMode>
            <div className='main'>
                <button onClick={() => get_profiles()} />
                {/* <Navigation strava_id={props.strava_id} profile={profiles.current} toggles={toggles}/>
                <Panels profiles={profiles} challenges={challenges} toggles={toggles}/>
                <Footer toggles={toggles}/> */}
            </div>
        </React.StrictMode>
    );
}