import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './Assets/CSS/all.css'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Register from './Components/Register'


export default function App() {
  const [url, setUrl] = useState(new URL(window.location.href))
  useEffect(() => {
    console.log(url.pathname)
  })
  const [token, setToken] = useState(Cookies.get("ud"));
  if(token){
    return <Redirect to="/dashboard" />
  }
  else{
    return <Redirect to={url.pathname === '/login' ? "/login" : "/register"} />
  }
  return (
    <div>
        {/* <Login/> */}
        {/* <Register/> */}
    </div>
  )
}