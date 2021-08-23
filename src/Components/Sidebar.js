import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../App'
import '../Assets/CSS/Sidebar.css'

function Sidebar() {
    const [isUserActionsVisible, setUserActionsVisibility] = useState(false)
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar">
                    <div className="sidebar-links">
                        <Link to="/dashboard" className="sidebar-icon sidebar-link">
                            <i className="fal fa-newspaper"></i>
                        </Link>
                        <Link to="/dashboard" className="sidebar-icon sidebar-link">
                            <i className="fal fa-comment-alt-lines"></i>
                        </Link>
                        <Link to="/dashboard" className="sidebar-icon sidebar-link">
                            <i className="fal fa-poll"></i>
                        </Link>
                        <Link to="/dashboard" className="sidebar-icon sidebar-link">
                            <i className="fal fa-bookmark"></i>
                        </Link>
                    </div>
                    <Link to="/dashboard" className="sidebar-icon sidebar-link sidebar-settings-icon">
                        <i className="fal fa-cog"></i>
                    </Link>
                </div>
            </div>
            <div className="sidebar-right">
                <span className="sidebar-icon user-icon"
                    onClick={() => {
                        setUserActionsVisibility(!isUserActionsVisible)
                    }}
                >
                    <i className="far fa-user"></i>
                </span>
                <div className={`${isUserActionsVisible ? "sidebar-right-content" : "sidebar-right-content-hide"}`}>
                    <Link to="/dashboard" className="user-link">
                        Profile
                    </Link>
                    <Link to="/dashboard" className="user-link">
                        Account settings
                    </Link>
                    <Link to="/sdashboard" className="user-link">
                        Contact developer
                    </Link>
                    <Link to="/dashboard" className="user-link"
                        onClick={() => logoutUser()}
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar
