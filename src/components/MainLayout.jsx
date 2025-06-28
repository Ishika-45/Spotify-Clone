import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <Container>
      <div className="spotify_body">
        <Sidebar />
        <div className="main_content">
          <Navbar />
          <div className="content_area">
            <Outlet />
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

    .main_content {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;

      .content_area {
        flex: 1;
        overflow:scroll ;

        &::-webkit-scrollbar {
          width: 0.7rem;
        }

        &::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;