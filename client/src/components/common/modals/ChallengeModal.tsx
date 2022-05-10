import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './challenge_modal.css'

import { AnyChallengeCategory } from 'core/libs/challenges'

type Props = {
    show: boolean
    toggle_modal: Function // TODO: define type, accepts VoidFunction
    challenge: AnyChallengeCategory
    
}

export default function ChallengeModal(props: Props) {

    function NOT_YET_IMPLEMENTED() {

    }

    function draw_difficulty(difficulty: number) {
        let output: any[] = []
    
        for (let i = 0; i < difficulty; i++) {
            output.push(<span>&#x2605;</span>)
        }
        return output
    }

    // TODO: Figure out - () => props.toggle_modal() vs just using props.toggle_modal
    return (
        <Modal className="challenge-modal" onHide={() => props.toggle_modal()} onShow={() => NOT_YET_IMPLEMENTED()} {...props}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton onClick={() => props.toggle_modal()}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="challenge-modal-title">{props.challenge.name}</div>
                </Modal.Title>
            </Modal.Header>

            <span className="challenge-modal-difficulty">Difficulty: {draw_difficulty(props.challenge.difficulty)}</span>
            <Modal.Body>
                <div id="miniMap" className="challenge-modal-map"></div>

                <div className="challenge-modal-details">
                    {props.challenge.description}
                </div>
            </Modal.Body>

            <Modal.Footer>
                footer
            </Modal.Footer>
        </Modal>
    );
}