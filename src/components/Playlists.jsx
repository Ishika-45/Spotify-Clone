// import React, { useEffect } from 'react'
// import { useStateProvider } from '../utils/StateProvider'
// import axios from 'axios';
// import { reducerCases } from '../utils/Constants';
// import styled from 'styled-components';

// export default function Playlists() {
//     const [{ token, playlists }, dispatch] = useStateProvider();
//     useEffect(() => {
//         const getPlaylistData = async () => {
//             const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                     "Content-Type": "application/json",
//                 }
//             })
//             const { items } = response.data;
//             const playlists = items.map(({ name, id }) => {
//                 return { name, id };
//             });
//             dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
//         };
//         getPlaylistData();
//     }, [token, dispatch]);
//     return (
//         <div>
//             <ul>
//                 {
//                     playlists.map(({ name, id }) => {
//                         return (
//                             <li></li>
//                         )
//                     })
//                 }
//                  {
//                     playlists.map(({ name, id }) => {
//                         return (
//                             <li></li>
//                         )
//                     })
//                 }
//             </ul>
//         </div>
//     )
// }
// const Container = styled.div`
// height: 100%;
// overflow: hidden;

// ul{
//     list-style-type: none;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     padding: 1rem;
//     height: 52vh;
//     max-height: 100%;
//     oveflow: auto;
//     &::-webkit-scrollbar {
//         width: 0.7rem;
//         &-thumb {
//             background-color: rgba(255,255,255,0.6);
//         }
//     }
//     li{
//         display: flex;
//         gap: 1rem;
//         cursor: pointer;
//         transition: 0.3s ease-in-out;
//         &:hover {
//             color: white;

//         }
//     }
// }
// `

// import React, { useEffect } from 'react';
// import { useStateProvider } from '../utils/StateProvider';
// import axios from 'axios';
// import { reducerCases } from '../utils/Constants';
// import styled from 'styled-components';

// export default function Playlists() {
//   const [{ token, playlists }, dispatch] = useStateProvider();

//   useEffect(() => {
//     const getPlaylistData = async () => {
//       const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
//         headers: {
//           Authorization: "Bearer " + token,
//           "Content-Type": "application/json",
//         }
//       });
//       const { items } = response.data;
//       const playlists = items.map(({ name, id }) => ({ name, id }));
//       dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
//     };

//     if (token) getPlaylistData();
//   }, [token, dispatch]);

//   return (
//     <Container>
//       <ul>
//         {playlists &&
//           playlists.map(({ name, id }) => (
//             <li key={id}>{name}</li>
//           ))}
//       </ul>
//     </Container>
//   );
// }

// const Container = styled.div`
//   height: 100%;
//   overflow: hidden;

//   ul {
//     list-style-type: none;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     padding: 1rem;
//     height: 52vh;
//     max-height: 100%;
//     overflow: auto;

//     &::-webkit-scrollbar {
//       width: 0.7rem;
//     }

//     &::-webkit-scrollbar-thumb {
//       background-color: rgba(255, 255, 255, 0.6);
//     }

//     li {
//       display: flex;
//       gap: 1rem;
//       cursor: pointer;
//       transition: 0.3s ease-in-out;

//       &:hover {
//         color: white;
//       }
//     }
//   }
// `;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No access token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlaylists(response.data.items);
      } catch (err) {
        console.error("Error fetching playlists:", err);
        setError("Failed to fetch playlists. Please login again.");
      }
    };

    fetchPlaylists();
  }, []);

  if (error) return <Message>{error}</Message>;

  return (
    <Container>
      <h1>Your Spotify Playlists</h1>
      {playlists.length === 0 ? (
        <Message>Loading playlists...</Message>
      ) : (
        <List>
          {playlists.map((playlist) => (
            <Card key={playlist.id}>
              <img src={playlist.images?.[0]?.url} alt={playlist.name} />
              <h3>{playlist.name}</h3>
              <p>{playlist.tracks.total} tracks</p>
            </Card>
          ))}
        </List>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  background: #121212;
  color: white;
  min-height: 100vh;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #f54242;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background-color: #282828;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  transition: 0.3s;
  &:hover {
    background-color: #333;
  }
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0.5rem;
  }
  h3 {
    margin: 1rem 0 0.5rem;
    font-size: 1rem;
  }
  p {
    font-size: 0.9rem;
    color: #aaa;
  }
`;
