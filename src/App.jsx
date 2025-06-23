import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Spotify from './components/Spotify';
import Callback from './components/Callback';
import { reducerCases } from './utils/Constants';
import { useStateProvider } from './utils/StateProvider';

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [ { storedToken }, dispatch] = useStateProvider();

  useEffect(() => {
    // 1. Check if token already exists in localStorage
    const storedToken = localStorage.getItem('access_token');

    if (storedToken) {
      setAccessToken(storedToken);
      dispatch( { type: reducerCases.SET_TOKEN, storedToken})
    }

  }, [storedToken, dispatch]);

  // You can now use `accessToken` anywhere in the app
  console.log("Access Token:", accessToken);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
    <div>
      {storedToken ? <Spotify /> : <Login /> }
    </div>
    </>
  );
}
