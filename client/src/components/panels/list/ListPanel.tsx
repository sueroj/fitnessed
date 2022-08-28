import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './list_panel.css';

import Thumbnail from 'components/common/thumbnail/Thumbnail'
import Challenges, { AnyChallengeCategory, AllChallengeCategories } from 'core/libs/challenges'
import Sort from 'core/libs/sort'
import Filter from 'core/objects/filter'


type Props = {
    challenges: Challenges
    // TODO: define
    thumbnails: any
    filter: Filter
    center: mapboxgl.LngLat
}

// TODO: Refactor filters data structure at endaww
export default function ListPanel(props: Props) {
    const [thumbnails, set_thumbnails] = useState(props.thumbnails)

    function update_thumbnails(challenges: AllChallengeCategories) {
        let thumbnails: any[] = []
        challenges.forEach((challenge: AnyChallengeCategory) => {
                thumbnails.push(<Thumbnail challenge={challenge}/>)
            })
        set_thumbnails(thumbnails)
    }

    return (
        <div className='list-panel'>
            {/* Filter Accordion */}
            <FilterPanel challenges={props.challenges} filter={props.filter} update_thumbnails={update_thumbnails}/>

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
    const challenges = new Sort(props.challenges.all)
    // TODO: Get Nearby should only include MappableChallengeCategories
    // const nearby_challenges = new Sort(props.challenges.get_nearby())
    const nearby_challenges = challenges
    const sorted_challenges = challenges.get_sorted()
    const sorted_nearby_challenges = nearby_challenges.get_sorted()

    const achievements = [] // TODO

    function toggle_filter(f: string, sorted_challenges: Sort) {
        let new_filters = filter.update(f)
        set_filter(new_filters)
        props.update_thumbnails(sorted_challenges.get_filtered_list(new_filters))
    }

    // TODO: Test only
    useEffect(() => {
        console.log(range_value)
    }, [range_value]
    )

    // TODO: implement achievements
    return (
        <div className='filter'>
            <div className='filter-nearby-slider'>Nearby ({sorted_nearby_challenges.all.length}) - <Form.Label className='filter-range'>{range_value} km</Form.Label><Form.Range min={'5'} max={'50'} value={range_value} onChange={(e) => set_range_value(e.target.value)}/></div>
            <Button onClick={() => toggle_filter('zones', nearby_challenges)} className='filter-button'><Form.Check type='switch' id='all-zones' checked={filter.zones} onChange={() => toggle_filter('zones', nearby_challenges)} label={`Zones (${sorted_nearby_challenges.zones.length})`}/></Button>
            <Button onClick={() => toggle_filter('courses', nearby_challenges)} className='filter-button'><Form.Check type='switch' id='all-courses' checked={filter.courses} onChange={() => toggle_filter('courses', nearby_challenges)} label={`Courses (${sorted_nearby_challenges.courses.length})`}/></Button>
            <Button onClick={() => toggle_filter('sprints', nearby_challenges)} className='filter-button'><Form.Check type='switch' id='all-sprints' checked={filter.sprints} onChange={() => toggle_filter('sprints', nearby_challenges)} label={`Sprints (${sorted_nearby_challenges.sprints.length})`}/></Button>
            <Button onClick={() => toggle_filter('collectables', nearby_challenges)} className='filter-button'><Form.Check type='switch' id='all-collectables' checked={filter.collectables} onChange={() => toggle_filter('collectables', nearby_challenges)} label={`Collectables (${sorted_nearby_challenges.collectables.length})`}/></Button>
            <Button onClick={() => toggle_filter('milestones', nearby_challenges)} className='filter-button'><Form.Check type='switch' id='all-milestones' checked={filter.milestones} onChange={() => toggle_filter('milestones', challenges)} label={`Milestones (${sorted_challenges.milestones.all.length})`}/></Button>
            <Button onClick={() => toggle_filter('achievements', nearby_challenges)} className='filter-button'><Form.Check type='switch' id='all-achievements' checked={filter.achievements} onChange={() => toggle_filter('achievements', challenges)} label={`Achievements (${achievements.length})`}/></Button>
            {/* <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0" onClick={() => props.update_thumbnails(nearby_challenges.get_filtered_list(filter))}>
                <Accordion.Header className='filter-body'>Nearby ({sorted_nearby_challenges.all.length})</Accordion.Header> 
                {/* TODO: Add range min/max values to a common app options/config file */}
                {/* <Accordion.Body className='filter-body'><Form.Label>{range_value} km</Form.Label><Form.Range min={'5'} max={'50'} value={range_value} onChange={(e) => set_range_value(e.target.value)}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-zones' checked={filter.zones} onChange={() => toggle_filter('zones', nearby_challenges)} label={`Zones (${sorted_nearby_challenges.zones.length})`}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-courses' checked={filter.courses} onChange={() => toggle_filter('courses', nearby_challenges)} label={`Courses (${sorted_nearby_challenges.courses.length})`}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-sprints' checked={filter.sprints} onChange={() => toggle_filter('sprints', nearby_challenges)} label={`Sprints (${sorted_nearby_challenges.sprints.length})`}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-collectables' checked={filter.collectables} onChange={() => toggle_filter('collectables', nearby_challenges)} label={`Collectables (${sorted_nearby_challenges.collectables.length})`}/></Accordion.Body> */}
            {/* </Accordion.Item>
            <Accordion.Item eventKey="1" onClick={() => props.update_thumbnails(challenges.get_filtered_list(props.filter))}>
                <Accordion.Header className='filter-body'>All Challenges ({sorted_challenges.all.length})</Accordion.Header>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-zones' checked={filter.zones} onChange={() => toggle_filter('zones', challenges)} label={`Zones (${sorted_challenges.zones.length})`}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-courses' checked={filter.courses} onChange={() => toggle_filter('courses', challenges)} label={`Courses (${sorted_challenges.courses.length})`}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-sprints' checked={filter.sprints} onChange={() => toggle_filter('sprints', challenges)} label={`Sprints (${sorted_challenges.sprints.length})`}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-collectables' checked={filter.collectables} onChange={() => toggle_filter('collectables', challenges)} label={`Collectables (${sorted_challenges.collectables.length})`}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-milestones' checked={filter.milestones} onChange={() => toggle_filter('milestones', challenges)} label={`Milestones (${sorted_challenges.milestones.all.length})`}/></Accordion.Body>
                <Accordion.Body className='filter-body'><Form.Check type='switch' id='all-achievements' checked={filter.achievements} onChange={() => toggle_filter('achievements', challenges)} label={`Achievements (${achievements.length})`}/></Accordion.Body>
            </Accordion.Item>
            </Accordion> */}
        </div>
    );
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
    );
}