import React from 'react'

import { citiesLookup } from './Dashboard';

export function PersonDetailPanel(props) {
    const personInfo = props.personInfo;
    return (
        <div style={{ "display": "flex", "justifyContent": "center" }}>
            <p>{`${personInfo.name} ${personInfo.surname} was born in ${personInfo.birthYear} at ${citiesLookup[personInfo.birthCity]}`}</p>
        </div>
    )
}

export default PersonDetailPanel
