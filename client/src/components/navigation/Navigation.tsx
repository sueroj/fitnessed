import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'react-bootstrap/NavLink';
import './navigation.css';

import Profile from 'core/objects/profile'
import color_scheme from 'core/config/color_scheme'

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
                <div className='nav-links'>
                    <div className='nav-logo'>
                        <Link className='nav-logo-main' href="/">
                        <span style={{ color: color_scheme.get_difficulty_tier_color(1) }}>/</span>
                        <span style={{ color: color_scheme.get_difficulty_tier_color(2) }}>/</span>
                        <span style={{ color: color_scheme.get_difficulty_tier_color(3) }}>/</span>
                        <span style={{ color: color_scheme.get_difficulty_tier_color(4) }}>/</span>
                        <span style={{ color: color_scheme.get_difficulty_tier_color(5) }}>/</span>
                        <span> TOPCHALLENGER</span>
                        </Link>
                    </div>

                    <Link onClick={() => toggle_modal()}>User Guide</Link>
                    <Link onClick={() => toggle_modal()}>Rankings</Link>
                    <Link onClick={() => toggle_modal()}>Statistics</Link>
                    {/* TODO - IMPLEMENT Flashing strobe for real time progress updates */}
                    <Link onClick={() => toggle_modal()}>Progress</Link> 
                </div>

                <div className='nav-fill' />

                <div className='nav-profile'>
                    <span>{props.profile.firstname} {props.profile.lastname[0]}</span>
                    <Image className="nav-img" src={props.strava_id.img} alt='profile_img' roundedCircle />
                    <span>{props.profile.rank} | {props.profile.rp}</span>
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