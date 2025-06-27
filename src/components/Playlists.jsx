// import axios from "axios";
// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { reducerCases } from "../utils/Constants";
// import { useStateProvider } from "../utils/StateProvider";

// export default function Playlists() {
//   const [{ token, playlists }, dispatch] = useStateProvider();
//   useEffect(() => {
//     const getPlaylistData = async () => {
//       const response = await axios.get(
//         "https://api.spotify.com/v1/me/playlists",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(token);
//       const { items } = response.data;
//       const playlists = items.map(({ name, id }) => {
//         return { name, id };
//       });
//       dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
//     };
//     getPlaylistData();
//   }, [token, dispatch]);
//   const changeCurrentPlaylist = (selectedPlaylistId) => {
//     dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
//   };
  
//   return (
//     <Container>
//       <ul>
//         {playlists.map(({ name, id }) => {
//           return (
//             <li key={id} onClick={() => changeCurrentPlaylist(id)}>
//               {name}
//             </li>
//           );
//         })}
//       </ul>
//     </Container>
//   );
// }

// const Container = styled.div`
//   color: #b3b3b3;
//   height: 100%;
//   overflow: hidden;
//   ul {
//     list-style-type: none;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     padding: 1rem;
//     height: 55vh;
//     max-height: 100%;
//     overflow: auto;
//     &::-webkit-scrollbar {
//       width: 0.7rem;
//       &-thumb {
//         background-color: rgba(255, 255, 255, 0.6);
//       }
//     }
//     li {
//       transition: 0.3s ease-in-out;
//       cursor: pointer;
//       &:hover {
//         color: white;
//       }
//     }
//   }
// `;

import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

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
        const playlists = items.map(({ name, id,images }) => {
          return { name, id, image: images?.[0]?.url || "", };
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

  const changeCurrentPlaylist = async (selectedPlaylistId) => {
  if (!selectedPlaylistId || typeof selectedPlaylistId !== "string") {
    console.warn("Invalid playlist ID:", selectedPlaylistId);
    return;
  }

  dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Selected playlist details:", response.data);
  } catch (error) {
    console.error("Failed to fetch playlist details:", error);
  }
};

  return (
    <Container>
      <ul>
        {playlists?.map(({ name, id,image }) => (
          <li key={id} onClick={() => changeCurrentPlaylist(id)}>
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
