import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";

export default function AlbumTracks() {
    const [{ token }] = useStateProvider();
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        if (token && id) {
            axios
                .get(`https://api.spotify.com/v1/albums/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => setAlbum(res.data))
                .catch((err) =>
                    console.error("Error fetching album tracks:", err.response?.data || err.message)
                );
        }
    }, [token, id]);

    const msToMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    if (!album) return <Container>Loading...</Container>;

    return (
        <Container>
            <div className="playlist">
                <div className="image">
                    <img src={album.images[0].url} alt="Album Art" />
                </div>
                <div className="details">
                    <span className="type">ALBUM</span>
                    <h1 className="title">{album.name}</h1>
                    <p className="description">{album.artists.map((a) => a.name).join(", ")}</p>
                </div>
            </div>

            <div className="list">
                <div className="header-row">
                    <div className="col"><span>#</span></div>
                    <div className="col"><span>TITLE</span></div>
                    <div className="col"><span>ALBUM</span></div>
                    <div className="col"><span><AiFillClockCircle /></span></div>
                </div>
                <div className="tracks">
  {album.tracks.items.map((track, index) => (
    <Link to={`/track/${track.id}`} className="row" key={track.id}>
      <div className="col"><span>{index + 1}</span></div>
      <div className="col detail">
        <div className="image">
          <img
            src={album.images[2]?.url || album.images[0]?.url}
            alt="Track"
          />
        </div>
        <div className="info">
          <span className="name">{track.name}</span>
          <span>{track.artists.map((a) => a.name).join(", ")}</span>
        </div>
      </div>
      <div className="col"><span>{album.name}</span></div>
      <div className="col"><span>{msToMinutesAndSeconds(track.duration_ms)}</span></div>
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
      background-color: #000000dc;
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
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;

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
