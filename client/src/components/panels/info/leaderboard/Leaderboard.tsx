import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import './leaderboard.css';

import Profiles from 'core/libs/profiles'
import Leaderboards from 'core/libs/leaderboards'
import LeaderboardModal from 'components/common/modals/LeaderboardModal'

type Props = {
    profiles: Profiles
}

export default function Leaderboard(props: Props) {
    const [modal, show_modal] = useState(false)

    function toggle_modal() {
        show_modal(!modal)
    }

    function generate() {
        let leaderboards = new Leaderboards(props.profiles).generate()
        let l: any[] = []
        leaderboards.forEach(profile => {
            l.push(<ListGroup.Item as="li">{profile.rank} {profile.profile_img} {profile.firstname} {profile.lastname[0]} {profile.rp}</ListGroup.Item>)
        })
        return l
    }

    return (
        <div className='leaderboard'>
            <LeaderboardModal show={modal}/>

            <div className='leaderboard-header'>Leaderboard</div>
            <div className='leaderboard-table'>
                <ListGroup as="ol" numbered>

                </ListGroup>
                { generate() }
            </div>

            <div className='leaderboard-spacer' />

            <div className='panel-button-wrapper'>
                <button className='panel-button' onClick={() => toggle_modal()}>Open Leaderboards</button>
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
