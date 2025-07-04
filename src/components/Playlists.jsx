import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { useNavigate } from "react-router-dom";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const playlists = items.map(({ name, id, images }) => {
          return { name, id, image: images?.[0]?.url || "" };
        });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };

    if (token) {
      getPlaylistData();
    }
  }, [token, dispatch]);

  const handlePlaylistClick = (playlistId) => {
    if (!playlistId || typeof playlistId !== "string") return;
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId: playlistId });
    navigate(`/playlist?id=${playlistId}`);
  };

  return (
    <Container>
      <ul>
        {playlists?.map(({ name, id, image }) => (
          <li key={id} onClick={() => handlePlaylistClick(id)}>
            <div className="playlist-item">
              {image && <img src={image} alt={name} />}
              <span>{name}</span>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        color: white;
      }

      .playlist-item {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
        }

        span {
          font-size: 1rem;
        }
      }
    }
  }
`;
