import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './featured.css';

import test_banner from 'assets/banners/test_banner.png'

import Profiles from 'core/libs/profiles'
import Challenges from 'core/libs/challenges'

type Props = {
    profiles: Profiles
    challenges: Challenges
}

export default function Featured(props: Props) {

    return (
        // <div className='featured'>
        <Carousel className='featured'>

            {/* Carousel Item 1 */}
            <Carousel.Item interval={10000}>
                <img className="featured-carousel-banner" src={test_banner} alt='test' />
                <Carousel.Caption>
                    <h3>Test</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>

            {/* Carousel Item 2 */}
            <Carousel.Item interval={10000}>
                <img className="featured-carousel-banner" src={test_banner} alt='test' />
                <Carousel.Caption>
                    <h3>Test</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
        // </div>
    )
}
