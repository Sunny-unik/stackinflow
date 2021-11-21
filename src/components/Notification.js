import React from 'react'
import {  useSelector } from "react-redux"
import axios from "axios"

export default function Notification() {

    const user = useSelector(state => state.user);

    return (
        <div style={{minHeight:'80vh'}}>
            <div> someone liked your question </div>
            <h2> someone answered your question </h2>
            <h3> someone disliked your answer </h3>
        </div>
    )
}
