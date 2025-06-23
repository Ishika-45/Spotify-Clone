import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Callback from './components/Callback';

export default function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // 1. Check if token already exists in localStorage
    const storedToken = localStorage.getItem('access_token');

    if (storedToken) {
      setAccessToken(storedToken);
    }

  }, []);

  // You can now use `accessToken` anywhere in the app
  console.log("Access Token:", accessToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}
