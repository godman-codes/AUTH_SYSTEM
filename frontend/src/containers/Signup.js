import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import axios from "axios";

const Signup = ({ signup }) => {
   const [formData, setFormData] = useState({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      re_password: "",
   });
   const [messageBar, setMessageBar] = useState(false);

   const { email, first_name, last_name, password, re_password } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      if (password === re_password) {
         signup(email, first_name, last_name, password, re_password);
         setMessageBar(true);
      }
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

   return (
      <div className="container mt-5">
         {messageBar && (
            <p>a link as been sent to your email for account activation</p>
         )}
         <h1>Sign Up</h1>
         <p>Create your Account</p>
         <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
               <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={first_name}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  required
               />
               <br />
               <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={last_name}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  required
               />
               <br />
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
               <br />
               <input
                  type="password"
                  name="re_password"
                  placeholder="Confirm Password"
                  value={re_password}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  required
                  minLength="6"
               />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
               Sign Up
            </button>
         </form>
         <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
            Continue With Google
         </button>
         <p className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
         </p>
      </div>
   );
};

export default connect(null, { signup })(Signup);
