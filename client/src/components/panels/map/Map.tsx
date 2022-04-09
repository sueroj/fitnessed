import React, { useState, useEffect} from 'react';
import './map.css';

// import Mapbox from 'core/libs/map';
// import Events, { MappableEventCategories } from 'core/libs/events'

// import Tooltip from 'components/common/tooltip/Tooltip'

type Props = {
    // events: Events
    // toggles: {}
}

export default function Map(props: Props) {
    
    useEffect(() => {
    //    new Mapbox().draw()
    }, []
    )

    return (
        <div className='map-panel'>

            {/* Mapbox */}
            <div id='map' className='map'></div>
        </div>
    );
}