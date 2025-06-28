import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { useLocation, Link } from "react-router-dom";

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
          )}&type=track,album,artist,playlist&limit=14`,
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

      {results.tracks.length > 0 && (
  <section>
    <h3>Tracks</h3>
    <Grid>
      {results.tracks.map((track) => (
        <LinkCard to={`/track/${track.id}`} key={track.id}>
          {Array.isArray(track.album?.images) && track.album.images[0]?.url ? (
            <img src={track.album.images[0].url} alt={track.name} />
          ) : (
            <Placeholder>{track.name?.[0] || "?"}</Placeholder>
          )}
          <p>{track.name}</p>
          <span>{track.artists.map((a) => a.name).join(", ")}</span>
        </LinkCard>
      ))}
    </Grid>
  </section>
)}
      {results.playlists.length > 0 && (
        <section>
          <h3>Playlists</h3>
          <Grid>
            {results.playlists.map((playlist) => (
              <LinkCard to={`/playlist/${playlist?.id}`} key={playlist?.id}>
                {playlist?.images?.[0]?.url ? (
                  <img src={playlist.images[0].url} alt={playlist?.name || "Playlist"} />
                ) : (
                  <Placeholder>{playlist?.name?.[0] || "?"}</Placeholder>
                )}
                <p>{playlist?.name || "Untitled Playlist"}</p>
              </LinkCard>
            ))}
          </Grid>
        </section>
      )}
      {results.albums.length > 0 && (
        <section>
          <h3>Albums</h3>
          <Grid>
            {results.albums.map((album) => (
              <LinkCard to={`/album/${album.id}`} key={album.id}>
                {Array.isArray(album.images) && album.images[0]?.url ? (
                  <img src={album.images[0].url} alt={album.name} />
                ) : (
                  <Placeholder>{album.name[0]}</Placeholder>
                )}
                <p>{album.name}</p>
                <span>{album.artists.map((a) => a.name).join(", ")}</span>
              </LinkCard>
            ))}
          </Grid>
        </section>
      )}
      {results.artists.length > 0 && (
        <section>
          <h3>Artists</h3>
          <Grid>
            {results.artists.map((artist) => (
              <LinkCard to={`/artist/${artist.id}`} key={artist.id}>
                {Array.isArray(artist.images) && artist.images[0]?.url ? (
                  <img src={artist.images[0].url} alt={artist.name} />
                ) : (
                  <Placeholder>{artist.name[0]}</Placeholder>
                )}
                <p>{artist.name}</p>
              </LinkCard>
            ))}
          </Grid>
        </section>
      )}

    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 200px);
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
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    background-color: rgb(10, 69, 30);
  }
`;

const LinkCard = styled(Card).attrs({ as: Link })`
 text-decoration: none;
  color: inherit;
`;

const Placeholder = styled.div`
  background-color: #333;
  color: #fff;
  width: 100%;
  height: 150px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;
