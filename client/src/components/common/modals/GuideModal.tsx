import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './modals.css'

// TODO Complete Guide modal
export default function GuideModal(props: any) {
    return (
        <Modal className="guide-modal" onHide={undefined} onShow={undefined}
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="guide-modal-title">
                        TopChallenger Guide
                    </div>
                </Modal.Title>
            </Modal.Header>

            <span className="guide-modal-difficulty">Difficulty: 2</span>
            <Modal.Body className='guide-modal-body'>
                <div className='guide-modal-body-upper'>
                    <GuideModalItem img={''} text='Item 1'/>

                    <GuideModalItem img={''} text='Item 2'/>

                    <GuideModalItem img={''} text='Item 3'/>
                </div>

                <div className='guide-modal-lower-header'>
                    Challenge Types
                </div>

                <div className='guide-modal-lower-body'>
                <div className='guide-modal-lower-section'>
                    <ul>
                        <li>Challenge Test [image] - Description</li>
                        <li>Challenge Test [image] - Description</li>
                        <li>Challenge Test [image] - Description</li>
                        <li>Challenge Test [image] - Description</li>
                        <li>Challenge Test [image] - Description</li>
                    </ul>
                </div>
                </div>

            </Modal.Body>

            {/* TODO: Format button, use global button fonts, should be same as navbar */}
            <Modal.Footer>
                <button>Submit</button>
            </Modal.Footer>
        </Modal>
    )
}

function GuideModalItem(props: any) {
    return ( 
        <div className="guide-modal-item">
        <div className='guide-modal-image'>

        </div>
        <div className='guide-modal-text'>
            {props.text}
        </div>
    </div>
    )
}
