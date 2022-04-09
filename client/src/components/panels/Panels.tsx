import React, { useState, useEffect } from 'react';
import './panels.css';


import Thumbnail from 'components/common/thumbnail/Thumbnail'
// import Map from 'components/panels/map/Map'
// import Rank from 'components/panels/left/rank/Rank'
// import Items from 'components/panels/left/items/Items'
// import Recent from 'components/panels/left/recent/Recent'
// import EventLog from 'components/panels/left/event_log/EventLog'
// import Calendar from 'components/panels/right/calendar/Calendar'
// import Featured from 'components/panels/right/featured/Featured'
// import Achievements from 'components/panels/right/achievements/Achievements'
// import Milestones from 'components/panels/right/milestones/Milestones'
// import Leaderboards from 'components/panels/right/leaderboard/Leaderboard'

// import Profiles from 'core/libs/profiles'
import Challenges, { AnyChallengeCategory } from 'core/libs/challenges'
import Progression from 'components/panels/progression/Progression'
import Search from 'components/panels/search/Search'
import Map from 'components/panels/map/Map'
import ListView from 'components/panels/list_view/ListView'
import Featured from 'components/panels/featured/Featured'

type Props = {
    challenges: Challenges
}

export default function Panels(props: Props) {
    const [thumbnails, set_thumbnails] = useState(generate_thumbnails())

    function generate_thumbnails(): any[] {
        let thumbnails: any[] = []
        props.challenges.get_all().forEach((challenge: AnyChallengeCategory) => {
            thumbnails.push(<Thumbnail data={challenge}/>)
        })
        return thumbnails
    }

    return (
        <div className='panels'>
            {/* Map search functions */}
            <Search />

            {/* Main map and search functions */}
            <Map />

            {/* Thumbnail filters and list panels */}
            <ListView challenges={props.challenges} thumbnails={thumbnails} />

            {/* Profile progression and rank panel */}
            <Progression />

            {/* Featured events carousel, news, and ads */}
            <Featured />

        </div>
    );
}