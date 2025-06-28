import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { useLocation } from "react-router-dom";

export default function Search() {
  const [{ token }] = useStateProvider();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [results, setResults] = useState({
    tracks: [],
    albums: [],
    artists: [],
    playlists: [],
  });

  useEffect(() => {
    if (!query || !token) return;

    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query
          )}&type=track,album,artist,playlist&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResults({
          tracks: data.tracks?.items || [],
          albums: data.albums?.items || [],
          artists: data.artists?.items || [],
          playlists: data.playlists?.items || [],
        });
      } catch (err) {
        console.error("Search API Error:", err);
      }
    };

    fetchSearchResults();
  }, [query, token]);

  return (
    <Container>
      <h2>Results for "{query}"</h2>

      {results.artists.length > 0 && (
        <section>
          <h3>Artists</h3>
          <Grid>
            {results.artists.map((artist) => (
              <Card key={artist.id}>
                <img src={artist.images[0]?.url} alt={artist.name} />
                <p>{artist.name}</p>
              </Card>
            ))}
          </Grid>
        </section>
      )}

      {results.tracks.length > 0 && (
        <section>
          <h3>Tracks</h3>
          <Grid>
            {results.tracks.map((track) => (
              <Card key={track.id}>
                <img src={track.album.images[0]?.url} alt={track.name} />
                <p>{track.name}</p>
                <span>{track.artists.map((a) => a.name).join(", ")}</span>
              </Card>
            ))}
          </Grid>
        </section>
      )}

      {results.albums.length > 0 && (
        <section>
          <h3>Albums</h3>
          <Grid>
            {results.albums.map((album) => (
              <Card key={album.id}>
                <img src={album.images[0]?.url} alt={album.name} />
                <p>{album.name}</p>
                <span>{album.artists.map((a) => a.name).join(", ")}</span>
              </Card>
            ))}
          </Grid>
        </section>
      )}

      {results.playlists.length > 0 && (
        <section>
          <h3>Playlists</h3>
          <Grid>
            {results.playlists.map((playlist) => (
              <Card key={playlist.id}>
                <img src={playlist.images[0]?.url} alt={playlist.name} />
                <p>{playlist.name}</p>
              </Card>
            ))}
          </Grid>
        </section>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  color: white;
  h2 {
    margin-bottom: 1rem;
  }
  section {
    margin-bottom: 3rem;
  }
  h3 {
    margin-bottom: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background-color: #181818;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  img {
    width: 100%;
    border-radius: 4px;
    object-fit: cover;
  }
  p {
    margin: 0.5rem 0 0.2rem;
    font-weight: bold;
  }
  span {
    font-size: 0.9rem;
    color: #aaa;
  }
`;
