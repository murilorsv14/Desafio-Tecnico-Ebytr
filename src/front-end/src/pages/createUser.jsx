import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUser, loginUser } from "../api/api";

const CreateUser = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lockButton, setLockButton] = useState(true);

  let history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === "email") return setEmail(value);
    if (name === "password") return setPassword(value);
    if (name === "name") return setName(value);
  };

  const validateLogin = (email, password, name) => {
    const minPasswordLength = 6;
    const minNameLength = 3;

    const validadeEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validatePass = password.length >= minPasswordLength;
    const validateName = name.length >= minNameLength;
    return validadeEmail && validatePass && validateName;
  };

  useEffect(() => {
    if (validateLogin(email, password, name)) {
      setLockButton(false);
    } else {
      setLockButton(true);
    }
  }, [email, password, name]);

  async function createUserSubmitButton() {
    const { error } = await createUser({ email: email, password: password, name: name });
    console.log(error, 'resposta created');
    if (error) return;
    const response = await loginUser({
      email: email,
      password: password,
    });
    if (response !== undefined) {
      localStorage.setItem("token", JSON.stringify(response));
      history.push("tasks");
    }
    return;
  }

  return (
    
    <div className="wrapper">
      <div className="login-img" />
      <div className="login-form-div">
        <div className="login-form-and-greetings">
          <p className="greetings">Welcome</p>
          <h2 className="login-header">Create your account</h2>
          <div className="login-form">
            <form>
              <div className="form-group">
                <label htmlFor="InputName">Name</label>
                <input
                  name="name"
                  onChange={handleChange}
                  value={name}
                  type="name"
                  className="form-control"
                  id="InputName"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="InputEmail">Email</label>
                <input
                  data-testid="input-Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                  value={email}
                  id="InputEmail"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input
                  data-testid="input-Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  value={password}
                  id="InputPassword"
                  placeholder="Enter Password"
                />
              </div>
            </form>
          </div>
          <button
            type="submit"
            data-testid="submit-button"
            disabled={lockButton}
            onClick={createUserSubmitButton}
            className="btn submit-button"
          >
            Create account
          </button>
        </div>
        <p id="login-link">
          Already have an account? <Link to={"/"}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default CreateUser;
