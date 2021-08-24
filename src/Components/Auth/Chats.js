import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import '../../Assets/CSS/Dashboard.css'
import '../../Assets/CSS/Chats.css'
import axios from 'axios';
import Cookies from 'js-cookie';

function Chats() {
    function renderChat(){
        alert("Chat rendered!")
    }
    function sendMessage(){
        alert(newMessage)
    }
    const [chatSearch, setChatSearch] = useState('');
    const [token, setToken] = useState(Cookies.get("ud"))
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
        axios.post('http://localhost:8080/friends', {id: token})
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])
    useEffect(() => {
        console.log(chatSearch)
    }, [chatSearch])
    return (
        <div className="dashboard-container">
            <Sidebar/>
            <div className="dashboard-main">

                <div className="chat-section">
                    <div className="contacts">
                        <div className="search-chats">
                            <center>
                                <input type="text" 
                                    className="search"
                                    placeholder="Search people"
                                    value={chatSearch}
                                    onChange={(e) =>{
                                        setChatSearch(e.target.value)
                                    }}
                                />
                            </center>
                        </div>
                        <div className={`contacts-list`}>
                            <div className="contact"
                                onClick={() => {renderChat()}}
                            >
                                <div className="contact-properties">
                                    <img src="https://image.flaticon.com/icons/png/512/3135/3135715.png" alt="" className="contact-image" />
                                    <div className="contact-details">
                                        <span className="name">Glad</span>
                                        <span className="message">
                                            Where will we go?
                                        </span>
                                    </div>
                                </div>
                                <span className="time">
                                    12:45pm
                                </span>
                            </div>
                            <div className="contact"
                                onClick={() => {renderChat()}}
                            >
                                <div className="contact-properties">
                                    <img src="https://image.flaticon.com/icons/png/512/3135/3135715.png" alt="" className="contact-image" />
                                    <div className="contact-details">
                                        <span className="name">Stannis Baratheon</span>
                                        <span className="message">
                                            We do not choose our destiny no?
                                        </span>
                                    </div>
                                </div>
                                <span className="time">
                                    Yesterday
                                </span>
                            </div>
                            <div className="contact"
                                onClick={() => {renderChat()}}
                            >
                                <div className="contact-properties">
                                    <img src="https://image.flaticon.com/icons/png/512/3135/3135715.png" alt="" className="contact-image" />
                                    <div className="contact-details">
                                        <span className="name">Dr Braavosi</span>
                                        <span className="message">
                                            Eat spaghetti, write React 🐇
                                        </span>
                                    </div>
                                </div>
                                <span className="time">
                                    11/10/2020
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="render-chat">
                        <span className="current-contact-name">
                            Dr Braavosi
                        </span>
                        <div className="chats-area">
                            <div className="chat-container received">
                                <div className="chat received-chat">
                                    <div className="chat-inside">
                                        <p className="chat-content">
                                        This is the exact response I was seeking for. This is the exact response I was seeking for
                                        </p>
                                        <div className="chat-timestamp">
                                            12:23pm
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="chat-container sent">
                                <div className="chat sent-chat">
                                    <div className="chat-inside">
                                        <p className="chat-content">
                                        Why do you think I care?
                                        </p>
                                        <span className="chat-timestamp">
                                            12:23pm
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="send-message-container">
                            <div className="send-message">
                                <input type="text"
                                placeholder="Send message"
                                    spellCheck="false"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if(e.key === 'Enter'){
                                            sendMessage()
                                        }
                                    }}
                                />
                                <button className="submit-message"
                                    onClick={() => sendMessage()}
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
