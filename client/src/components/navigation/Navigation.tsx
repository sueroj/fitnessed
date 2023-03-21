import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'react-bootstrap/NavLink';
import './navigation.css';

import Profile from 'core/objects/profile'
import color_scheme from 'core/config/color_scheme'
import GuideModal from 'components/common/modals/GuideModal';
import SubmitModal from 'components/common/modals/SubmitModal'
import LeaderboardModal from 'components/common/modals/LeaderboardModal'
import AchievementModal from 'components/common/modals/AchievementModal'

type Props = {
    strava_id: any
    profile: Profile
    toggles: object
}

export default function Navigation(props: Props) {
    // TODO: Refactor modal triggers, lots of repetition
    const [modal, set_modal] = useState(false)
    const [g_modal, set_g_modal] = useState(false)
    const [p_modal, set_a_modal] = useState(false)

    // TODO: Not complete function
    function toggle_modal(type: string) {
        const MODALS = new Map([
            ['user_guide', false],
            ['rankings', false],
            ['statistics', false],
            ['progress', false],
            ['submit', false],
        ])

        // for (let [modal_type, modal_element] of MODALS) {
        //     if (type === modal_type) {
        //         set_modal(true)
        //         // set_modal_t(modal_element)
        //     }
        // }

        set_modal(true)
    }

    function toggle_g_modal(){
        set_g_modal(true)
    }

    function toggle_a_modal(){
        set_a_modal(true)
    }


    return (
        <>
            <GuideModal show={g_modal} onHide={() => set_g_modal(false)} />
            <LeaderboardModal show={modal} onHide={() => set_modal(false)} />
            <AchievementModal show={p_modal} onHide={() => set_a_modal(false)} profile={props.profile} />
            <SubmitModal show={modal} onHide={() => set_modal(false)} strava_id={props.strava_id} profile={props.profile} />

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

                    <Link onClick={() => toggle_g_modal()}>User Guide</Link>
                    <Link onClick={() => toggle_modal('rankings')}>Rankings</Link>
                    <Link onClick={() => toggle_modal('statistics')}>Statistics</Link>
                    {/* TODO - IMPLEMENT Flashing strobe for real time progress updates */}
                    <Link onClick={() => toggle_a_modal()}>Achievements</Link> 
                </div>

                <div className='nav-fill' />

                <div className='nav-link'>
                    <button className='nav-submit-button' onClick={() => toggle_modal('submit')}>Submit</button>
                </div>

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