import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'react-bootstrap/NavLink';
import './navigation.css';

import Profile from 'core/objects/profile'

type Props = {
    strava_id: any
    profile: Profile
    toggles: object
}

export default function Navigation(props: Props) {
    const [modal, set_modal] = useState(false)

    function toggle_modal() {
        set_modal(!modal)
    }

    return (
        <>
        {/* <Modal show={modal}/> */}

        <div className='navigation-bar'>
                <Link href="/">TopChallenger</Link>
                <Link onClick={() => toggle_modal()}>User Guide</Link>
                <Link onClick={() => toggle_modal()}>Rankings</Link>
                <Link onClick={() => toggle_modal()}>Statistics</Link>
            <div className='nav-fill'></div>
            <div className='nav-profile'>
                <span>{props.profile.firstname}</span>
                <Image className="nav-img" src={props.strava_id.img} alt='change this' roundedCircle />
                {/* <Image className="nav-img" src={user.athlete.profile_medium} alt={user.athlete.firstname} roundedCircle /> */}
                </div>
            </div>
        </>
        // TODO: Hidden Maintenance Banner
    );
}

type LoginNavigationProps = {
  // TODO: Eval required props
}
export function LoginNavigation(props: LoginNavigationProps) {
    const [modal, set_modal] = useState(false)

    function toggle_modal() {
        set_modal(!modal)
    }

    return (
        <>
            {/* <Modal show={modal}/> */}
            <div className='navigation-bar'>
                <Link href="/">TopChallenger</Link>
                <Link onClick={() => toggle_modal()}>User Guide</Link>
                <Link onClick={() => toggle_modal()}>Rankings</Link>
                <div className='nav-fill'></div>
            </div>
        </>
        // TODO: Hidden Maintenance Banner
    );
}