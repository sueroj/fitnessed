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
    // TODO: Eval possible addition of new thin panel section below info panels to include buttons
    return (
        <div className='info-panel'>
            {/* User profile rank and leaderboard summary */}
            <Rank profiles={props.profiles} challenges={props.challenges}/>

            {/* Thumbnails for most recently completed challenges, and almost */}
            <Showcase profile={props.profiles.user} challenges={props.challenges} />

            {/* User leaderboard snapshot summary */}
            <Leaderboard profiles={props.profiles}/>
        </div>
    );
}