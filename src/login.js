import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import './App.css'
import { Redirect } from "react-router-dom";

function Login(props) {

const [loggedIn, setLoggedIn] = useState(false);
const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true)
    localStorage.setItem("Name", inputValue)
  }

  const updateInput = (e) => {
    setInputValue(e.target.value)
  }

    if (loggedIn) {
      return <Redirect to="/dashboard" />;
    } else {
    return (
      <>
      <div className="login_form">
<form onSubmit={handleSubmit} autoComplete="off">
      <div>
        <h4>Enter Your Name:</h4>
        <TextField
          required
          id="outlined-required"
          label="Required"
          variant="outlined"
          onChange={updateInput}
        />
      </div>
      <Button
            className = "login_button"
              type="submit"
              variant="contained"
              color = "primary"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                color: "white"
              }}
            >
              Login
            </Button>
    </form>
    </div>
    </>
    )
  }
}

export default Login;