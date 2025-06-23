import React, { useEffect } from 'react'
import Login from './components/Login'

export default function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if(hash) {
      const token = hash.substring(1).split("&")[0].split('');
      console.log(token);
    }
  },[]);

  return (

      <Login />
  )
}
