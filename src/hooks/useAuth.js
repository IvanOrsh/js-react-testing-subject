import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../features/auth";
import { createSessionId, moviesApi } from "../utils";

export const useAuth = () => {
  const { isAuthenticated } = useSelector(userSelector);
  const dispatch = useDispatch();

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      let userData;

      if (token && sessionIdFromLocalStorage) {
        const { data } = await moviesApi.get(
          `/account?session_id=${sessionIdFromLocalStorage}`,
        );
        userData = data;
      } else if (token) {
        const sessionId = await createSessionId();
        const { data } = await moviesApi.get(
          `/account?session_id=${sessionId}`,
        );
        userData = data;
      }

      dispatch(setUser(userData));
    };

    if (token) {
      logInUser();
    }
  }, [dispatch, token, sessionIdFromLocalStorage]);

  return { isAuthenticated };
};

export const logout = () => {
  localStorage.clear();

  window.location.href = "/";
};
