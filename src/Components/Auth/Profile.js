import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import '../../Assets/CSS/Profile.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

export default function Profile() {
    var profileURLs = [
        "https://i.imgur.com/op4VpH7.png",
        "https://i.imgur.com/PAHRVpM.png",
        "https://i.imgur.com/779J2JC.png",
        "https://i.imgur.com/o9axORP.png",
        "https://i.imgur.com/URXtNOi.png",
        "https://i.imgur.com/jmnVMBf.png",
        "https://i.imgur.com/3uXKLBx.png",
        "https://i.imgur.com/HGzbvK0.png",
        "https://i.imgur.com/zxMLcE0.png",
        "https://i.imgur.com/o9UUr2r.png",
        "https://i.imgur.com/vxDbnGW.png",
        "https://i.imgur.com/akiw69K.png",
        "https://i.imgur.com/g8c8X03.png",
        "https://i.imgur.com/xpz9C3V.png",
        "https://i.imgur.com/8OULeB0.png",
        "https://i.imgur.com/wOEgc4a.png",
        "https://i.imgur.com/Zei1eW3.png",
        "https://i.imgur.com/f3BDx1h.png",
        "https://i.imgur.com/kV8aprk.png",
        "https://i.imgur.com/VSJenR4.png"
    ]
    // Retrieve User Token
    const [userToken, setUserToken] = useState(Cookies.get("ud"));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileURL, setProfileURL ] = useState('');
    
    const [showBgOverlay, setBgOverlayShow] = useState("bg-overlay-hide")
    const [updateErrorsDisplay, setUpdateErrorsDisplay] = useState(false)

    const [showAvatars, setShowAvatars] = useState(false)
    const [profileResponseIcon, setProfileResponseIcon] = useState('')
    const [profileResponseText, setProfileResponseText] = useState('')
    const [isNameError, setNameError] = useState(false)

    const [isProfileUpdated, setProfileUpdated] = useState(false)
    const [updateMessage, setUpdateMessage] = useState("")

    useEffect(() => {
        axios.post('https://drbravo-shattapp-api.herokuapp.com/user/profile', {userToken: userToken})
            .then(res => {
                console.log(res.data)
                setName(res.data.name)
                setEmail(res.data.email)
                setProfileURL(res.data.profileURL)  
            })
            .catch(err => {
                console.error(err)
            })
    }, [])
    function selectAvatar(e){
        setProfileURL(e.target.src)
        setShowAvatars(false)
    }
    function updateProfile(e){
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        e.preventDefault();
        var aliasError = false
    
        if(validateEmail(email) && name.length > 4){
            axios.post('https://drbravo-shattapp-api.herokuapp.com/user/validate', {email: email, token: userToken})
            .then(res => {
                console.clear()
                console.log(res);
                aliasError =  res.data.error ? true : false
                if(res.data.error === false){
                    setUpdateMessage("Your profile was updated!")
                    // No errors exists so update user profile
                    setProfileUpdated(true)
                    axios.post('https://drbravo-shattapp-api.herokuapp.com/user/update', 
                        {
                            name: name,
                            email: email,
                            token: userToken,
                            profileURL: profileURL
                        })
                        .then(response => {
                            console.log(response)
                            setTimeout(() => {
                                setProfileUpdated(false)
                            }, 2000)

                        })
                        .catch(err => {
                            console.error(err)
                        })
                }
            })
        }else{
            // Some error with form
        }
        if(aliasError || !validateEmail(email)){
            setBgOverlayShow("bg-overlay-show");
            setUpdateErrorsDisplay(true)
        }else{
            setBgOverlayShow("bg-overlay-hide");
        }
        if(name.length < 4){
            setBgOverlayShow("bg-overlay-show");
            setUpdateErrorsDisplay(true)
            setNameError(true);
        }else{
            setBgOverlayShow("bg-overlay-hide");
            setNameError(false);
        }
    }
    
    return (
        <div className="dashboard-container"
            onClick={() => {
                setBgOverlayShow("bg-overlay-hide");
                // setBgOverlayShow(false);
                setUpdateErrorsDisplay(false);
            }}
        >
            <Sidebar/>
            <div
                className={`sent-message ${isProfileUpdated ? "message-sent-show" : "message-sent-hide"}`}
            >
                <span>
                    <i className="far fa-check"></i>
                </span>
                <p>
                    {updateMessage}
                </p>
            </div>
            <div className={`${showBgOverlay}`}></div>
            <div className="profile-response">
                <span className="response-icon">{profileResponseIcon}</span>
                <p className="response-text">{profileResponseText}</p>
            </div>
            <div className="profile-main">
                <div className="profile-left">
                    <Link to="/chats" className="back-to-chats">
                        <i className="far fa-angle-left"></i>&nbsp;Chats
                    </Link>
                    <img src={profileURL}
                        alt="profileAva"
                        className="profile-avatar"
                        onClick={() => {
                            setShowAvatars(true);
                        }}
                    />
                    <span className="profile-name">
                        {name}
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
                        <br />
                        <button type="submit"
                            className="c_pointer bg-dark text-light form-btn update-btn"
                            // disabled={true}
                        >
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
            <div className={`${showAvatars ? "avatar-display-show" : "avatar-display-hide"}`}>
                <div className="avatar-row">
                    <img src={profileURLs[0]} alt="" className="avatar-option" 
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[1]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[2]} alt="" className="avatar-option" 
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[3]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                </div>
                <div className="avatar-row">
                    <img src={profileURLs[4]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[5]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[6]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[7]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                </div>
                <div className="avatar-row">
                    <img src={profileURLs[8]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[9]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[10]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[11]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                </div>
                <div className="avatar-row">
                    <img src={profileURLs[12]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[13]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[14]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[15]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                </div>
                <div className="avatar-row">
                    <img src={profileURLs[16]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[17]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[18]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                    <img src={profileURLs[19]} alt="" className="avatar-option"
                        onClick={(e) => {
                            selectAvatar(e);
                            setBgOverlayShow("bg-overlay-show")
                        }}
                    />
                </div>
            </div>
        </div>
        
    )
}

