import axios from 'axios'
import React, { useEffect } from 'react'
import '../Assets/CSS/Dashboard.css'


import Sidebar from './Sidebar'

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar/>
        </div>
    )
}

export default Dashboard
