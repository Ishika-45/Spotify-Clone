import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { Link } from "react-router-dom";

export default function Spotify() {
  const [{ token },dispatch] = useStateProvider();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if(token){
      axios
        .get("https://api.spotify.com/v1/browse/new-releases?limit=20", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAlbums(response.data.albums.items);
        })
        .catch((err) => {
          console.error("Failed to fetch new releases:", err.response?.data || err.message);
        });
    }
    
  }, [ token]);

  

  return (
    <Container>
      <h2>New Releases Albums</h2>
      <Grid>
        {albums.map((album) => (
          <StyledLink to={`/album/${album.id}`} key={album.id}>
            <Card>
              {album.images?.[0]?.url ? (
                <img src={album.images[0].url} alt={album.name} />
              ) : (
                <Placeholder>{album.name[0]}</Placeholder>
              )}
              <p>{album.name}</p>
              <span>{album.artists.map((a) => a.name).join(", ")}</span>
            </Card>
          </StyledLink>
        ))}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 200px);
  padding: 2rem;
  color: white;

  h2 {
    margin-bottom: 1.5rem;
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
    color: white;
  }

  span {
    font-size: 0.9rem;
    color: #aaa;
  }
     &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    background-color:rgb(10, 69, 30);
  }
`;
const StyledLink = styled(Link)`
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
