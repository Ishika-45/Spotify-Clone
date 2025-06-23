import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Callback from "./components/Callback";


export default function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if(hash) {
      const token = hash.substring(1).split("&")[0].split('');
      console.log(token);
    }
  },[]);

  return (
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  )
}
