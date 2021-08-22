import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './Assets/CSS/all.css'
import Login from './Components/Login'

export default function App() {
  const [myVar, setVar] = useState(true);
  return (
    <div>
      {
        myVar === true ? <Redirect to="/login" /> : <Redirect to="/register" />
      }
    </div>
  )
}