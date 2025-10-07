import "./Auth.css";
import { loginHandler } from "../../services";
import { validateNumber } from "../utils/number-regex";
import { validatePassword } from "../utils/password-regex";
import { useAuth } from "../../context";

let isNumberValid, isPasswordValid;

export const AuthLogin = () => {
  const { authDispatch, number, password } = useAuth();

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

  const handlePasswordChange = (event) => {
    isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid password entered");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isNumberValid && isPasswordValid) {
      const { accessToken, username } = await loginHandler(number, password);
      authDispatch({
        type: "SET_ACCESS_TOKEN",
        payload: accessToken,
      });
      authDispatch({
        type: "SET_USERNAME",
        payload: username,
      });
    }

    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  const handleTestCredentialsClick = async () => {
    const { accessToken, username } = await loginHandler(9611554474, "Akil123#");
    authDispatch({
      type: "SET_ACCESS_TOKEN",
      payload: accessToken,
    });
    authDispatch({
      type: "SET_USERNAME",
      payload: username,
    });

    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
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
            Password <span className="asterisk">*</span>
          </label>
          <input
            defaultValue={password}
            className="auth-input"
            placeholder="Enter password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          <button className="button btn-primary btn-login cursor">Login</button>
        </div>
      </form>

      <div className="cta">
        <button
          className="button btn-outline-primary cursor-pointer"
          onClick={handleTestCredentialsClick}
        >
          Login with Test Credentials
        </button>
      </div>
    </div>
  );
};
