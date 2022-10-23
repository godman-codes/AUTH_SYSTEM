import {
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   USER_LOADED_SUCCESS,
   USER_LOADED_FAIL,
   AUTHENTICATED_FAIL,
   AUTHENTICATED_SUCCESS,
   LOGOUT,
   PASSWORD_RESET_FAIL,
   PASSWORD_RESET_SUCCESS,
   PASSWORD_RESET_CONFIRM_SUCCESS,
   PASSWORD_RESET_CONFIRM_FAIL,
   SIGNUP_FAIL,
   SIGNUP_SUCCESS,
   ACTIVATION_FAIL,
   ACTIVATION_SUCCESS,
   GOOGLE_AUTH_SUCCESS,
   GOOGLE_AUTH_FAIL,
} from "./types";
import axios from "axios";

export const load_user = () => async (dispatch) => {
   if (localStorage.getItem("access")) {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
         },
      };
      try {
         const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/users/me/`,
            config
         );
         console.log(res.data);
         dispatch({
            type: USER_LOADED_SUCCESS,
            payload: res.data,
         });
      } catch (err) {
         dispatch({
            type: USER_LOADED_FAIL,
         });
      }
   } else {
      dispatch({
         type: USER_LOADED_FAIL,
      });
   }
};

export const googleAuthenticate = (state, code) => async (dispatch) => {
   // basically if we have a state and code but don't have an access
   // in the local storage the we can authenticate with google that means we haven't registered normally
   // before
   if (state && code && !localStorage.getItem("access")) {
      const config = {
         headers: {
            "content-type": "application/x-www-form-urlencoded",
         },
      };
      const details = {
         state: state,
         code: code,
      };
      // looping tHROUGH details and making it [state='state', code='code'] and den joining it together with to be a string
      // by separating it by '&'
      const formBody = Object.keys(details)
         .map(
            (key) =>
               encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
         )
         .join("&");
      try {
         const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`,
            config
         );
         console.log(res);
         dispatch({
            type: GOOGLE_AUTH_SUCCESS,
            payload: res.data,
         });
         dispatch(load_user());
      } catch (err) {
         dispatch({
            type: GOOGLE_AUTH_FAIL,
         });
      }
   }
};

export const checkAuthenticated = () => async (dispatch) => {
   if (localStorage.getItem("access")) {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
      };
      const body = JSON.stringify({ token: localStorage.getItem("access") });
      try {
         const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
            body,
            config
         );
         console.log(res.data);
         if (res.data.code !== "token_not_valid") {
            dispatch({
               type: AUTHENTICATED_SUCCESS,
            });
         } else {
            dispatch({
               type: AUTHENTICATED_FAIL,
            });
         }
      } catch (err) {
         dispatch({
            type: AUTHENTICATED_FAIL,
         });
      }
   } else {
      dispatch({
         type: AUTHENTICATED_FAIL,
      });
   }
};

export const login = (email, password) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   const body = JSON.stringify({ email, password });
   try {
      const res = await axios.post(
         `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
         body,
         config
      );
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });
      dispatch(load_user());
   } catch (err) {
      dispatch({
         type: LOGIN_FAIL,
      });
   }
};

export const signup =
   (email, first_name, last_name, password, re_password) =>
   async (dispatch) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      const body = JSON.stringify({
         email,
         first_name,
         last_name,
         password,
         re_password,
      });
      try {
         await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/`,
            body,
            config
         );
         dispatch({
            type: SIGNUP_SUCCESS,
         });
      } catch (err) {
         dispatch({
            type: SIGNUP_FAIL,
         });
      }
   };

export const verify = (uid, token) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   const body = JSON.stringify({ uid, token });
   try {
      await axios.post(
         `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
         body,
         config
      );
      dispatch({
         type: ACTIVATION_SUCCESS,
      });
   } catch (err) {
      dispatch({
         type: ACTIVATION_FAIL,
      });
   }
};

export const reset_password = (email) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };
   const body = JSON.stringify({ email });
   try {
      await axios.post(
         `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
         body,
         config
      );
      dispatch({
         type: PASSWORD_RESET_SUCCESS,
      });
   } catch (err) {
      dispatch({
         type: PASSWORD_RESET_FAIL,
      });
   }
};

export const reset_password_confirm =
   (uid, token, new_password, re_new_password) => async (dispatch) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      const body = JSON.stringify({
         uid,
         token,
         new_password,
         re_new_password,
      });
      try {
         await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
            body,
            config
         );
         dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
         });
      } catch (err) {
         dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL,
         });
      }
   };

export const logout = () => (dispatch) => {
   dispatch({
      type: LOGOUT,
   });
};
