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
## 📸 ScreenShots

### 1. Login Page
![Screenshot 2025-06-29 223117](https://github.com/user-attachments/assets/1c4c5716-01ea-4fcc-97ba-d68f57bed696)

### 2. Home Page
![Screenshot 2025-06-29 223310](https://github.com/user-attachments/assets/1499a9d1-959b-487a-adc6-2fca693fe7fd)

### 3. User's PlayList Details Page
![Screenshot 2025-06-29 223405](https://github.com/user-attachments/assets/f02a18ff-dd33-4a81-9e3b-dca9ab39c316)

### 4. Search Result Tracks
![Screenshot 2025-06-29 223507](https://github.com/user-attachments/assets/8b1f744e-e4e1-4497-ac00-a3010a39f831)

### 5. Search Result Playlists
![Screenshot 2025-06-29 223530](https://github.com/user-attachments/assets/57d8ed25-f045-4ba8-9819-3e44c109cb23)

### 6. Search Result Albums
![Screenshot 2025-06-29 223556](https://github.com/user-attachments/assets/70ba33c3-6dc6-43d9-a17f-ca98c895fc5e)

### 7. Search Result Artits
![Screenshot 2025-06-29 223615](https://github.com/user-attachments/assets/1638e397-0ceb-4096-b95d-ffedb714347d)

### 8. Artits' Details Page
![Screenshot 2025-06-29 223719](https://github.com/user-attachments/assets/44ae4f18-7b90-415f-8a59-115c5add3dba)

### 9. Tracks' Details Page
![Screenshot 2025-06-29 223755](https://github.com/user-attachments/assets/cc75c071-57c9-4a4f-b1ab-3d9c039dcb09)

---

## 🛠 Tech Stack

- **Framework:** React + Vite
- **Styling:** styled-components
- **Routing:** React Router DOM
- **State Management:** Context API
- **Auth/API:** Spotify Web API with PKCE OAuth Flow

---

## 📦 Getting Started

git clone https://github.com/Ishika-45/Spotify-Clone.git

cd spotify-clone

npm install

npm run dev


---
## ⚠️ Spotify API Login Limitation:
In development mode, only Spotify users explicitly registered as collaborators in your Spotify developer dashboard can authenticate and log in through this app.
To allow broader access (e.g., for the public or demo users), you must request production access from Spotify for your application.
