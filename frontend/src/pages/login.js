import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const form_style = { textAlign: "left", width: "50%" };

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  let navigate = useNavigate();

  const onChangeEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onChangePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  // alternatively, the above functions could be in one onChange
  // const { name, value } = event.target;
  // setFormData({ ...user, [name]: value });
  // the name is the name of the var (e.target.name) and the value
  // is from e.target.value

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.login(formData).then((response) => {
      console.log(response);
      if (response) {
        navigate("/", { replace: true });
      } else {
        console.log("Incorrect username or password");
        alert("Incorrect username or password");
      }
    });
  };

  return (
    <form style={form_style}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          aria-describedby="emailHelp"
          onChange={onChangeEmail}
          placeholder="Enter email address"
        ></input>
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Enter password"
        ></input>
      </div>
      <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Login;
