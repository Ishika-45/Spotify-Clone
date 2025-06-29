# 🎧 Spotify-Clone (Vite + React)

A fully responsive Spotify web application clone built with **Vite**, **React**, and the **Spotify Web API**. It replicates key features of the original Spotify web player — including search, playlists, album views, and track previews — while maintaining a sleek UI using `styled-components`.

## 🚀 Features

- 🔐 **Spotify Login** using Authorization Code Flow with PKCE
- 🎵 **User Playlists**: Browse your own playlists with images and metadata
- 🔍 **Powerful Search**: Find tracks, artists, albums, and playlists
- 📀 **Track Info Page**: See full details of any track including preview
- 💿 **Album Page**: View album details and track list
- 🎧 **Artist Info**: Genres, top tracks, and related metadata
- 🎼 **Playlist Page**: Styled like real Spotify with a full track list
- 🎨 Fully styled with **Styled Components**
- 🧭 Routing with **React Router v6**
- ⚛️ Global state management using **React Context API**
- ⚡ Fast bundling and dev server with **Vite**

---

## 📸 Screenshots

> You can add UI screenshots here to showcase Home, Search, Playlist, Artist, Track pages, etc.

---

## 🛠 Tech Stack

- **Framework:** React + Vite
- **Styling:** styled-components
- **Routing:** React Router DOM
- **State Management:** Context API
- **Auth/API:** Spotify Web API with PKCE OAuth Flow

---

## 📦 Getting Started

```bash
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone

npm install

npm run dev


---
## ⚠️ Spotify API Login Limitation:
In development mode, only Spotify users explicitly registered as collaborators in your Spotify developer dashboard can authenticate and log in through this app.
To allow broader access (e.g., for the public or demo users), you must request production access from Spotify for your application.
