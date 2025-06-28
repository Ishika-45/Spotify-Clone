import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { FaPlay } from "react-icons/fa";

export default function TrackInfoPage() {
  const { id } = useParams();
  const [{ token }] = useStateProvider();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/tracks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTrack({
          name: data.name,
          artists: data.artists.map((a) => a.name).join(", "),
          album: data.album.name,
          albumImage: data.album.images?.[0]?.url,
          duration: data.duration_ms,
          popularity: data.popularity,
          preview_url: data.preview_url,
          release_date: data.album.release_date,
          explicit: data.explicit,
          track_number: data.track_number,
          type: data.type,
          uri: data.uri,
        });
      } catch (err) {
        console.error("Error fetching track info:", err);
      }
    };

    if (id && token) fetchTrack();
  }, [id, token]);

  const msToMinutes = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!track) return <Container>Loading...</Container>;

  return (
    <Container>
      <InfoCard>
        <img src={track.albumImage} alt={track.name} />
        <div className="details">
          <h1>{track.name}</h1>
          <p><strong>Artists:</strong> {track.artists}</p>
          <p><strong>Album:</strong> {track.album}</p>
          <p><strong>Released:</strong> {track.release_date}</p>
          <p><strong>Duration:</strong> {msToMinutes(track.duration)}</p>
          <p><strong>Popularity:</strong> {track.popularity}/100</p>

          <PlayButton
            onClick={() => window.open(`https://open.spotify.com/track/${id}`, "_blank")}
            title="Play on Spotify"
          >
            <FaPlay /> Play on Spotify
          </PlayButton>
        </div>
      </InfoCard>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  color: white;
  min-height: 100vh;
`;

const InfoCard = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  background-color: #181818;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  img {
    width: 200px;
    border-radius: 8px;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
      font-size: 2.2rem;
      margin: 0 0 0.5rem;
    }

    p {
      margin: 0;
      color: #ccc;
      font-size: 1rem;
    }

    audio {
      margin-top: 1rem;
      width: 100%;
    }
  }
`;

const PlayButton = styled.button`
  margin-top: 1.5rem;
  background-color: #1db954;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1ed760;
  }

  svg {
    font-size: 1.2rem;
  }
`;
