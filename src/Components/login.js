import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  TextField,
  Button
} from "@material-ui/core";
import { useForm } from "./useForm";

function Login(props) {

    const [inputValue, setInputValue] = useState('')

    const [loggedIn, setLoggedIn] = useState(false)
  
  
const updateInput = (e) => {
    setInputValue(e.target.value)
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("Name", inputValue)
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
        <div className="login_form">
        <Card className="login_card" raised>
          <form onSubmit={handleSubmit} Validate className="container" autoComplete="off">
            <h4 style={{marginBottom: "15px"}}>Enter Your Name</h4>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="UserName"
              name="UserName"
              onChange={updateInput}
              autoFocus
              placeholder="Enter Your Name"
            />
          <br />
          <Button
            className = "login_button"
              type="submit"
              variant="contained"
              color = "secondary"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                color: "white",
                width: "100%"
              }}
            >
              Login
            </Button>
          </form>
          </Card>
    </div>
    );
  }
}
export default Login;
