import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PlaylistList.css'; 

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:8080/playlists');
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  return (
    <div className="playlist-list-container">
      <h2 className='h1'>Playlist List</h2>
      <table className="playlist-table"> 
        <thead>
          <tr>
            <th>Playlist ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {playlists.map((playlist) => (
            <tr key={playlist.playlist_id}>
              <td>{playlist.playlist_id}</td>
              <td>{playlist.title}</td>
              <td>{playlist.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistList;
