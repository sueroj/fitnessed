
import React, { useState, useEffect } from 'react';
import './recent_activity.css'
import '../info.css'

import Challenges from 'core/libs/challenges'
import Profiles from 'core/libs/profiles'

type Props = {
    profiles: Profiles
    challenges: Challenges
}

export default function RecentActivity(props: Props) {
    const test_recent_activity = [
        `${props.profiles.user.firstname} ${props.profiles.user.lastname[0]} [18] completed Course C$811102 [Gold]`,
        `${props.profiles.user.firstname} ${props.profiles.user.lastname[0]} [18] completed Course C$811102 [Gold]`,
        `${props.profiles.user.firstname} ${props.profiles.user.lastname[0]} [18] ranked up to Rank 19!`
    ]
    const [recent_activity, set_recent_activity] = useState(get_recent_activity())
    // TODO: Eval possible addition of new thin panel section below info panels to include buttons

    // function get_recent_activity() {
    //     // Http action
    //     // Get challenges from server upon initial login or refresh (eval storing of challenge in user's page session)

    //     console.log('[Main:get_challenges] START')
    //     http.get_challenges()
    //     .then(response => { challenges.initialize(response.data) })
    //     .then(() => { 
    //         sessionStorage.setItem('session_challenges', JSON.stringify(challenges))
    //         set_loading(false) })
    //     console.log('[Main:get_challenges] challenges ', challenges)
    // }


    function get_recent_activity() {
        let activity_list: any[] = []
        let key = 0
        for (let activity of test_recent_activity) {
            activity_list.push(<div key={`recent-activity-item-${key++}`} className='list-item'>{activity}</div>)
        }
        return activity_list
    }

    // useEffect(() => {
        
    // }, [recent_activity])

    return (
        <div className='recent-activity'>
            {/* <LeaderboardModal show={modal}/> */}

            <div className='recent-activity-header'>Recent Activity</div>
            <div className='recent-activity-table'>
                {recent_activity}

            </div>

            <div className='leaderboard-spacer' />
            
            <div className='recent-activity-button-wrapper'>
                <button className='recent-activity-button' >View All Recent Activity</button>
            </div>
        </div>
    );
}