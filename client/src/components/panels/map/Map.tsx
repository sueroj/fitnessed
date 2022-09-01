import React, { useEffect, useRef } from 'react';
import './map.css';

import Mapbox from 'core/libs/map';
import Challenges from 'core/libs/challenges'
import Filter from 'core/objects/filter'
import { GeoJSON } from 'core/objects/misc'


type Props = {
    challenges: Challenges
    toggles: object
    filters: Filter
    fly_to_coords: GeoJSON
    set_fly_to_coords: Function
    set_center: Function
}

export default function Map(props: Props) {
    const map: any = useRef(null)
    let fly_to_coords: GeoJSON = props.fly_to_coords
    let set_fly_to_coords: Function = props.set_fly_to_coords

    useEffect(() => {
        // TODO: Eval refactor props into Mapbox
        if (map.current) return
        map.current = new Mapbox('map', props.challenges, props.toggles, props.filters, props.set_center).draw()
    })

    useEffect(() => {
        console.log('[Map] Fly to coords', fly_to_coords)
        if (fly_to_coords) {
            map.current.fly_to(fly_to_coords)
            set_fly_to_coords(null)
        }
    }, [fly_to_coords, set_fly_to_coords])

    return (
        <div>
            <div className='map-panel'>

                {/* Mapbox */}
                <div id='map' className='map'></div>
            </div>
        </div>

    );
}