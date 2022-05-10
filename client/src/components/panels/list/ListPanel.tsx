import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import './list_panel.css';

import Thumbnail from 'components/common/thumbnail/Thumbnail'
import Challenges, { AnyChallengeCategory } from 'core/libs/challenges'
import Filters from 'core/libs/filters'


type Props = {
    challenges: Challenges
    // TODO: define
    thumbnails: any
    filters: Filters
}

// TODO: Refactor filters data structure at end

export default function ListPanel(props: Props) {
    const [thumbnails, set_thumbnails] = useState(props.thumbnails)
    const [filters, set_filters] = useState(props.filters)

    function toggle_filter(filter: string) {
        let new_filters = props.filters.update(filter)
        set_filters(new_filters)
        filter_thumbnails(new_filters)
    }

    // TODO: define type
    function filter_thumbnails(filters: any) {
        let thumbnails: any[] = []
        props.challenges.get_filtered(filters).forEach((challenge: AnyChallengeCategory) => {
            thumbnails.push(<Thumbnail challenge={challenge}/>)
        })
        set_thumbnails(thumbnails)
    }


    return (
        <div className='list-panel'>
            {/* Filter Accordion */}
            <Filter challenges={props.challenges} filters={filters} toggle_filter={toggle_filter}/>

            <div className='list-panel-spacer'/>

            {/* Center challenges thumbnail list */}
            <List thumbnails={thumbnails}/>
        </div>
    );
}


type FilterProps = {
    challenges: Challenges
    filters: any
    toggle_filter: Function
}

export function Filter(props: FilterProps) {
    const challenges = props.challenges.get_all()
    const zones = props.challenges.get_zones()
    const courses = props.challenges.get_courses()
    const sprints = props.challenges.get_sprints()
    const collectables = props.challenges.get_collectables()
    const milestones = props.challenges.get_milestones()
    const achievements = [] // TODO

    // TODO: implement collectables & achievements
    return (
        <div className='filter'>
            <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Nearby</Accordion.Header>
                {/* TODO: Include a distance slider for nearby challenges */}
                <Accordion.Body><Form.Label>0 km</Form.Label><Form.Range /></Accordion.Body>
                <Accordion.Body>Zones</Accordion.Body>
                <Accordion.Body>Courses</Accordion.Body>
                <Accordion.Body>Sprints</Accordion.Body>
                <Accordion.Body>Collectables</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>All Challenges ({challenges.length})</Accordion.Header>
                <Accordion.Body><Form.Check type='switch' id='all-zones' checked={props.filters.zones} onChange={() => props.toggle_filter('zones')} label={`Zones (${zones.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-courses' checked={props.filters.courses} onChange={() => props.toggle_filter('courses')} label={`Courses (${courses.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-sprints' checked={props.filters.sprints} onChange={() => props.toggle_filter('sprints')} label={`Sprints (${sprints.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-collectables' checked={props.filters.collectables} onChange={() => props.toggle_filter('collectables')} label={`Collectables (${collectables.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-milestones' checked={props.filters.milestones} onChange={() => props.toggle_filter('milestones')} label={`Milestones (${milestones.all.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-achievements' checked={props.filters.achievements} onChange={() => props.toggle_filter('achievements')} label={`Achievements (${achievements.length})`}/></Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </div>
    );
}


type ListProps = {
    thumbnails: any
}
export function List(props: ListProps) {

    return (
        <div className='list'>
            {props.thumbnails}
        </div>
    );
}