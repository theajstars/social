import axios from 'axios'
import React, { useEffect } from 'react'

function Dashboard() {
    useEffect(() => {
        axios.get('http://localhost:8080/j')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])
    return (
        <div>
            <h2>The Dashboard</h2>
        </div>
    )
}

export default Dashboard
