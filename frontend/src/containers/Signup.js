import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

const Signup = ({ signup }) => {
   const [formData, setFormData] = useState({
      email: "",
      name: "",
      password: "",
      re_password: "",
   });
   const [messageBar, setMessageBar] = useState(false);

   const { email, name, password, re_password } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      if (password === re_password) {
         signup(email, name, password, re_password);
         setMessageBar(true);
      }
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
                  name="name"
                  placeholder="Name"
                  value={name}
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
         <p className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
         </p>
      </div>
   );
};

export default connect(null, { signup })(Signup);
