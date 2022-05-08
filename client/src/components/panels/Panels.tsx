import React, { useState } from 'react';
import './panels.css';

import Thumbnail from 'components/common/thumbnail/Thumbnail'
import Profiles from 'core/libs/profiles'
import Challenges, { AnyChallengeCategory, AllChallengeCategories } from 'core/libs/challenges'
import Filters from 'core/libs/filters'
import Search from 'components/panels/search/Search'
import Map from 'components/panels/map/Map'
import List from 'components/panels/list/ListPanel'
import Info from 'components/panels/info/Info'
import Featured from 'components/panels/featured/Featured'


type Props = {
    profiles: Profiles
    challenges: Challenges
    toggles: object
}

export default function Panels(props: Props) {
    const filters = new Filters()
    const [thumbnails, set_thumbnails] = useState(generate_thumbnails())

    function generate_thumbnails(): any[] {
        let thumbnails: any[] = []
        props.challenges.get_all().forEach((challenge: AnyChallengeCategory) => {
            thumbnails.push(<Thumbnail data={challenge}/>)
        })
        return thumbnails
    }


    // TODO: Organize props level
    return (
        <div className='panels'>
            {/* Map search functions */}
            <Search />

            {/* Main map and search functions */}
            <Map challenges={props.challenges} toggles={props.toggles} filters={filters}/>

            {/* Thumbnail filters and list panels */}
            <List challenges={props.challenges} thumbnails={thumbnails} filters={filters}/>

            {/* Rank, showcase, and leaderboard */}
            <Info profiles={props.profiles} challenges={props.challenges} />

            {/* Featured events carousel, news, and ads */}
            <Featured profiles={props.profiles} challenges={props.challenges} />
        </div>
    );
}