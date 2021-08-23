import axios from 'axios'
import React, { useEffect } from 'react'
import '../Assets/CSS/Dashboard.css'

import Sidebar from './Sidebar'

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
        <div className="dashboard-container">
            <Sidebar/>
        </div>
    )
}

export default Dashboard
