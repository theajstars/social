import { Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../Assets/CSS/Register.css'



export default function Register() {
    useEffect(() => {
        var token = Cookies.get("ud")
        if(token !== undefined){
            window.location.href =  "/dashboard"
        }
    }, [])
    const registerButtonRef = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [isTermsAccepted, setTermsAccepted] = useState(false)
    const [isButtonAnimation, setButtonAnimation] = useState(false)
    const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(false)

    const [alphabetTest, setAlphabetTest] = useState(false)
    const [numberOfCharactersTest, setNumberOfCharactersTest] = useState(false)
    const [numericTest, setNumericTest] = useState(false)
    const [specialTest, setSpecialTest] = useState(false)


    const [isTermsErrorClass, setTermsErrorClass] = useState(false)
    const [confrimPasswordError, setConfrimPasswordError] = useState(false)
    const [showPasswordWarnings, setShowPasswordWarnings] = useState(false)

    useEffect(() => {
        var alphabetReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
        var numericReg = new RegExp("^(?=.*[0-9])");
        var specialReg = new RegExp("^(?=.*[!@#$%^&*])");
        var lengthReg = new RegExp("^(?=.{8,})");

        alphabetReg.test(password) ? setAlphabetTest(true) : setAlphabetTest(false)
        numericReg.test(password) ? setNumericTest(true) : setNumericTest(false)
        specialReg.test(password) ? setSpecialTest(true) : setSpecialTest(false)
        lengthReg.test(password) ? setNumberOfCharactersTest(true) : setNumberOfCharactersTest(false)

    }, [password])

    useEffect(() => {
        password === passwordConfirm ? setConfrimPasswordError(false) : setConfrimPasswordError(true)
    }, [passwordConfirm])

    useEffect(() => {
        isTermsAccepted ? setTermsErrorClass(false) : setTermsErrorClass(true)
    }, [isTermsAccepted])

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function validatePassword(password) {
        var Regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return Regex.test(password);
    }
    function validateForm(){
        return new Promise((resolve, reject) => {
            var nameError = name.length <= 4 ? true : false
            var emailError = !validateEmail(email)
            var userNameError = userName.length <= 4 ? true : false
            var isTermsAcceptedError = !isTermsAccepted;
            var passwordError = password !== passwordConfirm || confrimPasswordError || password.length === 0 || validatePassword(password) === false

            setTimeout(() => {
                resolve({
                    nameError: nameError,
                    emailError: emailError,
                    userNameError: userNameError,
                    isTermsAcceptedError: isTermsAcceptedError,
                    passwordError: passwordError
                });
            }, 300)
        })
    }
    function registerUser(e){
        console.log(validatePassword(password))
        console.log(`Email: ${email}`)
        e.preventDefault()
        validateForm().then(errors => {
            
            if(errors.nameError || errors.emailError || errors.userNameError || errors.isTermsAcceptedError){
                console.clear()
                console.error(errors)
                setIsRegisterButtonDisabled(false)
                if(errors.isTermsAcceptedError){
                    console.log("Please accept terms")
                    setTermsErrorClass(true)
                }else{
                    setTermsErrorClass(false)
                }
            }else{
                axios.post('http://localhost:8080/user/register', {name: name, email: email, username: userName, password: password})
                    .then(res => {
                        console.log(res.data)
                        Cookies.set("ud", res.data);
                        window.location.href="/dashboard"
                    })
                    .catch(err => {
                        console.error(err);
                    })
                setButtonAnimation(true);
                console.log("Clicked")
                setIsRegisterButtonDisabled(true)
                registerButtonRef.current.innerHTML = 'Registering user... <i class="fal fa-spinner fa-spin"></i'
            }
        })
        
    }
    return (
        <div className="register-container">
            <div className="bg-dots">
                <div className="bg-dot bg-dot-1"></div>
                <div className="bg-dot bg-dot-2"></div>
                <div className="bg-dot bg-dot-3"></div>
                <div className="bg-dot bg-dot-4"></div>
                <div className="bg-dot bg-dot-5"></div>
            </div>
            <div className="register-content-container">
                <div className="register-content">
                    <Typography variant="h5" className="text-light">
                        <center>
                            Create an Account
                        </center>
                    </Typography>
                    <form action="" id="register-form">
                        <input type="text"
                            className="form-input form-input-large"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            name="name"
                            spellCheck="false"
                        />
                        <div className="form-row">
                            <input type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                name="email"
                                spellCheck="false"
                            />
                            <input type="text"
                                className="form-input"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Username"
                                name="username"
                                spellCheck="false"
                            />
                        </div>
                        <input type="password"
                            className="form-input form-input-large"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            name="password"
                            spellCheck="false"
                            onBlur={() => setShowPasswordWarnings(false)}
                            onFocus={() => setShowPasswordWarnings(true)}
                        />
                        <div className={`password-warnings ${showPasswordWarnings ? "password-warnings-show" : "password-warnings-hide"}`}>
                            <ul>
                                <li className={`${alphabetTest ? "password-pass" : "password-fail"}`}>
                                    Uppercase and lowercase alphabetical characters.
                                </li>
                                <li className={`${numberOfCharactersTest ? "password-pass" : "password-fail"}`}>
                                    Eight characters or longer
                                </li>
                                <li className={`${numericTest ? "password-pass" : "password-fail"}`}>
                                    One numeric integer
                                </li>
                                <li className={`${specialTest ? "password-pass" : "password-fail"}`}>
                                    One special character
                                </li>
                            </ul>
                        </div>
                        <input type="password"
                            className={`form-input form-input-large ${confrimPasswordError ? "form-input-error" : ""}`}
                            value={passwordConfirm}
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value)
                            }}
                            placeholder="Retype Password"
                            name="password_confirm"
                            spellCheck="false"
                        />
                        <div className={`accept-terms ${isTermsErrorClass ? "accept-terms-error" : ""}`}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={isTermsAccepted}
                                        color="primary"
                                        value={isTermsAccepted}
                                        onChange={
                                            () => {
                                                setTermsAccepted(!isTermsAccepted);
                                            }
                                        }
                                        name="rememberMe"
                                    />
                                    }
                            />
                            I accept the <u>Terms and Conditions</u>
                        </div>
                        <button
                            className={`bg-dark text-light form-btn btn-full c_pointer ${isButtonAnimation ? "button-animate" : ""}`}
                            ref={registerButtonRef}
                            onClick={(e) => registerUser(e)}
                            disabled={isRegisterButtonDisabled}
                        >
                            Continue
                        </button>
                        <div className="new-here text-light">
                            <span>
                                Already have an account?
                            </span>
                            <Link to="/login" className="text-light">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
