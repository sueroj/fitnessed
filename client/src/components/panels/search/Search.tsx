import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './search.css';

type Props = {
}

export default function Search(props: Props) {


    return (
        <div className='search'>
            <Form>
                <Form.Group className="search-form" controlId="search-form">
                    <Form.Control type="text" placeholder="Search" />
                </Form.Group>
            </Form>
        </div>
    );
}
