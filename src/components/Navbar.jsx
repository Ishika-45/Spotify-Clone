import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaBell } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoLogOut } from 'react-icons/io5';
import axios from 'axios';

export default function Navbar({ headerBackground }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setUserInfo({
          userId: data.id,
          userUrl: data.external_urls.spotify,
          userName: data.display_name,
        });
      } catch (err) {
        console.error("Failed to fetch user info", err.response?.data || err.message);
      }
    };

    getUserInfo();
  }, [token]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Container headerBackground={headerBackground}>
      <div className="center">
        <FaHome className="icon" onClick={() => navigate('/home')} />
        <div className="search_bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Albums, Artists or Tracks"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className="right">
        <FaBell className="icon" />
        <div className="avatar">
          <a href={userInfo?.userUrl} target="_blank" rel="noreferrer">
            <CgProfile />
            <span>{userInfo?.userName || "User"}</span>
          </a>
        </div>
        <IoLogOut className="logout-icon" onClick={handleLogout} title="Logout" />
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
  transition: 0.3s ease-in-out;
  background-color: ${({ headerBackground }) =>
    headerBackground ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)"};

  .center {
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon {
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: #1db954;
      }
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
        &::placeholder {
          color: #aaa;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon {
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: #1db954;
      }
    }

    .logout-icon {
      color: white;
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 0.3rem;
      border-radius: 50%;

      &:hover {
        color: #ff6b6b;
        background-color: rgba(255, 107, 107, 0.1);
      }
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
