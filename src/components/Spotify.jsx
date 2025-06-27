// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import Body from './Body';
// import Footer from './Footer';
// import { useStateProvider } from '../utils/StateProvider';
// import axios from 'axios';
// import { reducerCases } from '../utils/Constants';

// export default function Spotify() {
//   const [{ token }, dispatch] = useStateProvider();
//   const [navBackground, setNavBackground] = useState(false);
//   const [headerBackground, setHeaderBackground] = useState(false);
//   const bodyRef = useRef();

//   const bodyScrolled = () => {
//     const scrollTop = bodyRef.current.scrollTop;
//     setNavBackground(scrollTop >= 30);
//     setHeaderBackground(scrollTop >= 268);
//   };

//   useEffect(() => {
//     const getUserInfo = async () => {
//       if(!token){
//         console.log("No token");
//       }
//       try {
//         console.log("tpken:",token);
//         const { data } = await axios.get("https://api.spotify.com/v1/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("User info received:", data);
//         if(!data){
//           console.log("No user info");
//         }
//         const userInfo = {
//           userId: data.id,
//           userUrl: data.external_urls.spotify,
//           userName: data.display_name,
//         };
//         dispatch({ type: reducerCases.SET_USER, userInfo });
//       } catch (err) {
//         console.error("Failed to fetch user info", err);
//       }
//     };

//     const getPlaybackState = async () => {
//       try {
//         const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         dispatch({
//           type: reducerCases.SET_PLAYER_STATE,
//           playerState: data?.is_playing ?? false,
//         });
//       } catch (err) {
//         console.error("Failed to fetch playback state", err);
//       }
//     };

//     if (token) {
//       getUserInfo();
//       getPlaybackState();
//     }
//   }, [dispatch, token]);

//   return (
//     <Container>
//       <div className="spotify_body">
//         <Sidebar />
//         <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
//           <Navbar navBackground={navBackground} />
//           <div className="body_contents">
//             <Body headerBackground={headerBackground} />
//           </div>
//         </div>
//       </div>
//       <div className="spotify_footer">
//         <Footer />
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   max-width: 100vw;
//   max-height: 100vh;
//   overflow: hidden;
//   display: grid;
//   grid-template-rows: 85vh 15vh;

//   .spotify_body {
//     display: grid;
//     grid-template-columns: 15vw 85vw;
//     height: 100%;
//     width: 100%;
//     background: linear-gradient(transparent, rgba(0, 0, 0, 1));
//     background-color: rgb(32, 87, 100);

//     .body {
//       height: 100%;
//       width: 100%;
//       overflow: auto;

//       &::-webkit-scrollbar {
//         width: 0.7rem;
//       }

//       &::-webkit-scrollbar-thumb {
//         background-color: rgba(255, 255, 255, 0.6);
//       }
//     }
//   }
// `;
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const storedToken=token || localStorage.getItem("access_token");

  const bodyScrolled = () => {
    const scrollTop = bodyRef.current.scrollTop;
    setNavBackground(scrollTop >= 30);
    setHeaderBackground(scrollTop >= 268);
  };

  // ✅ Helper function to handle token expiration
  const handleTokenError = (error) => {
    console.error("Token error:", error.response?.data || error.message);
    if (!storedToken ) {
  console.log("Invalid or missing token, redirecting to login");
  window.location.href = '/login';
  return;
}
  };

  useEffect(() => {
    const getUserInfo = async () => {
      // ✅ Validate token before making request
      if (!token) {
        console.log("No token available for user info request");
        return;
      }

      try {
        console.log("Fetching user info with token:", token.substring(0, 20) + "..."); // Debug log (partial token)
        
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
        
        console.log("User info received:", data);
        
        const userInfo = {
          userId: data.id,
          userUrl: data.external_urls.spotify,
          userName: data.display_name,
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });
      } catch (err) {
        console.error("Failed to fetch user info", err.response?.data || err.message);
        handleTokenError(err);
      }
    };

    const getPlaybackState = async () => {
      if (!token) {
        console.log("No token available for playback state request");
        return;
      }

      try {
        console.log("Fetching playback state...");
        
        const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
        
        console.log("Playback state received:", data);
        
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: data?.is_playing ?? false,
        });
      } catch (err) {
        // ✅ Note: 404 is normal if no active device
        if (err.response?.status === 404) {
          console.log("No active playback device found (this is normal)");
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: false,
          });
        } else {
          console.error("Failed to fetch playback state", err.response?.data || err.message);
          handleTokenError(err);
        }
      }
    };

    // ✅ Only make API calls if token exists
    if (token) {
      getUserInfo();
      getPlaybackState();
    } else {
      console.log("No token available, skipping API calls");
    }
  }, [dispatch, token]);

  // ✅ Show loading state if no token
  if (!token) {
    return (
      <Container>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          Loading...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="spotify_body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className="body_contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify_body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);

    .body {
      height: 100%;
      width: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0.7rem;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;
