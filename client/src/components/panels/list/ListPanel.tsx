import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './list_panel.css';

import Thumbnail from 'components/common/thumbnail/Thumbnail'
import Challenges, { AnyChallengeCategory, AllChallengeCategories } from 'core/libs/challenges'
import Sort from 'core/libs/sort'
import Filter from 'core/objects/filter'
import SpotlightPanel from 'components/panels/list/SpotlightPanel'


type Props = {
    challenges: Challenges
    // TODO: define
    thumbnails: any
    filter: Filter
    center: mapboxgl.LngLat
}

// TODO: Refactor filters data structure at endaww
export default function ListPanel(props: Props) {
    const key_id = 'list-panel'

    const [thumbnails, set_thumbnails] = useState(props.thumbnails)

    function update_thumbnails(challenges: AllChallengeCategories) {
        let thumbnails: any[] = []
        challenges.forEach((challenge: AnyChallengeCategory) => {
                thumbnails.push(<Thumbnail key={`${key_id}-${challenge.challenge_id}`} key_id={key_id} challenge={challenge}/>)
            })
        set_thumbnails(thumbnails)
    }

    return (
        <div className='list-panel'>
            <div className='list-panel-left'>
                {/* Filter Buttons */}
                <FilterPanel challenges={props.challenges} filter={props.filter} update_thumbnails={update_thumbnails}/>

                {/* Spotlight Panel  */}
                <SpotlightPanel challenges={props.challenges}/>
            </div>

            <div className='list-panel-spacer'/>

            {/* Center challenges thumbnail list */}
            <List thumbnails={thumbnails}/>
        </div>
    );
}


type FilterProps = {
    challenges: Challenges
    filter: Filter
    update_thumbnails: Function
}

export function FilterPanel(props: FilterProps) {
    const [range_value, set_range_value] = useState('30')
    const [filter, set_filter] = useState(props.filter)
    const challenges = props.challenges
    // const challenges = new Sort(props.challenges.all)
    // TODO: Get Nearby should only include MappableChallengeCategories
    // const nearby_challenges = new Sort(props.challenges.get_nearby())
    // const sorted_challenges = challenges.get_sorted()
    // const sorted_nearby_challenges = nearby_challenges.get_sorted()

    const achievements = [] // TODO

    function toggle_filter(f: string, challenges: Challenges) {
        let new_filter = filter.update(f)
        set_filter(new_filter)
        props.update_thumbnails(challenges.filter(new_filter))
    }

    // function toggle_filter(f: string, sorted_challenges: Sort) {
    //     let new_filters = filter.update(f)
    //     set_filter(new_filters)
    //     props.update_thumbnails(sorted_challenges.get_filtered_list(new_filters))
    // }

    // TODO: Test only
    useEffect(() => {
        console.log(range_value)
    }, [range_value]
    )

    // TODO: implement achievements
    return (
        <div className='filter'> {/* TODO: Add range min/max values to a common app options/config file */}
            <div className='filter-nearby-slider'>Nearby ({challenges.all.length}) - <Form.Label className='filter-range'>{range_value} km</Form.Label><Form.Range min={'5'} max={'50'} value={range_value} onChange={(e) => set_range_value(e.target.value)}/></div>
            <button className='filter-button'><Form.Check type='checkbox' id='all-zones' checked={filter.zones} onChange={() => toggle_filter('zones', challenges)} label={`Zones (${challenges.zones.length})`}/></button>
            <button className='filter-button'><Form.Check type='checkbox' id='all-courses' checked={filter.courses} onChange={() => toggle_filter('courses', challenges)} label={`Courses (${challenges.courses.length})`}/></button>
            <button className='filter-button'><Form.Check type='checkbox' id='all-sprints' checked={filter.sprints} onChange={() => toggle_filter('sprints', challenges)} label={`Sprints (${challenges.sprints.length})`}/></button>
            <button className='filter-button'><Form.Check type='checkbox' id='all-collectables' checked={filter.collectables} onChange={() => toggle_filter('collectables', challenges)} label={`Collectables (${challenges.collectables.length})`}/></button>
            <button className='filter-button'><Form.Check type='checkbox' id='all-milestones' checked={filter.milestones} onChange={() => toggle_filter('milestones', challenges)} label={`Milestones (${challenges.milestones.all.length})`}/></button>
            <button className='filter-button'><Form.Check type='checkbox' id='all-achievements' checked={filter.achievements} onChange={() => toggle_filter('achievements', challenges)} label={`Achievements (${achievements.length})`}/></button>
        </div>
    )
}


type ListProps = {
    thumbnails: any
}
export function List(props: ListProps) {
    return (
        <div className='list-container'>
            <div className='list'>
                {props.thumbnails}
            </div>
        </div>
    )
}