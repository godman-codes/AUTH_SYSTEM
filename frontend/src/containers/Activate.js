import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({ verify }) => {
   const { uid, token } = useParams();
   const [requestSent, setRequestSent] = useState(false);

   const onSubmit = (e) => {
      e.preventDefault();
      verify(uid, token);
      setRequestSent(true);
   };

   if (requestSent) {
      return <Navigate to="/login" />;
   }
   return (
      <div className="container mt-5">
         <h1>Activate Account</h1>
         <form onSubmit={(e) => onSubmit(e)}>
            <br />
            <button type="submit" className="btn btn-primary">
               Activate Account
            </button>
         </form>
      </div>
   );
};

export default connect(null, { verify })(Activate);
