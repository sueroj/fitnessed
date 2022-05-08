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



export default function Main() {
    const http = new Http()
    const [profiles, set_profiles] = useState(get_profiles())
    const [challenges, set_challenges] = useState(get_challenges())
    const [challenge_modal, set_challenge_modal] = useState(false)

    // Callbacks for modal toggles (to be passed to child components)
    const toggles = {
        challenge_modal: toggle_challenge_modal
    }

    // TODO: Eval if this action is performed twice
    // useEffect(() => {
    //     set_profile(get_profile())
    //     set_events(get_events())
    // }, []
    // )

    // // TODO: Eval if possible to store profile & events in global objects
    // // TODO: instead of being passed down component order

    function get_profiles() {
        // Http action
         // Get profile from server, if no profile, server will create new
        
        // TODO: Test only
         return new Profiles()
    }

    function get_challenges() {
        // Http action
        // Get challenges from server upon initial login or refresh (eval storing of challenge in user's page session)
        
        return new Challenges(profiles.user)
    }

    function toggle_challenge_modal() {
        set_challenge_modal(!challenge_modal)
    }

    // Update profile from latest activities
        // If activity update found, launch interactive window
        // showing what has changed, like a 'quest' completion screen

    return (
        <div className='main'>
            {/* Modals */}
            <ChallengeModal show={challenge_modal} />

            <Navigation profile={profiles.user} toggles={toggles}/>
            <Panels profiles={profiles} challenges={challenges} toggles={toggles}/>
            <Footer toggles={toggles}/>
        </div>
    );
}