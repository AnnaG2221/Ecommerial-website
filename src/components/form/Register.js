import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './form.css'

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;
  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/register";
      const res = await axios.post(url, formData);
      // navigate('/')
      setSuccess(res.data.success);
    } catch (error) {
      if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {

        setError(error.response.data.error);
			}
    }
  };

  return (
    <div className="form">
      <div className="innerForm">
        <h1>Sign up an account</h1>
        {success && <div style={{ color: "red" }} >{success}</div>}
        <form action="/register" method="post" onSubmit={submitHandle}>
          <div className="formInput">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              name="email"
              onChange={changeHandle}
            ></input>
            {/* <div style={formType.display}className='warning'>{formInfo.warnEmail}</div> */}
          </div>
          <div id="password" className="formInput">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={changeHandle}
            ></input>
            {/* <div style={formType.display} className='warning'> {formInfo.warnPassword}</div> */}
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit">Create account</button>
          <div className="innerBottom">
            <div>
              Already have an account
              <Link to="/login">
                <a>Sign in</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
