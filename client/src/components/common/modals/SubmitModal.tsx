import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './modals.css'

import ActivityParser from 'core/libs/activity_parser'


export default function SubmitModal(props: any) {
    const activity_parser = new ActivityParser(props.profile, props.strava_id)
    const [activities, set_activities] = useState(activity_parser.get_activities())
    const [activities_l, set_activities_l] = useState([])


    // TODO: Implement limit of no more than 3, else vertical scroll appears
    // TODO: Implement sessions of somekind of block to limit polling Strava API for already used activities
    function list_activities() { 
        console.log(`[submitModal:list_activities] start`)
        let activities_list: any[] = []
        debugger

        if (activities.length > 0) {
            for (let activity of activities) {
                activities_list.push(
                    <div className={"submit-modal-activity-item"} key={`submit-item-${activity.id}`}>
                        <div id="miniMap" className="submit-modal-map">
                            map
                        </div>
    
                        <div className="submit-modal-details">
                            {activity.start_date} {activity.name} {activity.distance}
                        </div>
                    </div>
                )
            }
        }
        // return activities_list
    }

    // useEffect(() => {
    //     if (activities.length > 0) {
    //         list_activities()
    //     }
    // }, [activities]
    // )

    return (
        <Modal className="submit-modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="submit-modal-title">
                        Submit Activity
                    </div>
                </Modal.Title>
            </Modal.Header>

            <span className="submit-modal-caption">Submit your activities to complete challenges</span>
            <Modal.Body>
                {activities.length > 0 ? () => list_activities() : <span className="submit-modal-title">No recent activities found.</span>}
            </Modal.Body>

            <Modal.Footer>
                <button className='nav-submit-button'>Submit</button>
            </Modal.Footer>
        </Modal>
    );
}