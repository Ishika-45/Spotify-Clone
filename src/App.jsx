import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";
import GlobalStyle from "./components/GlobalStyle";
import Search from "./components/Search";
import MainLayout from "./components/MainLayout";
import Body from "./components/Body";
import AlbumTracks from "./components/AlbumTracks";
import Artist from "./components/Artist";
import Playlist from "./components/Playlist";
import Song from "./components/Song";

const TOKEN_EXPIRY_TIME = 3600 * 1000; 

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const getAccessToken = async (code) => {
      const client_id = "f4a151fe857e45a9b788201b0f9cb173";
      const redirect_uri = "http://127.0.0.1:5173/";
      const code_verifier = localStorage.getItem("code_verifier");

      const body = new URLSearchParams({
        client_id,
        grant_type: "authorization_code",
        code,
        redirect_uri,
        code_verifier,
      });

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const data = await response.json();
      if (data.access_token) {
        const timestamp = Date.now();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token_timestamp", timestamp.toString());
        dispatch({ type: reducerCases.SET_TOKEN, token: data.access_token });
        if (location.pathname === "/") {
          window.history.replaceState({}, document.title, "/home");
          navigate("/home", { replace: true });
        }
      } else {
        console.error("Failed to fetch access token", data);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const storedToken = localStorage.getItem("access_token");
    const storedTimestamp = localStorage.getItem("token_timestamp");

    if (code && !token) {
      getAccessToken(code);
    } else if (storedToken && storedTimestamp && !token) {
      const tokenAge = Date.now() - parseInt(storedTimestamp, 10);
      if (tokenAge < TOKEN_EXPIRY_TIME) {
        dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
        if (location.pathname === "/") {
          navigate("/home", { replace: true });
        }
      } else {
        localStorage.clear();
        navigate("/", { replace: true });
      }
    }
  }, [dispatch, token, navigate, location.pathname]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        {token && (
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<Spotify />} />
            <Route path="search" element={<Search />} />
            <Route path="playlist" element={<Body/>}/>
            <Route path="album/:id" element={<AlbumTracks/>}/>
            <Route path="artist/:id" element={<Artist/>}/>
            <Route path="playlist/:id" element={<Playlist/>}/>
            <Route path="track/:id" element={<Song/>}/>
          </Route>
        )}
      </Routes>
    </>
  );
}