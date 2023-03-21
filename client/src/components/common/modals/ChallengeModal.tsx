import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import './modals.css'

import { AnyChallengeCategory } from 'core/libs/challenges'
import Http from 'core/libs/http'

import { MAPBOX_STATIC_URL, MAPBOX_TOKEN} from 'config/tokens'


type Props = {
    key_id: string
    show: boolean
    toggle_modal: Function
    challenge: AnyChallengeCategory
}

export default function ChallengeModal(props: Props) {
    const http = new Http()
    const [map_static_img, set_map_static_img] = useState(null) // TODO: Try using loading component from react bootstrap

    // TODO: Fix difficulty. As is will have list key warning, props key_id has not fixed
    function draw_difficulty(difficulty: number) {
        let output: any[] = []
    
        for (let i = 0; i < difficulty; i++) {
            output.push(<span key={`${props.key_id}-challenge-modal-${props.challenge.challenge_id}-diff-${difficulty}`}>&#x2605;</span>)
        }
        return output
    }

    function get_map_static_img() {
        http.get_map_static_img(props.challenge.start_coords)
        .then(response => { set_map_static_img(response.data) })
        console.log('[CModal:get_map_static_img] ', map_static_img)
    }

    return (
        <Modal className="challenge-modal"  onHide={() => props.toggle_modal()} onShow={() => get_map_static_img()} {...props}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="challenge-modal-title">{props.challenge.name}</div>
                </Modal.Title>
            </Modal.Header>

            {/* <span className="challenge-modal-difficulty">Difficulty: {draw_difficulty(props.challenge.difficulty)}</span> */}
            <Modal.Body>
                {/* <div id="miniMap" className="challenge-modal-map"></div> */}
                <div id='map' className='challenge-modal-map'>
                    { map_static_img ? <Image src={`${MAPBOX_STATIC_URL}/${props.challenge.start_coords.lng},${props.challenge.start_coords.lat},12,0/766x298?access_token=${MAPBOX_TOKEN}`} alt={props.challenge.name} /> : null }
                </div>

                <div className="challenge-modal-details">
                    {props.challenge.description}
                </div>
            </Modal.Body>

            <Modal.Footer>
                footer
            </Modal.Footer>
        </Modal>
    )
}