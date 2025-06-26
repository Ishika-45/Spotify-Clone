// src/App.jsx
import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = localStorage.getItem("access_token");

    // ✅ Extract token from URL fragment after login
    if (!accessToken && hash) {
      const params = new URLSearchParams(hash.substring(1));
      accessToken = params.get("access_token");

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        dispatch({ type: reducerCases.SET_TOKEN, token: accessToken });
        window.location.hash = ""; // Clean URL
      }
    }

    // ✅ If token already in storage but not in context
    if (accessToken && !token) {
      dispatch({ type: reducerCases.SET_TOKEN, token: accessToken });
    }

    document.title = "Spotify";
  }, [dispatch, token]);

  return <div>{token ? <Spotify /> : <Login />}</div>;
}
