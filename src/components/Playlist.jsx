import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams ,Link} from "react-router-dom";
import axios from "axios";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";

export default function Playlist() {
  const [{ token }] = useStateProvider();
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mappedTracks = data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          album: track.album.name,
          artists: track.artists.map((a) => a.name).join(", "),
          duration: track.duration_ms,
          image: track.album.images?.[0]?.url,
        }));

        setPlaylist({
          name: data.name,
          description: data.description,
          image: data.images?.[0]?.url,
          tracks: mappedTracks,
          totalTracks: data.tracks.total,
        });
      } catch (error) {
        console.error("Failed to fetch playlist:", error);
      }
    };

    if (token && id) fetchPlaylist();
  }, [token, id]);

  const msToMinutesAndSeconds = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = ((ms % 60000) / 1000).toFixed(0);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!playlist) return <Container>Loading...</Container>;

  return (
    <Container>
      <div className="playlist">
        <div className="image">
          <img src={playlist.image} alt={playlist.name} />
        </div>
        <div className="details">
          <span className="type">PLAYLIST</span>
          <h1 className="title">{playlist.name}</h1>
          <p className="description">{playlist.description}</p>
          <span>{playlist.totalTracks} songs</span>
        </div>
      </div>
      <div className="list">
        <div className="header-row">
          <div className="col">
            <span>#</span>
          </div>
          <div className="col">
            <span>Title</span>
          </div>
          <div className="col">
            <span>Album</span>
          </div>
          <div className="col">
            <AiFillClockCircle />
          </div>
        </div>
        <div className="tracks">
  {playlist.tracks.map((track, index) => (
    <Link to={`/track/${track.id}`} key={track.id} className="row">
      <div className="col">
        <span>{index + 1}</span>
      </div>
      <div className="col detail">
        <div className="image">
          <img src={track.image} alt={track.name} />
        </div>
        <div className="info">
          <span className="name">{track.name}</span>
          <span>{track.artists}</span>
        </div>
      </div>
      <div className="col">
        <span>{track.album}</span>
      </div>
      <div className="col">
        <span>{msToMinutesAndSeconds(track.duration)}</span>
      </div>
    </Link>
  ))}
</div>

      </div>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 200px);
  overflow-y: auto;
  padding-bottom: 5rem;
  padding-top: 1rem;
  color: white;

  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;

      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }

  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      padding: 1rem 3rem;
      font-weight: bold;
    }

    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      .row {
        text-decoration:none;
        color:inherit;
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
        align-items: center;
        border-radius: 4px;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;

          img {
            height: 40px;
            width: 40px;
          }
        }

        .detail {
          display: flex;
          gap: 1rem;

          .info {
            display: flex;
            flex-direction: column;
          }

          .name {
            font-weight: bold;
          }
        }
      }
    }
  }

  &::-webkit-scrollbar {
    width: 0.6rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 1rem;
  }
`;
