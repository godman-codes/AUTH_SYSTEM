import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
   const [requestSent, setRequestSent] = useState(false);
   const [formData, setFormData] = useState({
      new_password: "",
      re_new_password: "",
   });
   const { uid, token } = useParams();
   const { new_password, re_new_password } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      reset_password_confirm(uid, token, new_password, re_new_password);
      setRequestSent(true);
   };

   if (requestSent) {
      return <Navigate to="/login" />;
   }
   return (
      <div className="container mt-5">
         <h1>Reset Password</h1>
         <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
               <input
                  type="password"
                  name="new_password"
                  placeholder="New Password"
                  value={new_password}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  required
               />
               <br />
               <input
                  type="Password"
                  name="re_new_password"
                  placeholder="Confirm New Password"
                  value={re_new_password}
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  required
               />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
               Reset Password
            </button>
         </form>
      </div>
   );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
