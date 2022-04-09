import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import './list_view.css';

import Thumbnail from 'components/common/thumbnail/Thumbnail'
import Challenges from 'core/libs/challenges'

type Props = {
    challenges: Challenges
    // TODO: define
    thumbnails: any
}

export default function ListView(props: Props) {

    return (
        <div className='list-view'>
            <Filter challenges={props.challenges} />

            <div className='list-view-spacer'/>

            <List thumbnails={props.thumbnails}/>
        </div>
    );
}


type FilterProps = {
    challenges: Challenges
}
export function Filter(props: FilterProps) {
    const challenges = props.challenges.get_all()
    const zones = props.challenges.get_zones()
    const courses = props.challenges.get_courses()
    const sprints = props.challenges.get_sprints()
    const milestones = props.challenges.get_milestones()

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
                <Accordion.Body>Zones ({zones.length})</Accordion.Body>
                <Accordion.Body>Courses ({courses.length})</Accordion.Body>
                <Accordion.Body>Sprints ({sprints.length})</Accordion.Body>
                <Accordion.Body>Collectables</Accordion.Body>
                <Accordion.Body>Milestones ({milestones.all.length})</Accordion.Body>
                <Accordion.Body>Achievements</Accordion.Body>
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