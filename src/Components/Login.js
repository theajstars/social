import { Typography, FormControlLabel, Checkbox } from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isRemember, setRemember] = useState(false)
    const [isButtonAnimation, setButtonAnimation] = useState(false)

    const loginButtonRef = useRef();

    function loginUser(e){
        setButtonAnimation(true)
        loginButtonRef.current.innerHTML = 'Signing in.. <i class="fal fa-spinner fa-spin"></i>';
    }
    return (
        <div className="login-container">
            <div className="bg-dots">
                <div className="bg-dot bg-dot-1"></div>
                <div className="bg-dot bg-dot-2"></div>
                <div className="bg-dot bg-dot-3"></div>
                <div className="bg-dot bg-dot-4"></div>
                <div className="bg-dot bg-dot-5"></div>
            </div>
            <div className="login-content-container">
                <div className="login-content">
                    <Typography variant="h5" className="text-light">
                        <center>
                            Login
                        </center>
                    </Typography>
                    <form action="#" id="login-form">
                        <input type="text"
                            className="form-input"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Username"
                            name="username"
                        />
                        <br />
                        <input type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            name="password"
                        />
                        <div className="remember-me">
                            <FormControlLabel
                                control={
                                    <Checkbox checked={isRemember}
                                        onChange={
                                            () => setRemember(!isRemember)
                                        }
                                        name="checkedA"
                                    />
                                    }
                            />
                            Remember me
                        </div>
                        <span
                            className={`bg-dark text-light login-btn c_pointer ${isButtonAnimation ? "button-animate" : ""}`}
                            ref={loginButtonRef}
                            onClick={(e) => loginUser(e)}
                        >
                            Continue
                        </span>
                        <div className="new-here text-light">
                            <span>
                                New here?
                            </span>
                            <Link to="/register" className="text-light">
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
