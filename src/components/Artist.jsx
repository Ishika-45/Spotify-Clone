import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";

export default function Artist() {
  const { id } = useParams();
  const [{ token }] = useStateProvider();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (!id || !token) return;

    const fetchArtistData = async () => {
      try {
        const [artistRes, topTracksRes] = await Promise.all([
          axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ]);

        setArtist(artistRes.data);
        setTopTracks(topTracksRes.data.tracks);
      } catch (err) {
        console.error("Error fetching artist data:", err);
      }
    };

    fetchArtistData();
  }, [id, token]);

  if (!artist) return <Container>Loading artist info...</Container>;

  return (
    <Container>
      <Header>
        <img src={artist.images?.[0]?.url} alt={artist.name} />
        <div>
          <h1>{artist.name}</h1>
          <p>{artist.followers.total.toLocaleString()} followers</p>
          <span>{artist.genres.join(", ")}</span>
          <Bio>
            <h4>More Info:</h4>
            <p>Popularity: {artist.popularity}/100</p>
            <p>Genres: {artist.genres.join(", ")}</p>
            <p>Spotify URI: <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">{artist.external_urls.spotify}</a></p>
          </Bio>
        </div>
      </Header>

      <Section>
        <h2>Top Tracks</h2>
        <TrackList>
          {topTracks.map((track) => (
            <Track key={track.id}>
              <img src={track.album.images[0].url} alt={track.name} />
              <div>
                <p>{track.name}</p>
                <span>{track.artists.map((a) => a.name).join(", ")}</span>
              </div>
            </Track>
          ))}
        </TrackList>
      </Section>
    </Container>
  );
}

const Container = styled.div`
    height: calc(100vh - 200px);
  padding: 2rem;
  color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  img {
    height: 200px;
    width:200px;
    border-radius: 50%;
  }
  h1 {
    margin: 0;
    font-size: 2.5rem;
  }
  span {
    color: #aaa;
  }
`;

const Bio = styled.div`
  margin-top: 1rem;
  p {
    margin: 0.3rem 0;
    color: #ccc;
  }
  a {
    color: #1db954;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Section = styled.div`
  margin-top: 3rem;
  h2 {
    margin-bottom: 1rem;
  }
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Track = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  img {
    height: 60px;
    width: 60px;
    border-radius: 4px;
  }
  p {
    margin: 0;
    font-weight: bold;
  }
  span {
    font-size: 0.9rem;
    color: #aaa;
  }
`;
