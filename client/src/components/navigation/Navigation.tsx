import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'react-bootstrap/NavLink';
import './navigation.css';
import test_banner from 'assets/banners/test_banner.png'

import Modal from 'components/common/modals/Modal'
import Profile from 'core/objects/profile'

type Props = {
    profile: Profile
}

export default function Navigation(props: Props) {
    const [modal, set_modal] = useState(false)

    function toggle_modal() {
        set_modal(!modal)
    }

    return (
        <>
        <Modal show={modal}/>

        <div className='navigation-bar'>
                <Link href="/">TopChallenger</Link>
                <Link onClick={() => toggle_modal()}>User Guide</Link>
                <Link onClick={() => toggle_modal()}>Rankings</Link>
                <Link onClick={() => toggle_modal()}>Statistics</Link>
            <div className='nav-fill'></div>
            <div className='nav-profile'>
                <span>{props.profile.firstname}</span>
                <Image className="nav-img" src={test_banner} alt='change this' roundedCircle />
                {/* <Image className="nav-img" src={user.athlete.profile_medium} alt={user.athlete.firstname} roundedCircle /> */}
                </div>
            </div>
        </>
        // TODO: Hidden Maintenance Banner
    );
}