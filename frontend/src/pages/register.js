import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { first_name, last_name, email, password1, password2 } = formData;

  const navigate = useNavigate();

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(formData.password1 === formData.password2)) {
      alert("Passwords dont match");
      return;
    }

    const userData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password1,
    };

    authService.register(userData).then((response) => {
      if (response.message) {
        alert(response.message);
      } else {
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="first_name">First name</label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          name="first_name"
          value={first_name}
          aria-describedby="firstNameHelp"
          placeholder="Enter first name"
          onChange={onChangeField}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last name</label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          name="last_name"
          value={last_name}
          aria-describedby="lastNameHelp"
          placeholder="Enter last name"
          onChange={onChangeField}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={onChangeField}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="password1">Password</label>
        <input
          type="password"
          className="form-control"
          id="password1"
          name="password1"
          value={password1}
          placeholder="Enter password"
          onChange={onChangeField}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password2">Confirm password</label>
        <input
          type="password"
          className="form-control"
          id="password2"
          name="password2"
          value={password2}
          placeholder="Confirm password"
          onChange={onChangeField}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default Register;
