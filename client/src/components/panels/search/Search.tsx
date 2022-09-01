import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import './search.css';

import Challenges from 'core/libs/challenges'


type Props = {
    challenges: Challenges
    set_fly_to_coords: Function
}

export default function Search(props: Props) {
    const [value, set_value] = useState('')
    const [hide_autosuggest, set_hide_autosuggest] = useState(true)

    function update_search_value(event: React.ChangeEvent<any>) {
        set_value(event.target.value)
    }

    function generate_autosuggest() { // TODO: CREATE test for this function
        // Generate autosuggestions based on search form value, matches characters

        // Match characters in string arrays of value vs. challenge names
        const challenge_names: any[] = []
        for (let challenge of props.challenges.mappable) {
            let challenge_match = challenge.name.slice(0, value.length)
            if (value === challenge_match && challenge_names.length < 5){
                challenge_names.push(
                <div key={`autosuggest-${challenge.name}`} className={'search-autosuggest-list-item'} 
                onClick={() => {props.set_fly_to_coords(challenge.start_coords)}}>{challenge.name}</div>
                )
            }
        }

        // Fill rest of results up to 5
        for (let challenge of props.challenges.mappable) {
            if (challenge_names.length < 5) {
                challenge_names.push(
                <div key={`autosuggest-${challenge.name}`} className={'search-autosuggest-list-item'}
                onClick={() => {props.set_fly_to_coords(challenge.start_coords)}}>{challenge.name}</div>
                )
            }
        }
        return challenge_names
    }

    return (
        <div className='search'>
            <Form>
                <Form.Group className="search-form" controlId="search-form">
                    <Form.Control type="text" onFocus={() => set_hide_autosuggest(false)} onBlur={() => setTimeout(() => set_hide_autosuggest(true), 100)} onChange={(event) => update_search_value(event)} placeholder="Search" />
                </Form.Group>
            </Form>

            <div className='search-autosuggest' hidden={hide_autosuggest}>
                { hide_autosuggest === false ? generate_autosuggest(): null }
            </div>
        </div>
    );
}
