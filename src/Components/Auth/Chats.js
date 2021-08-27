import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import '../../Assets/CSS/Dashboard.css'
import '../../Assets/CSS/Chats.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { animateScroll } from 'react-scroll'

function Chats() {
    function scrollToBottom(){
        animateScroll.scrollToBottom({
            containerId: "chat-area"
        });
    }
    function renderChat(current){
        console.log(currentContact)
        setCurrentContact(current)
        setRenderChatVisibility(true)
        setTimeout(() => {
            scrollToBottom();
        }, 500)
        
    }

    function getTimeStamp(dateString){
        var d = new Date(dateString)
        var hours = d.getHours()
        var minutes = d.getMinutes()

        if(hours < 10){
            hours = `0{${hours}}`
        }
        if(minutes < 10){
            minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
    }
    
    const [chatSearch, setChatSearch] = useState('');
    const [isSearchPeopleShowing, setSearchPeopleShow] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    const [token, setToken] = useState(Cookies.get("ud"))
    const [newMessage, setNewMessage] = useState('');

    
    const [userDetails, setUserDetails] = useState({})
    const [messages, setMessages] = useState([])
    const [isRenderChatVisible, setRenderChatVisibility] = useState(false)
    const [currentContact, setCurrentContact] = useState({messages: []})

    const chatAreaRef = useRef();
    const scrollToRef = useRef();

    useEffect(() => {
        axios.post('http://localhost:8080/user/chats', {id: token})
            .then(response => {
                console.log(response)
                setUserDetails(response.data)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    useEffect(() => {
        if(Object.entries(userDetails).length !== 0){
            userDetails.messages.map((eachMessage) => {
                if(Object.entries(eachMessage).length === 0){

                }
                else{
                    console.log("A message: ", eachMessage);
                    axios.post('http://localhost:8080/chat/get', {user_id: eachMessage.id})
                        .then(response => {
                            console.log(response)
                            setMessages(prevMessages => [...prevMessages, {name: response.data.name, email: response.data.email, username: response.data.username, avatar: response.data.avatar, messages: eachMessage.messages, id: eachMessage.id}])
                        })
                }
                
            })
        }
    }, [userDetails])

    useEffect(() => {
        console.log("Current messages: ", messages)
    }, [messages])
    useEffect(() => {
        if(chatSearch.length > 0){
            axios.post('http://localhost:8080/users/find', {string: chatSearch})
            .then(res => {
                console.clear()
                console.log(res)
                setSearchResults(res.data)
            })
        }else{
            setSearchResults([])
        }
        
    }, [chatSearch])

    function selectChat(contact){
        console.log(contact)
        setRenderChatVisibility(true)
        axios.post('http://localhost:8080/users/get_chat', {username: contact})
            .then(res => {
                console.log(res);
            })
    }

    function sendMessage(){
        console.clear()
        
        var object = {
            recipient: currentContact.id,
            sender: userDetails._id,
            message: newMessage
        }
        console.log(messages)
        var messageOBJ = {
            type: "sent",
            body: newMessage,
            timestamp: Date.now()
        }
        var cm = currentContact.messages
        cm.push(messageOBJ)
        setCurrentContact({...currentContact, messages: cm})
        axios.post('http://localhost:8080/chats/update', object)
            
            setNewMessage("")
            console.clear()
            
            setTimeout(() => {
                var chatArea = document.getElementById("chat-area");
                var lastMessage = chatArea.lastChild
                scrollToBottom()
            }, 100)
            
            
    }
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
                                    onFocus={() => setSearchPeopleShow(true)}
                                    onBlur={() => setSearchPeopleShow(false)}
                                />
                            </center>
                        </div>
                        <div
                            className={`search-people ${isSearchPeopleShowing ? "search-people-show" : "search-people-hide"}`}
                        >
                            {
                                searchResults.map(search_result => {
                                    return(
                                        <div key={search_result.username}
                                            className="search-result"
                                            onClick={() => {
                                                setCurrentContact(search_result)
                                                console.log(currentContact)
                                                selectChat(search_result.username);
                                            }}
                                        >
                                            <img src={search_result.profileURL}
                                                className="search-result-avatar"
                                            />
                                            <span className="search-result-details">
                                                <span className="search-result-name">
                                                    {search_result.name}
                                                </span>
                                                <span className="search-result-username">
                                                    @{search_result.username}
                                                </span>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={`contacts-list`}>
                           
                            {
                                messages.map(message => {
                                    var messageLength = message.messages.length;
                                    var lastMessage;
                                    if(messageLength > 0){
                                        lastMessage = message.messages[messageLength - 1];
                                    }
                                    var d = new Date(lastMessage.timestamp)
                                    var minutes = d.getMinutes()
                                    var hours = d.getHours()
                                    if(hours < 10){
                                        hours = `0{${hours}}`
                                    }
                                    if(minutes < 10){
                                        minutes = `0${minutes}`;
                                    }
                                    var timestamp = `${hours}:${minutes}`;

                                    return(
                                        <div
                                            key={message.username}
                                            className="contact"
                                            onClick={() => renderChat(message)}
                                        >
                                            <div className="contact-properties">
                                                <img src={message.avatar}
                                                    className="contact-image"
                                                />
                                                <div className="contact-details">
                                                    <span className="name">
                                                        {message.name}
                                                    </span>
                                                    <span className="message">
                                                        {lastMessage.body}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="time">
                                                {timestamp}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className={`${isRenderChatVisible ? "render-chat-show" : "render-chat-hide"}`}>
                        {/* <span className="current-contact-name">
                            Dr Braavosi
                        </span> */}
                        <span className="current-contact-name">
                            {currentContact.name}
                        </span>
                        <div id="chat-area" className="chats-area" ref={chatAreaRef}>
                            {
                                currentContact.messages.map(message => {
                                    if(Object.keys(message).length > 0){
                                        if(message.type === "received"){
                                            return(
                                                <div className="chat-container received">
                                                    <div className="chat received-chat">
                                                        <div className="chat-inside">
                                                            <p className="chat-content">
                                                                {message.body}
                                                            </p>
                                                            <div className="chat-timestamp">
                                                                {getTimeStamp(message.timestamp)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }else if(message.type === "sent"){
                                            return(
                                                <div className="chat-container sent">
                                                    <div className="chat sent-chat">
                                                        <div className="chat-inside">
                                                            <p className="chat-content">
                                                                {message.body}
                                                            </p>
                                                            <span className="chat-timestamp">
                                                                {getTimeStamp(message.timestamp)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    }
                                })
                            }
                            
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
