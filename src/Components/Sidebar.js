import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../App'
import '../Assets/CSS/Sidebar.css'

function Sidebar() {
    const [isUserActionsVisible, setUserActionsVisibility] = useState(false)
    return (
        <>
            <div className="sidebar-right">
                <span className="user-icon"
                    onClick={() => {
                        setUserActionsVisibility(!isUserActionsVisible)
                    }}
                >
                    <i className="far fa-user"></i>
                </span>
                <div className={`${isUserActionsVisible ? "sidebar-right-content" : "sidebar-right-content-hide"}`}>
                    <Link to="/profile" className="user-link">
                        Profile
                    </Link>
                    <Link to="/contact" className="user-link">
                        Contact developer
                    </Link>
                    <Link to="/" className="user-link"
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
