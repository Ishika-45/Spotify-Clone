// src/components/Callback.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) return;

    const getAccessToken = async () => {
      const codeVerifier = localStorage.getItem("code_verifier");
      const clientId = "f4a151fe857e45a9b788201b0f9cb173";
      const redirectUri = "https://spotify-clone-murex-eight-39.vercel.app/callback";

      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier,
      });

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const data = await response.json();

      if (data.access_token) {
        setToken(data.access_token);
        localStorage.setItem("access_token", data.access_token);
        navigate("/dashboard"); // ⬅️ Replace with your app's protected route
      } else {
        console.error("Token fetch failed", data);
      }
    };

    getAccessToken();
  }, [navigate]);

  return <div>Logging in with Spotify...</div>;
}
