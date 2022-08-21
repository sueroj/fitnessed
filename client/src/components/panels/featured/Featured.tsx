import React, { useState, useEffect } from 'react';
import './featured.css';

import Profiles from 'core/libs/profiles'
import Challenges from 'core/libs/challenges'

type Props = {
    profiles: Profiles
    challenges: Challenges
}

export default function Featured(props: Props) {

    return (
        <div className='featured'>
            Featured
        </div>
    );
}