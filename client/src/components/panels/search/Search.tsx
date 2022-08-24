import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Autosuggest from 'react-autosuggest'
import './search.css';

type Props = {
}

export default function Search(props: Props) {
    const [value, set_value] = useState('')
    const [suggestions, set_suggestions] = useState([])
    const input_props = {
        placeholder: 'Test',
        onchange: update_on_change
    }

    function update_on_change(event: any, new_value: any) {
        set_value(new_value)
    }

    function suggestions_fetch_request(value: any) {
        // set_suggestions()
    }

    function suggestions_clear_request() {
        // set_suggestions([])
    }

    function get_suggestion_value(suggestion: any) {
        suggestion.name = suggestion
    }

    function render_suggestion(suggestion: any) {
        <div>
            {suggestion.name}
        </div>
    }

    return (
        <div className='search'>
            <Form>
                <Form.Group className="search-form" controlId="search-form">
                    <Form.Control type="text" placeholder="Search" />
                </Form.Group>
            </Form>

            {/* <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={() => suggestions_fetch_request}
                onSuggestionsClearRequested={() => suggestions_clear_request}
                // getSuggestionValue={() => get_suggestion_value}
                renderSuggestion={() => render_suggestion}
                // inputProps={}
            /> */}
        </div>
    );
}
