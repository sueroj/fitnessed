import React, { useState, useEffect } from 'react';
import './list_view.css';

type Props = {
}

export default function ListView(props: Props) {

    return (
        <div className='list-view'>
            <Filter />

            <div className='list-view-spacer'/>

            <List />
        </div>
    );
}

export function Filter(props: Props) {

    return (
        <div className='filter'>
            Filter
        </div>
    );
}

export function List(props: Props) {

    return (
        <div className='list'>
            List
        </div>
    );
}