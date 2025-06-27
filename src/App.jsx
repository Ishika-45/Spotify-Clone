// // src/App.jsx
// import React, { useEffect } from "react";
// import Login from "./components/Login";
// import Spotify from "./components/Spotify";
// import { useStateProvider } from "./utils/StateProvider";
// import { reducerCases } from "./utils/Constants";

// export default function App() {
//   const [{ token }, dispatch] = useStateProvider();

//   useEffect(() => {
//     const hash = window.location.hash;
//     let accessToken = localStorage.getItem("access_token");

//     // ✅ Extract token from URL fragment after login
//     if (!accessToken && hash) {
//       const params = new URLSearchParams(hash.substring(1));
//       accessToken = params.get("access_token");

//       if (accessToken) {
//         localStorage.setItem("access_token", accessToken);
//         dispatch({ type: reducerCases.SET_TOKEN, token: accessToken });
//         window.location.hash = ""; // Clean URL
//       }
//     }

//     // ✅ If token already in storage but not in context
//     if (accessToken && !token) {
//       dispatch({ type: reducerCases.SET_TOKEN, token: accessToken });
//     }

//     document.title = "Spotify";
//   }, [dispatch, token]);

//   return <div>{token ? <Spotify /> : <Login />}</div>;
// }
// src/App.jsx
// import React, { useEffect } from "react";
// import Login from "./components/Login";
// import Spotify from "./components/Spotify";
// import { useStateProvider } from "./utils/StateProvider";
// import { reducerCases } from "./utils/Constants";

// export default function App() {
//   const [{ token }, dispatch] = useStateProvider();

//   useEffect(() => {
//     const getAccessToken = async (code) => {
//       const client_id = "f4a151fe857e45a9b788201b0f9cb173";
//       const redirect_uri = "https://spotify-clone-murex-eight-39.vercel.app/";
//       const code_verifier = localStorage.getItem("code_verifier");

//       const body = new URLSearchParams({
//         client_id,
//         grant_type: "authorization_code",
//         code,
//         redirect_uri,
//         code_verifier,
//       });

//       const response = await fetch("https://accounts.spotify.com/api/token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body,
//       });

//       const data = await response.json();
//       if (data.access_token) {
//         localStorage.setItem("access_token", data.access_token);
//         dispatch({ type: reducerCases.SET_TOKEN, token: data.access_token });
//         window.history.replaceState({}, document.title, "/"); // clean URL
//       } else {
//         console.error("Failed to fetch access token", data);
//       }
//     };

//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");
//     const localToken = localStorage.getItem("access_token");

//     if (code && !token) {
//       getAccessToken(code);
//     } else if (localToken && !token) {
//       dispatch({ type: reducerCases.SET_TOKEN, token: localToken });
//     }
//   }, [dispatch, token]);

//   return <div>{token ? <Spotify /> : <Login />}</div>;
// }
// src/App.jsx
// import React, { useEffect } from "react";
// import Login from "./components/Login";
// import Spotify from "./components/Spotify";
// import { useStateProvider } from "./utils/StateProvider";
// import { reducerCases } from "./utils/Constants";

// const TOKEN_EXPIRY_TIME = 3600 * 1000; // 1 hour in milliseconds

// export default function App() {
//   const [{ token }, dispatch] = useStateProvider();

//   useEffect(() => {
//     const getAccessToken = async (code) => {
//       const client_id = "f4a151fe857e45a9b788201b0f9cb173";
//       const redirect_uri = "https://spotify-clone-murex-eight-39.vercel.app/home";
//       const code_verifier = localStorage.getItem("code_verifier");

//       const body = new URLSearchParams({
//         client_id,
//         grant_type: "authorization_code",
//         code,
//         redirect_uri,
//         code_verifier,
//       });

//       const response = await fetch("https://accounts.spotify.com/api/token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body,
//       });

//       const data = await response.json();
//       if (data.access_token) {
//         const timestamp = Date.now();
//         localStorage.setItem("access_token", data.access_token);
//         localStorage.setItem("token_timestamp", timestamp.toString());

//         dispatch({ type: reducerCases.SET_TOKEN, token: data.access_token });
//         window.history.replaceState({}, document.title, "/");
//       } else {
//         console.error("Failed to fetch access token", data);
//       }
//     };

//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");
//     const storedToken = localStorage.getItem("access_token");
//     const storedTimestamp = localStorage.getItem("token_timestamp");

//     if (code && !token) {
//       getAccessToken(code);
//     } else if (storedToken && storedTimestamp) {
//       const tokenAge = Date.now() - parseInt(storedTimestamp, 10);
//       if (tokenAge < TOKEN_EXPIRY_TIME) {
//         dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
//       } else {
//         // Token expired – clear and reload
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("token_timestamp");
//         localStorage.removeItem("code_verifier");
//         window.location.href = "/"; 
//       }
//     }
//   }, [dispatch, token]);

//   return <div>{token ? <Spotify /> : <Login />}</div>;
// }
// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";
import GlobalStyle from "./components/GlobalStyle";

const TOKEN_EXPIRY_TIME = 3600 * 1000; // 1 hour

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async (code) => {
      const client_id = "f4a151fe857e45a9b788201b0f9cb173";
      const redirect_uri = "https://spotify-clone-murex-eight-39.vercel.app/home";
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
        navigate("/home");
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
    } else if (storedToken && storedTimestamp) {
      const tokenAge = Date.now() - parseInt(storedTimestamp, 10);
      if (tokenAge < TOKEN_EXPIRY_TIME) {
        dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
        navigate("/home");
      } else {
        localStorage.clear();
        navigate("/");
      }
    }
  }, [dispatch, token, navigate]);

  return (
    <>
    <GlobalStyle/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={token ? <Spotify /> : <Login />} />
    </Routes>
    </>
  );
}
