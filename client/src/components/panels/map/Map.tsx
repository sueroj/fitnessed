import React, { useEffect, useRef } from 'react';
import './map.css';

import Mapbox from 'core/libs/map';
import Challenges from 'core/libs/challenges'
import Filter from 'core/objects/filter'

type Props = {
    challenges: Challenges
    toggles: object
    filters: Filter
    set_center: Function
}

export default function Map(props: Props) {
    const map: any = useRef(null)

    useEffect(() => {
        // TODO: Eval refactor props into Mapbox
        if (map.current) return
        map.current = new Mapbox('map', props.challenges, props.toggles, props.filters, props.set_center).draw()
    })

    return (
        <div className='map-panel'>
            {/* Mapbox */}
            <div id='map' className='map'></div>
        </div>
    );
}