import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './modals.css'

// TODO Complete Leaderboard modal
export default function LeaderboardModal(props: any) {
    return (
        <Modal className="event-modal" onHide={undefined} onShow={undefined}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="event-modal-title">
                        Leaderboard
                    </div>
                </Modal.Title>
            </Modal.Header>

            <span className="event-modal-difficulty">Difficulty: 2</span>
            <Modal.Body>
                <div id="miniMap" className="event-modal-map">
                    map
                </div>

                <div className="event-modal-details">
                    details
                </div>
            </Modal.Body>

            <Modal.Footer>
                footer
            </Modal.Footer>
        </Modal>
    );
}