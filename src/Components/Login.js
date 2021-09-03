import { Typography, FormControlLabel, Checkbox } from '@material-ui/core'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Login() {
    useEffect(() => {
        var token = Cookies.get("ud")
        if(token !== undefined){
            window.location.href =  "/chats"
        }
    }, [])

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isRemember, setRemember] = useState(true)
    const [isButtonAnimation, setButtonAnimation] = useState(false)

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)
    const loginButtonRef = useRef();

    const [showAuthError, setAuthError] = useState(false)
    function validateForm(){
        return new Promise((resolve, reject) => {
            var userError = userName.length <= 4 ? true : false;
            var passwordError = password.length <= 6 ? true : false;

            setTimeout(() => {
                resolve({
                    userError: userError,
                    passwordError: passwordError
                });
            }, 300)
            
        })
    }
    function loginUser(e){
        e.preventDefault()
        validateForm().then(errors => {
            if(errors.userError || errors.passwordError){
                setIsLoginButtonDisabled(false)
            }else{
                setButtonAnimation(true)
                setIsLoginButtonDisabled(true)
                loginButtonRef.current.innerHTML = 'Signing in.. <i class="fal fa-spinner fa-spin"></i>';
                axios.post("https://drbravo-shattapp-api.herokuapp.com/user/login", {username: userName, password: password})
                .then(res => {
                    if(res.data.status === true){
                        
                        Cookies.set("ud", res.data.token, {expires : isRemember === true ? 30 : 1})
                        window.location.href = '/chats'
                        setAuthError(false)
                        
                    }else{
                        //Username and/or password is invalid
                        setAuthError(true)
                        setButtonAnimation(false)
                        setIsLoginButtonDisabled(false)
                        loginButtonRef.current.innerHTML = 'Continue';
                        setTimeout(() => {
                            setAuthError(false)
                        }, 2000)
                    }
                })
            }
        })
    }
    return (
        <div className="login-container">
            <div className={`auth-error ${showAuthError ? "auth-error-show" : "auth-error-hide"}`}>
                <span className="auth-error-icon">
                    <i className="far fa-exclamation-circle"></i>
                </span>
                <p>
                    Login details invalid!
                </p>
            </div>
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
                            spellCheck="false"
                            name="username"
                        />
                        <br />
                        <input type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            name="password"
                            spellCheck="false"
                        />
                        <div className="remember-me">
                            <FormControlLabel
                                control={
                                    <Checkbox checked={isRemember}
                                        color="primary"
                                        value={isRemember}
                                        onChange={
                                            () => setRemember(!isRemember)
                                        }
                                        name="rememberMe"
                                    />
                                    }
                            />
                            Remember me
                        </div>
                        <button
                            className={`bg-dark text-light form-btn c_pointer ${isButtonAnimation ? "button-animate" : ""}`}
                            ref={loginButtonRef}
                            onClick={(e) => loginUser(e)}
                            disabled={isLoginButtonDisabled}
                        >
                            Continue
                        </button>
                        <div className="new-here text-light">
                            <span>
                                Don't have an account?
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
