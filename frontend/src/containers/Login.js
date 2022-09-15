import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = ({ login }) => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const { email, password } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      login(email, password);
   };

   // is the user authenticated?
   // redirect them to the homepage
   return (
      <div className="container mt-5">
         <h1>Sign In</h1>
         <p>Sign into your Account</p>
         <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
               <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  required
               />
               <br />
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  required
                  minLength="6"
               />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
               Login
            </button>
         </form>
         <p className="mt-3">
            Don't have an account? <Link to="/signup">Signup</Link>
         </p>
         <p className="mt-3">
            Forgot Your Password?{" "}
            <Link to="/reset-password">Reset Password</Link>
         </p>
      </div>
   );
};
// const mapStateToProps = (state) => ({
//    //isAuthenticated:
// });

export default connect(null, { login })(Login);
