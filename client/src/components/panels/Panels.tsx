import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'
import './panels.css';

import Thumbnail from 'components/common/thumbnail/Thumbnail'
import Profiles from 'core/libs/profiles'
import Challenges, { AnyChallengeCategory } from 'core/libs/challenges'
import Filter from 'core/objects/filter'
import Search from 'components/panels/search/Search'
import Map from 'components/panels/map/Map'
import List from 'components/panels/list/ListPanel'
import Info from 'components/panels/info/Info'
import Featured from 'components/panels/featured/Featured'
import { DEFAULT_START_LNG, DEFAULT_START_LAT } from 'config/options'


type Props = {
    profiles: Profiles
    challenges: Challenges
    toggles: object
}

export default function Panels(props: Props) {
    const filters = new Filter()
    const [thumbnails, set_thumbnails] = useState(generate_thumbnails())
    // TODO: Static map center as define in app config file, should convert to
    // TODO: using browser location eventually
    const [center, set_center] = useState(new mapboxgl.LngLat(DEFAULT_START_LNG, DEFAULT_START_LAT))

    function generate_thumbnails(): any[] {
        let thumbnails: any[] = []
        props.challenges.all.forEach((challenge: AnyChallengeCategory) => {
            thumbnails.push(<Thumbnail key={challenge.challenge_id} challenge={challenge}/>)
        })
        return thumbnails
    }

    useEffect(() => {
        console.log(center)
    }, [center]
    )

    // TODO: Organize props level
    return (
        <div className='panels'>
            {/* Map search functions */}
            <Search />

            {/* Main map and search functions */}
            <Map challenges={props.challenges} toggles={props.toggles} filters={filters} set_center={set_center}/>

            {/* Thumbnail filters and list panels */}
            <List challenges={props.challenges} thumbnails={thumbnails} filter={filters} center={center}/>

            {/* Rank, showcase, and leaderboard */}
            <Info profiles={props.profiles} challenges={props.challenges} />

            {/* Featured events carousel, news, and ads */}
            <Featured profiles={props.profiles} challenges={props.challenges} />
        </div>
    );
}