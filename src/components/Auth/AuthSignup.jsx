import "./Auth.css";
import { useAuth } from "../../context";
import { validateEmail } from "../utils/email-regex";
import { validateName } from "../utils/name-regex";
import { validatePassword } from "../utils/password-regex";
import { validateNumber } from "../utils/number-regex";

import { signupHandler } from "../../services";
import { is } from '../../../node_modules/date-fns/locale/is';

let isNumberValid , isEmailValid , isNameValid , isPasswordValid , isConfirmPasswordValid;

export const AuthSignup = () => {
  const { username, email, password, number, confirmPassword, authDispatch } = useAuth();


  const handleNumberChange = (event) => {
     isNumberValid = validateNumber(event.target.value);
    if (isNumberValid) {
      authDispatch({
        type: "NUMBER",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid number entered");
    }
  };

  const handleEmailChange = (event) => {
     isEmailValid = validateEmail(event.target.value);
    if (isEmailValid) {
      console.log("valid email");
      authDispatch({
        type: "EMAIL",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid email entered");
    }
  };

  const handleNameChange = (event) => {
     isNameValid = validateName(event.target.value);
    if (isNameValid) {
      console.log("valid name");
      authDispatch({
        type: "NAME",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid name entered");
    }
  };

  const handlePasswordChange = (event) => {
     isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      console.log("valid password");
      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid password entered");
    }
  };

  const handleConfirmPasswordChange = (event) => {
     isConfirmPasswordValid = validatePassword(event.target.value);
    if (isConfirmPasswordValid) {
      console.log("valid confirm password");
      authDispatch({
        type: "CONFIRM_PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid confirm password entered");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isNumberValid && isEmailValid && isNameValid && isPasswordValid && isConfirmPasswordValid) 
      {
        signupHandler(username , number , email, password);
      }
      authDispatch(
        {
          
          type:"CLEAR_USER_DATA"

        });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>
          </label>
          <input
            defaultValue={number}
            className="auth-input"
            maxLength="10"
            placeholder="Enter mobile number"
            type="number"
            required
            onChange={handleNumberChange}
          />
        </div>

        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Name <span className="asterisk">*</span>
          </label>
          <input
            defaultValue={username}
            className="auth-input"
            placeholder="Enter Name"
            required
            onChange={handleNameChange}
          />
        </div>

        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Email <span className="asterisk">*</span>
          </label>
          <input
            defaultValue={email}
            className="auth-input"
            placeholder="Enter Email"
            type="email"
            required
            onChange={handleEmailChange}
          />
        </div>

        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>
          </label>
          <input
            defaultValue={password}
            className="auth-input"
            placeholder="Enter password"
            type="password"
            required
            onBlur={handlePasswordChange}
          />
        </div>

        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Confirm Password <span className="asterisk">*</span>
          </label>
          <input
            defaultValue={confirmPassword}
            className="auth-input"
            placeholder="Enter confirm password"
            type="password"
            required
            onBlur={handleConfirmPasswordChange}
          />
        </div>

        <div>
          <button className="button btn-primary btn-login cursor">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
