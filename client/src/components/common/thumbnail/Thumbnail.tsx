import React, { useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import './thumbnail.css'

import { AnyChallengeCategory } from 'core/libs/challenges'
import CompleteCanvas from 'core/canvas/complete'
import { CompleteStatus, ChallengeCategoryMajor } from 'core/enums/enums'
import ChallengeModal from 'components/common/modals/ChallengeModal'
import color_scheme from 'core/config/color_scheme'

// TODO: EVAL props, refactor/combine, etc.
type Props = {
    challenge: AnyChallengeCategory
}

type CompleteProps = {
    challenge: AnyChallengeCategory
}

type CategoryProps = {
    challenge: AnyChallengeCategory
}

type DifficultyProps = {
    challenge: AnyChallengeCategory
    key_id: string
}

type StatusTimerProps = {
    challenge: AnyChallengeCategory
}

export default function Thumbnail(props: Props) {
    const [modal, set_modal] = useState(false)
    const [overlay, set_overlay] = useState(false)
    const target = useRef(null)

    // TODO: React gives warning  in console passing function to child ChallengeModal, 
    // TODO: Complains about <div> attribute. Something to do w/ react bootstrap
    // TODO: Attempted fixes on https://reactjs.org/link/attribute-behavior , but does not work
    // TODO: Not passing prop to Child does fix (i.e. Moving ChallengeModal into Thumbnail), but this not ideal
    function toggle_modal(): void {
        set_modal(!modal)
    }

    function toggle_overlay() {
        set_overlay(!overlay)
    }

    function NOT_YET_IMPLEMENTED() {
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{props.challenge.name}</Popover.Header>
            <Popover.Body>
                {props.challenge.description}
            </Popover.Body>
        </Popover>
    )

    return (
        <>
            {/* Modal displayed on click */}
            <ChallengeModal show={modal} toggle_modal={toggle_modal} challenge={props.challenge} />


            {/* <Modal className="challenge-modal" show={modal} onHide={toggle_modal} onShow={() => NOT_YET_IMPLEMENTED()}
                size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton onClick={toggle_modal}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div className="challenge-modal-title">{props.challenge.name}</div>
                    </Modal.Title>
                </Modal.Header>

                <span className="challenge-modal-difficulty">Difficulty: {2}</span>
                <Modal.Body>
                    <div id="miniMap" className="challenge-modal-map"></div>

                    <div className="challenge-modal-details">
                        {props.challenge.description}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    footer
                </Modal.Footer>
            </Modal> */}

            {/* Tooltip display */}
            <Overlay show={overlay} placement='top' target={target.current}>
                <Popover id="thumbnail-popover" className='id="thumbnail-popover"'>
                    <Popover.Header style={{background: color_scheme.get_difficulty_tier_color(props.challenge.difficulty)}} as="h3" className='thumbnail-popover-header'>
                        <div className='thumbnail-info-display'>
                            <Difficulty challenge={props.challenge} key_id={'tooltip'}/>
                            <div className='thumbnail-horizontal-divider' />
                            <Category challenge={props.challenge} />
                        </div>
                        {props.challenge.name}
                    </Popover.Header>
                    <Popover.Body className='thumbnail-popover-body'>{props.challenge.description}</Popover.Body>
                </Popover>
            </Overlay>

            {/* Thumbnail */}
            <button className="thumbnail" onClick={toggle_modal} ref={target} onMouseEnter={toggle_overlay} onMouseLeave={toggle_overlay}>
                <div className='thumbnail-container'>
                    <Image className="thumbnail-img" src={props.challenge.img} alt={props.challenge.name} rounded />

                    <div className='thumbnail-info-display'>
                        <Difficulty challenge={props.challenge} key_id={'thumbnail'}/>
                        <div className='thumbnail-horizontal-divider' />
                        <Category challenge={props.challenge} />
                    </div>
                    {/* // Image style badges
                // <Image className="badge-img" src={importAsset("scheme_geometric/badges", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />} */}
                    {/* //  // Canvas style badges
                // <BadgeCanvas id={props.challenge.ChallengeId} challenge={props.challenge} useDefault={true} />}
                {/* <div className="badge-rp">{props.challenge.Rp} RP</div>
                <div className="badge-name-header">{props.challenge.Name}</div> */}
                </div>
            </button>
    </>
    );
}

export function Complete(props: CompleteProps) {
    const data = props.challenge
    const [canvas, set_canvas] = useState(draw_complete_canvas())

    useEffect(() => {
        console.log('Complete: use effect()')
        if (data.complete_status === CompleteStatus.NOT_COMPLETE) {
            set_canvas(<canvas />)
        } else {
            // TODO: Eval use of height and width styles
            let canvas = new CompleteCanvas().render(data.challenge_id, data.complete_status)
            set_canvas(<canvas className='complete-canvas' id={canvas.canvas_id} height='50' width='50' />)
        }
    }, [data]
    )


    // TODO: FIX THIS. Events order not correct. List renders twice, useEffect not right. See console log, 
    // TODO:  consider refactor of CompleteCanvas(). CompleteStatus is not updated on first render because
    // TODO:  Main 

    function draw_complete_canvas(): JSX.Element | null {
        if (data.complete_status === CompleteStatus.NOT_COMPLETE) {
            return null
        } else {
            // TODO: Eval use of height and width styles
            let canvas = new CompleteCanvas().render(data.challenge_id, data.complete_status)
            return <canvas className='complete-canvas' id={canvas.canvas_id} height='50' width='50' />
        }
    }

    return (
        <div className='complete'>

            {/* Tooltip showing datetime completed and time, if timed event */}
            {/* { draw_complete_canvas() } */}
            {canvas}
            {console.log('Complete: draw canvas')}

        </div>
    );
}

export function Category(props: CategoryProps) {
    let category = props.challenge.category_major

    if (props.challenge.category_major === ChallengeCategoryMajor.MILESTONE) {
        category = props.challenge.category_minor
    }

    return (
        <div style={{background: color_scheme.get_event_category_color(category)}} className='category'>
            {category}
        </div>
    );
}

export function Difficulty(props: DifficultyProps) {
    const challenge = props.challenge
    const key_id = props.key_id

    function draw_difficulty() {
        let output: any[] = []

        for (let i = 0; i < challenge.difficulty; i++) {
            output.push(<span>&#x2605;</span>)
        }
        return output
    }

    return (
        <div className='difficulty'>

            {/* TODO: Add tooltip */}
            {/* Tooltip showing difficulty breakdown based on event metrics*/}
            {draw_difficulty()}

        </div>
    );
}

export function StatusTimer(props: StatusTimerProps) {

    useEffect(() => {

    }, []
    )

    // TODO: Color format for Open and Timer
    // TODO: Open: white on green, Timer: white on blue (experiment)

    function set_timer() {
        return 'T-00:15:31'
    }

    return (
        <div className='status-timer'>
            {/* TODO time tooltip - include timezone (i.e. BST) add note to footer, all times in BST */}
            {/* Tooltip showing time in standard format */}

            {/* State Open, if open, or countdown timer until event is open */}
            {/* {event.is_open ? 'Open' : set_timer()} */}

            {/* DEBUG ONLY */}
            T-00:15:31
        </div>
    );
}