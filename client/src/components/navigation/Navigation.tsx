// TODO: toggleAboutModal() fix
// TODO: setProfile()
import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import './navigation.css';

// import Profile from 'core/objects/profile'
import test_banner from 'assets/banners/test_banner.png'
import Link from 'react-bootstrap/NavLink';

type Props = {
    // profile: {
    //     id: number,
    //     firstname: string,
    //     lastname: string,
    //     profile_img: string
    // }
}

export default function Navigation(props: Props) {
    const [viewModal, toggleModal] = useState(false)
    // const [profile, setProfile] = useState(props.profile)

    function toggleAboutModal() {
        toggleModal(!viewModal)
    }
    
    // const toggleAboutModal = () => {
    //     toggleModal(!viewModal);
    // }

    return (
        <>
        {/* <AboutModal show={viewModal}/> */}

        <div className='navigation-bar'>
                <Link href="/">Proof</Link>
                <Link onClick={() => toggleAboutModal()}>User Guide</Link>
                <Link onClick={() => toggleAboutModal()}>Rankings</Link>
                <Link onClick={() => toggleAboutModal()}>Statistics</Link>
            <div className='nav-fill'></div>
            <div className='nav-profile'>
                {/* TODO: Finish */}
                <span>Joel</span>
                {/* <span>{props.profile.firstname}</span> */}
                <Image className="nav-img" src={test_banner} alt='change this' roundedCircle />
                {/* <Image className="nav-img" src={user.athlete.profile_medium} alt={user.athlete.firstname} roundedCircle /> */}
                </div>
            </div>
        </>
        // TODO: Hidden Maintenance Banner
    );
}