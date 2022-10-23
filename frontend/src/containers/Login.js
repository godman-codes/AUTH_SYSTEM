import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import axios from "axios";

const Login = ({ login, isAuthenticated }) => {
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

   const continueWithGoogle = async () => {
      try {
         const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:8000`
         );
         console.log(res);
         // the we navigate to the authorization_url that we get as a result of the
         // making a post request to above url
         window.location.replace(res.data.authorization_url);
      } catch (err) {}
   };

   if (isAuthenticated) {
      return <Navigate to="/" />;
   }
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
         <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
            Continue With Google
         </button>
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
const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
