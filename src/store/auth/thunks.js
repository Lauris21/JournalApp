import {
  loginUser,
  registerUser,
  signInWithGoogle,
} from "../../firebase/provider";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }

    dispatch(login(result));
  };
};

export const startCreatingUser = ({ displayName, email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } = await registerUser({
      displayName,
      email,
      password,
    });
    if (!ok) {
      return dispatch(logout({ errorMessage }));
    }

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, displayName, errorMessage } = await loginUser({
      email,
      password,
    });

    if (!ok) {
      dispatch(logout({ errorMessage }));
    }

    dispatch(login({ uid, photoURL, displayName, email, password }));
  };
};
