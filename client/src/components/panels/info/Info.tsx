import React, { useState, useEffect } from 'react';
import './info.css';

import Challenges from 'core/libs/challenges'
import Profiles from 'core/libs/profiles'
import Rank from 'components/panels/info/rank/Rank'
import Showcase from 'components/panels/info/showcase/Showcase'
import Leaderboard from 'components/panels/info/leaderboard/Leaderboard'

type Props = {
    profiles: Profiles
    challenges: Challenges
}

export default function Info(props: Props) {

    return (
        <div className='info-panel'>
            {/* User profile rank and leaderboard summary */}
            <Rank profiles={props.profiles} />

            <div className='info-vertical-spacer' />

            {/* Thumbnails for most recently completed challenges, and almost */}
            <Showcase profile={props.profiles.user} challenges={props.challenges} />

            <div className='info-vertical-spacer' />

            {/* User leaderboard snapshot summary */}
            <Leaderboard profiles={props.profiles}/>
        </div>
    );
}