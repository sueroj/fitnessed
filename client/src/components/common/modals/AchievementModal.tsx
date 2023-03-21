import React, { useState, useEffect } from 'react'
import { Modal, ProgressBar } from 'react-bootstrap'
import './modals.css'

import Profile from 'core/objects/profile'
import Http from 'core/libs/http'

import TestAchievements from 'test/test_achievements'

function getActivities(): void {
}

type ModalProps = {
    profile: Profile
    progress_bar_val: number
}

// TODO: REQ at least 2 checks where achievements must be updated on user profile
// TODO: 1 on opening of achievement modal -> get_achievements()
// TODO: 1 on challenge submission calc, to be calc'd at the end, after profile challenge completion is updated


export default function AchievementModal(props: any) {
    const http = new Http()
    const [achievements, set_achievements] = useState({})
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    function get_achievements() {
        // Http action
        // Get list of achievements from server

        console.log('[AchievementModal:get_achievements] START')
        // http.get_achievements()
        // .then(response => { set_achievements(response.data) })
        // .then(() => { 
        //     sessionStorage.setItem('session_achievements', JSON.stringify(achievements))
        //     console.log('[AchievementModal:get_achievements] ', achievements)
        // })
        set_achievements(new TestAchievements().achievements)
    }

    // const filteredIcons = icons.filter((icon) => selectedCategory === 'All' || icon.category === selectedCategory);

    const handleCategorySelection = (category: string) => {
        setSelectedCategory(category)
      }

    return (
        <Modal className="achievement-modal" onHide={() => getActivities()} onShow={() => getActivities()}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="event-modal-title">Progression</div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="progress-bar">
                    <ProgressBar now={0} />
                </div>

                <AchievementModalFilterList handle={handleCategorySelection} selected={selectedCategory}/>


            </Modal.Body>

            <Modal.Footer>
                footer
            </Modal.Footer>
        </Modal>
    );
}

function AchievementModalFilterList(props: any) {
    return (
        <div className="icon-filter">
        <h5>Filter by Category</h5>
        <ul>
          <li onClick={() => props.handleCategorySelection('All')} className={props.selectedCategory === 'All' ? 'active' : ''}>
            All
          </li>
          <li onClick={() => props.handleCategorySelection('Category 1')} className={props.selectedCategory === 'Category 1' ? 'active' : ''}>
            Category 1
          </li>
          <li onClick={() => props.handleCategorySelection('Category 2')} className={props.selectedCategory === 'Category 2' ? 'active' : ''}>
            Category 2
          </li>
        </ul>
      </div>
    )
}