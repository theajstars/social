import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import '../../Assets/CSS/Profile.css'
import axios from 'axios'
import Cookies from 'js-cookie'
export default function Profile() {

    // Retrieve User Token
    const [userToken, setUserToken] = useState(Cookies.get("ud"));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profileURL, setProfileURL ] = useState('');
    
    const [showBgOverlay, setBgOverlayShow] = useState(false)
    const [updateErrorsDisplay, setUpdateErrorsDisplay] = useState(false)

    const [isUsernameError, setUsernameError] = useState(false)
    const [isNameError, setNameError] = useState(false)
    useEffect(() => {
        axios.post('http://localhost:8080/user/profile', {userToken: userToken})
            .then(res => {
                console.log(res.data)
                setName(res.data.name)
                setEmail(res.data.email)
                setUsername(res.data.username)
                setProfileURL(res.data.profileURL)
                
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    function updateProfile(e){
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        e.preventDefault();
        var aliasError = false
        

        var error = false
        if(username.length >= 4 && validateEmail(email) && name.length > 4){
            axios.post('http://localhost:8080/user/validate', {username: username, email: email, token: userToken})
            .then(res => {
                console.clear()
                console.log(res);
                aliasError =  res.data.error ? true : false
                if(res.data.error === false){
                    axios.post('http://localhost:8080/user/update', {name: name, username: username, email: email, token: userToken})
                        .then(response => {
                            console.log(response)
                        })
                        .catch(err => {
                            console.error(err)
                        })
                }
            })
        }else{
            // Some error with form
        }
        if(username.length < 4 || aliasError || !validateEmail(email)){
            setBgOverlayShow(true);
            setUpdateErrorsDisplay(true)
            setUsernameError(true);
        }else{
            setBgOverlayShow(false);
            setUsernameError(false);
        }
        if(name.length < 4){
            setBgOverlayShow(true);
            setUpdateErrorsDisplay(true)
            setNameError(true);
        }else{
            setBgOverlayShow(false);
            setNameError(false);
        }
    }
    
    return (
        <div className="dashboard-container"
            onClick={() => {
                setBgOverlayShow(false);
                setUpdateErrorsDisplay(false);
            }
        }>
            <Sidebar/>
            <div className={`${showBgOverlay ? "bg-overlay-show" : "bg-overlay-hide"}`}></div>
            <div className={`${updateErrorsDisplay ? "update-errors-show" : "update-errors-hide"}`}>
                <div
                    className={`${isUsernameError ? "update-error-show" : "update-error-hide"}`}
                >
                    <span className="error-icon">
                        <i className="far fa-exclamation-circle"></i>
                    </span>
                    <p>
                        Email/Username already exists or is invalid!
                    </p>
                </div>
                <div
                    className={`${isNameError ? "update-error-show" : "update-error-hide"}`}
                >
                    <span className="error-icon">
                        <i className="far fa-exclamation-circle"></i>
                    </span>
                    <p>
                        Please enter your full name!
                    </p>
                </div>
            </div>
            <div className="profile-main">
                <div className="profile-left">
                    <img src={profileURL}
                        alt="profileAva"
                        className="profile-avatar"
                    />
                    <span className="profile-name">
                        {name}
                    </span>
                    <span className="profile-username">
                        @{username}
                    </span>
                </div>
                <div className="profile-right">
                    <form action="" onSubmit={(e) => updateProfile(e)} autoComplete="false">
                        <div className="edit-profile-row">
                            <div className="edit-profile-element">
                                <span className="label">Name</span>
                                <input type="text"
                                    value={name}
                                    autoComplete="new-name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="edit-profile-text"
                                    spellCheck="false"
                                />
                            </div>
                            <div className="edit-profile-element">
                                <span className="label">Email</span>
                                <input type="text"
                                    className="edit-profile-text"
                                    // autoComplete="new-email"
                                    spellCheck="false"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="edit-profile-row">
                            <div className="edit-profile-element">
                                <span className="label">Username</span>
                                <input type="text"
                                    className="edit-profile-text"
                                    autoComplete="new-username"
                                    spellCheck="false"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit"
                            className="c_pointer bg-dark text-light form-btn"
                            // disabled={true}
                        >
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

