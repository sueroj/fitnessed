import React, { useState, useEffect } from 'react'
import Popover from 'react-bootstrap/Popover'
import './card.css';

import AnyChallengeCategory from 'core/libs/challenges'

type Props = {
    data: AnyChallengeCategory
}

export default function Card(props: Props) {

    useEffect(() => {
        // const map: Map = new Map().draw()
    }, []
    )

    return (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Popover right</Popover.Header>
            <Popover.Body>
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
            </Popover.Body>
        </Popover>
    );
}