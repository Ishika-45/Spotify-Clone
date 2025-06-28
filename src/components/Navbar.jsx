// import React,{useState} from 'react'
// import { CgProfile } from 'react-icons/cg'
// import { FaSearch } from 'react-icons/fa'
// import styled from 'styled-components'
// import { useNavigate } from "react-router-dom";
// import { useStateProvider } from '../utils/StateProvider'

// export default function Navbar({ navBackground }) {
//   const [{ userInfo }] = useStateProvider();
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");

//   const handleSearch = (e) => {
//   if (e.key === "Enter" && query.trim()) {
//     navigate(`/search?q=${encodeURIComponent(query.trim())}`);
//   }
// };
//   return (
//     <Container navBackground={navBackground}>
//       <div className="search_bar">
//         <FaSearch />
//         <input
//   type="text"
//   placeholder="Artists, songs, or podcasts"
//   value={query}
//   onChange={(e) => setQuery(e.target.value)}
//   onKeyDown={handleSearch}
// />
//       </div>
//       <div className="avatar">
//         <a href={userInfo?.userUrl}>
//           <CgProfile />
//           <span>{userInfo?.userName}</span>
//         </a>
//       </div>
//     </Container>
//   )
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 2rem;
//   height: 15vh;
//   position: sticky;
//   top: 0;
//   transition: 0.3s ease-in-out;
//   background-color: ${({ navBackground }) =>
//     navBackground ? "rgba(0,0,0,0.7)" : "none"};
//   .search_bar{
//     background-color: white;
//     width: 30%;
//     padding: 0.4rem 1rem;
//     border-radius: 2rem;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     input{
//       border: none;
//       height: 2rem;
//       width: 100%;
//       &:focus {
//         outline: none; 
//       }
//     }
//   }
//   .avatar{
//     background-color: black;
//     padding: 0.3rem 0.4rem;
//     padding-right: 1rem;
//     border-radius: 2rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     a{
//       display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 0.5rem;
//     text-decoration: none;
//     color: white;
//     font-weight: bold;
//     svg {
//     font-size: 1.3rem;
//     background-color: #282828;
//     padding: 0.2rem;
//     border-radius: 1rem;
//     color: #c7c5c5;
//     }
//     }
//   }
// `

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaBell, FaDownload, FaUsers } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useStateProvider } from '../utils/StateProvider';

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Container>
      <div className="left">
          <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
        alt="spotify"
      />
      </div>

      <div className="center">
        <FaHome className="icon" />
        <div className="search_bar">
          <FaSearch />
          <input
            type="text"
            placeholder="What do you want to play?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className="right">
        <button className="premium">Explore Premium</button>
        <FaDownload className="icon" />
        <FaBell className="icon" />
        <FaUsers className="icon" />
        <div className="avatar">
          <a href={userInfo?.userUrl}>
            <CgProfile />
            <span>{userInfo?.userName?.[0] || "U"}</span>
          </a>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  height: 10vh;
  position: sticky;
  top: 0;
  background-color: "rgba(0,0,0,0.8)";
  z-index: 10;

  .left img {
    width: 40px;
  }

  .center {
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon {
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
    }

    .search_bar {
      background-color: #121212;
      color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      input {
        background: transparent;
        border: none;
        color: white;
        width: 300px;
        &:focus {
          outline: none;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1rem;

    .premium {
      background: white;
      color: black;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-weight: bold;
      border: none;
      cursor: pointer;
    }

    .icon {
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
    }

    .avatar {
      background-color: #1f1f1f;
      padding: 0.3rem 0.7rem;
      border-radius: 999px;
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: white;
        text-decoration: none;
        font-weight: bold;

        svg {
          font-size: 1.3rem;
          background-color: #282828;
          padding: 0.3rem;
          border-radius: 50%;
          color: #c7c5c5;
        }
      }
    }
  }
`;
