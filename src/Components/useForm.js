import { useState } from "react";
import * as Constants from "./Conts";
export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({
    emailHelper: "",
    passwordHelper: "",
    emailError: false,
    passwordError: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    loggedIn,
    setLoggedIn,
  };
}
