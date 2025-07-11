import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";
import { Link } from "react-router-dom";

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album?.images?.[2]?.url || track.album?.images?.[0]?.url || "",
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span><AiFillClockCircle /></span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => (
                  <Link
                    to={`/track/${id}`}
                    className="row"
                    key={id}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row-level navigation interference
                    }}
                  >
                    <div
                      className="col"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation on play click
                        playTrack(id, name, artists, image, context_uri, track_number);
                      }}
                    >
                      <span>{index + 1}</span>
                    </div>
                    <div className="col detail">
                      <div className="image">
                        <img src={image} alt="track" />
                      </div>
                      <div className="info">
                        <span className="name">{name}</span>
                        <span>{artists.join(", ")}</span>
                      </div>
                    </div>
                    <div className="col">
                      <span>{album}</span>
                    </div>
                    <div className="col">
                      <span>{msToMinutesAndSeconds(duration)}</span>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </>
      )}
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

    .image img {
      height: 15rem;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
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
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }

    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;

      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        text-decoration: none;
        color: inherit;
        border-radius: 6px;

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
