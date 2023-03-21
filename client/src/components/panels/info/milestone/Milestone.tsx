import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import './milestone.css'

import Profiles from 'core/libs/profiles'
import Challenges from 'core/libs/challenges'
import { Milestone } from 'core/objects/challenge'
import LeaderboardModal from 'components/common/modals/LeaderboardModal'

type Props = {
    profiles: Profiles
    challenges: Challenges
}

export default function Milstone(props: Props) {

    function list_challenges(challenges: Milestone[]) {
        let html: any[] = []
        for (let challenge of challenges) {
            html.push(<ul className='milestone-list-item' key={`milestone-li-${challenge.challenge_id}`}>{challenge.name}: {challenge.description.substring(0,25)}</ul>)
        }
        return html
    }

    function draw_progress_bar(challenges: Milestone[]) {
        let total = challenges.length
        let completed = 0

        for (let challenge of challenges) {
            if (challenge.is_complete) {completed += 1}
        }
        let now = completed / total
        
        return (
            <div className='milestone-progress-bar-wrapper'>
            {/* <div className="rank-progress-numeric">{props.profile.rp} / {props.profile.rp_to_next}</div> */}
            <ProgressBar className="milestone-progress-bar" variant="warning" animated now={now} />
            </div>
        )
    }



    return (
        <div className='milestone'>

            <div className='milestone-header'>Milestones</div>
            <div className='milestone-list'>
                <ul>
                    <li><div className='milestone-list-header-item'>Daily: {draw_progress_bar(props.challenges.milestones.dailies)}</div>
                        {list_challenges(props.challenges.milestones.dailies)}
                    </li>
                    <li><div className='milestone-list-header-item'>Weekly: {draw_progress_bar(props.challenges.milestones.weeklies)}</div>
                        {list_challenges(props.challenges.milestones.weeklies)}
                    </li>
                    <li><div className='milestone-list-header-item'>Monthly: {draw_progress_bar(props.challenges.milestones.monthlies)}</div>
                        {list_challenges(props.challenges.milestones.monthlies)}
                    </li>  
                </ul>
            </div>

            <div className='milestone-spacer' />
            
            <div className='milestone-button-wrapper'>
                <button className='milestone-button'>Open Progress</button>
            </div>
        </div>
    );
}

export function LeaderboardProfile() {


    return (
        <div className='leaderboard-profile'>
              
  {/* <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
  <ListGroup.Item as="li">Cras justo odio</ListGroup.Item> */}
            
        </div>
    );
}
