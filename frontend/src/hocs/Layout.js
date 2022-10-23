import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import {
   checkAuthenticated,
   load_user,
   googleAuthenticate,
} from "../actions/auth";
import queryString from "query-string";

const Layout = (props) => {
   // console.log(props);
   let location = useLocation();
   useEffect(() => {
      // location. search will grab the element after the localhost:8000
      // then queryString.parse will putr the values into a key value pairs object
      const values = queryString.parse(location.search);
      const state = values.state ? values.state : null;
      const code = values.code ? values.code : null;

      console.log("state: " + state, "code: " + code);

      // if we have state and code we are going to try to authenticate with google
      //  else we do the normal authentication
      if (state && code) {
         props.googleAuthenticate(state, code);
      } else {
         props.checkAuthenticated();
         props.load_user();
      }
   }, [location]);
   return (
      <div>
         <Navbar />
         {props.children}
      </div>
   );
};
export default connect(null, {
   checkAuthenticated,
   load_user,
   googleAuthenticate,
})(Layout);
