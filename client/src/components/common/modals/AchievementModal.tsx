import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './achievement_modal.css'

function getActivities(): void {
}

export default function AchievementModal(props: any) {
    return (
        <Modal className="event-modal" onHide={() => getActivities()} onShow={() => getActivities()}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="event-modal-title">
                        test
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