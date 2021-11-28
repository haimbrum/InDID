import React from 'react'

export default function ({data}) {
    const object = JSON.parse(data);
    const keys = Object.keys(object)
    return <>
        {keys.map((key) => <h4 key={key}>
        <b>{key}</b>{": "}{object[key]}
        </h4>)}
    </>
}