import React, { useState, useEffect } from 'react';
// import Http from 'core/libs/http';
// import Events from 'core/libs/events'
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import './main.css';

import Navigation from './navigation/Navigation'
import Panels from './panels/Panels'
import Footer from './footer/Footer'
// import Profiles from 'core/libs/profiles'
// import Modal from 'components/common/modals/Modal'
// import Card from 'components/common/card/Card'


export default function Main() {
    // const http = new Http()
    // const [profiles, set_profiles] = useState(get_profiles())
    // const [events, set_events] = useState(get_events())
    // const [view_event_m, toggle_event_m] = useState(false)

    // // Callbacks for modal toggles (to be passed to child components)
    // const toggles = {
    //     event_modal: toggle_event_modal
    // }

    // // TODO: Eval if this action is performed twice
    // // useEffect(() => {
    // //     set_profile(get_profile())
    // //     set_events(get_events())
    // // }, []
    // // )

    // // TODO: Eval if possible to store profile & events in global objects
    // // TODO: instead of being passed down component order

    // function get_profiles() {
    //     // Http action
    //      // Get profile from server, if no profile, server will create new
        
    //     // TODO: Test only
    //      return new Profiles()
    // }

    // function get_events() {
    //     // Http action
    //     // Get events from server upon initial login or refresh (eval storing of events in user's page session)
        
    //     return new Events(profiles.current)
    // }

    // function toggle_event_modal() {
    //     toggle_event_m(!view_event_m)
    // }

    // Update profile from latest activities
        // If activity update found, launch interactive window
        // showing what has changed, like a 'quest' completion screen

    return (
        <div className='main'>
            <Navigation />
            <Panels />
            <Footer />
        </div>
    );
}