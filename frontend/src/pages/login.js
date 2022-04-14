import React from "react";
import authService from "../services/authService";

function Login() {
	const [formData, setFormData] = React.useState({
		email: "",
		password: ""
	})

	const { email, password } = formData;
	
	const onChangeEmail = (e) => {
		setFormData({ ...formData, email: e.target.value })
	}

	const onChangePassword = (e) => {
		setFormData({ ...formData, password: e.target.value})
	}

	// alternatively, the above functions could be in one onChange
	// const { name, value } = event.target;
  // setFormData({ ...user, [name]: value });
	// the name is the name of the var (e.target.name) and the value 
	// is from e.target.value

	const handleSubmit = (e) => {
		e.preventDefault();
		authService.login(formData)
	}

	return (
		<form>
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
          onChange={onChangeEmail}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={onChangePassword}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
	);
}

export default Login;