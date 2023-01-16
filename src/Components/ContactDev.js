import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Assets/CSS/ContactDev.css";
import Sidebar from "./Sidebar";
function ContactDev() {
  const [userToken, setUserToken] = useState(Cookies.get("ud"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textareaError, setTextareaError] = useState(false);

  const [isMessageSent, setMessageSentVisibility] = useState(false);

  const submitButtonRef = useRef();
  useEffect(() => {
    if (userToken) {
      axios
        .post("https://shattapp-api.onrender.com/user/details", {
          id: userToken,
        })
        .then((res) => {
          setName(res.data.userDetails.name);
          setEmail(res.data.userDetails.email);
        });
    }
  }, []);
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function submitForm(e) {
    e.preventDefault();
    var emailValid = validateEmail(email);
    if (emailValid && name.length > 3 && message.length > 0) {
      //Form is valid
      var postMessage = {
        name: name,
        email: email,
        message: message,
      };
      submitButtonRef.current.innerHTML =
        '<i class="fal fa-spinner fa-spin"></i>';
      var postURL = "https://shattapp-api.onrender.com/contact_dev";
      axios.post(postURL, postMessage).then((res) => {
        submitButtonRef.current.innerHTML = "Submit Message";
        if (res.data.sent === true) {
          // If message sent successfully
          setMessageSentVisibility(true);
          setMessage("");
          setTimeout(() => setMessageSentVisibility(false), 2000);
        }
      });
    }
    if (!emailValid) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (name.length < 4) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (message.length === 0) {
      setTextareaError(true);
    } else {
      setTextareaError(false);
    }
  }
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div
        className={`sent-message ${
          isMessageSent ? "message-sent-show" : "message-sent-hide"
        }`}
      >
        <span>
          <i className="far fa-check"></i>
        </span>
        <p>Your message was delivered!</p>
      </div>
      <div className="contact-dev">
        <Link to="/chats" className="back-dev back-to-chats">
          <i className="far fa-angle-left"></i>&nbsp;Chats
        </Link>
        <form onSubmit={(e) => submitForm(e)} className="contact-dev-form">
          <div className="contact-form-row">
            <div className="contact-form-element">
              <span className="label">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="auto-name-name"
                autoComplete="off"
                spellCheck="false"
                className={`contact-form-text ${
                  nameError ? "contact-element-error" : ""
                }`}
                required
              />
            </div>

            <div className="contact-form-element">
              <span className="label">Email</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                spellCheck="false"
                className={`contact-form-text ${
                  emailError ? "contact-element-error" : ""
                }`}
                required
              />
            </div>
          </div>
          <br />
          <div
            className={`textarea-container ${
              textareaError ? "contact-element-error" : ""
            }`}
          >
            <textarea
              className="contact-form-textarea"
              cols="30"
              rows="10"
              spellCheck="false"
              maxLength={550}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              style={{ resize: "none" }}
            ></textarea>
            <div className="word-count">{message.length + "/550"}</div>
          </div>
          <br />
          <br />
          <button
            type="submit"
            class="c_pointer bg-dark text-light form-btn update-btn contact-btn"
            ref={submitButtonRef}
          >
            Submit Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactDev;
