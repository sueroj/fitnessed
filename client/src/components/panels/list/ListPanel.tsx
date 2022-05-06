import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import './list_panel.css';

import Thumbnail from 'components/common/thumbnail/Thumbnail'
import Challenges, { AnyChallengeCategory } from 'core/libs/challenges'


type Props = {
    challenges: Challenges
    // TODO: define
    thumbnails: any
}

// TODO: Refactor filters data structure at end
type Filters = {
    nearby: boolean,
    zones: boolean,
    courses: boolean,
    sprints: boolean,
    collectables: boolean,
    milestones: boolean,
    achievements: boolean
}

export default function ListPanel(props: Props) {
    const [thumbnails, set_thumbnails] = useState(props.thumbnails)
    const [filters, set_filters] = useState({
        nearby: false,
        zones: true,
        courses: true,
        sprints: true,
        collectables: true,
        milestones: true,
        achievements: true
    })

    function toggle_filter(filter: string, value: boolean) {
        let new_filters = {
            nearby: filters.nearby,
            zones: filters.zones,
            courses: filters.courses,
            sprints: filters.sprints,
            collectables: filters.collectables,
            milestones: filters.milestones,
            achievements: filters.achievements,
            [filter]: !value
        }
        set_filters(new_filters)
        filter_thumbnails(new_filters)
    }

    function filter_thumbnails(filters: Filters) {
        let thumbnails: any[] = []
        props.challenges.get_filtered(filters).forEach((challenge: AnyChallengeCategory) => {
            thumbnails.push(<Thumbnail data={challenge}/>)
        })
        set_thumbnails(thumbnails)
    }


    return (
        <div className='list-panel'>
            <Filter challenges={props.challenges} filters={filters} toggle_filter={toggle_filter}/>

            <div className='list-panel-spacer'/>

            <List thumbnails={thumbnails}/>
        </div>
    );
}


type FilterProps = {
    challenges: Challenges
    filters: Filters
    toggle_filter: Function
}
export function Filter(props: FilterProps) {
    const challenges = props.challenges.get_all()
    const zones = props.challenges.get_zones()
    const courses = props.challenges.get_courses()
    const sprints = props.challenges.get_sprints()
    const collectables = props.challenges.get_collectables() // TODO
    const milestones = props.challenges.get_milestones()
    const achievements = [] // TODO

    // TODO: implement collectables & achievements
    return (
        <div className='filter'>
            <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Nearby</Accordion.Header>
                <Accordion.Body>Zones</Accordion.Body>
                <Accordion.Body>Courses</Accordion.Body>
                <Accordion.Body>Sprints</Accordion.Body>
                <Accordion.Body>Collectables</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>All Challenges ({challenges.length})</Accordion.Header>
                <Accordion.Body><Form.Check type='switch' id='all-zones' checked={props.filters.zones} onClick={() => props.toggle_filter('zones', props.filters.zones)} label={`Zones (${zones.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-courses' checked={props.filters.courses} onClick={() => props.toggle_filter('courses',props.filters.courses)} label={`Courses (${courses.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-sprints' checked={props.filters.sprints} onClick={() => props.toggle_filter('sprints', props.filters.sprints)} label={`Sprints (${sprints.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-collectables' checked={props.filters.collectables} onClick={() => props.toggle_filter('collectables', props.filters.collectables)} label={`Collectables (${collectables.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-milestones' checked={props.filters.milestones} onClick={() => props.toggle_filter('milestones', props.filters.milestones)} label={`Milestones (${milestones.all.length})`}/></Accordion.Body>
                <Accordion.Body><Form.Check type='switch' id='all-achievements' checked={props.filters.achievements} onClick={() => props.toggle_filter('achievements', props.filters.achievements)} label={`Achievements (${achievements.length})`}/></Accordion.Body>
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