// // import React, { useEffect, useState } from 'react';
// // import Login from './components/Login';
// // import Spotify from './components/Spotify';
// // import { reducerCases } from './utils/Constants';
// // import { useStateProvider } from './utils/StateProvider';

// // export default function App() {
// //   const [accessToken, setAccessToken] = useState(null);
// //   const [ { storedToken }, dispatch] = useStateProvider();

// //   useEffect(() => {
// //     // 1. Check if token already exists in localStorage
// //     const storedToken = localStorage.getItem('access_token');

// //     if (storedToken) {
// //       setAccessToken(storedToken);
// //       dispatch( { type: reducerCases.SET_TOKEN, storedToken})
// //     }

// //   }, [storedToken, dispatch]);

// //   // You can now use `accessToken` anywhere in the app
// //   console.log("Access Token:", accessToken);

// //   return (
    
// //     <div>
// //       {storedToken ? <Spotify /> : <Login /> }
// //     </div>
// //   );
// // }

// // src/App.jsx
// import React, { useEffect } from "react";
// import Login from "./components/Login";
// import Spotify from "./components/Spotify";
// import { reducerCases } from "./utils/Constants";
// import { useStateProvider } from "./utils/StateProvider";

// export default function App() {
//   const [{ token }, dispatch] = useStateProvider();

//   useEffect(() => {
//     // Get token from URL hash (after Spotify login)
//     const hash = window.location.hash;
//     if (hash) {
//       const extractedToken = hash.substring(1).split("&")[0].split("=")[1];
//       if (extractedToken) {
//         dispatch({ type: reducerCases.SET_TOKEN, token: extractedToken });
//         localStorage.setItem("access_token", extractedToken);
//         window.location.hash = ""; // clean up URL
//       }
//     }

//     // If reloading, get token from localStorage
//     const storedToken = localStorage.getItem("access_token");
//     if (storedToken && !token) {
//       dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
//     }

//     document.title = "Spotify";
//   }, [dispatch, token]);

//   return <div>{token ? <Spotify /> : <Login />}</div>;
// }

import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    let accessToken = null;

    // 1️⃣ Extract token from URL hash (after login)
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      accessToken = params.get("access_token");

      if (accessToken) {
        dispatch({ type: reducerCases.SET_TOKEN, token: accessToken });
        localStorage.setItem("access_token", accessToken);
        window.location.hash = ""; // cleanup
      }
    }

    // 2️⃣ If page reloads, get token from localStorage
    const localToken = localStorage.getItem("access_token");
    if (localToken && !token) {
      dispatch({ type: reducerCases.SET_TOKEN, token: localToken });
    }

    document.title = "Spotify";
  }, [dispatch, token]);

  return <div>{token ? <Spotify /> : <Login />}</div>;
}
