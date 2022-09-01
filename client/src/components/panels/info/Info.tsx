import './info.css';

import Challenges from 'core/libs/challenges'
import Profiles from 'core/libs/profiles'
import Rank from 'components/panels/info/rank/Rank'
import Leaderboard from 'components/panels/info/leaderboard/Leaderboard'
import RecentActivity from 'components/panels/info/recent_activity/RecentActivity'

type Props = {
    profiles: Profiles
    challenges: Challenges
}

export default function Info(props: Props) {
    // TODO: Eval possible addition of new thin panel section below info panels to include buttons
    return (
        <div className='info-panel'>
            {/* User leaderboard snapshot summary */}
            <RecentActivity profiles={props.profiles} challenges={props.challenges}/>

            {/* User profile rank and leaderboard summary */}
            <Rank profiles={props.profiles} challenges={props.challenges}/>

            {/* User leaderboard snapshot summary */}
            <Leaderboard profiles={props.profiles}/>
        </div>
    );
}