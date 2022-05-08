import React, { useState, useEffect} from 'react';
import './map.css';

import Mapbox from 'core/libs/map';
import Challenges from 'core/libs/challenges'
import Filters from 'core/libs/filters'

// import Tooltip from 'components/common/tooltip/Tooltip'

type Props = {
    challenges: Challenges
    toggles: object
    filters: Filters
}

export default function Map(props: Props) {
    
    useEffect(() => {
       new Mapbox(props.challenges, props.toggles, props.filters).draw()
    }, [props]
    )

    return (
        <div className='map-panel'>

            {/* Mapbox */}
            <div id='map' className='map'></div>
        </div>
    );
}