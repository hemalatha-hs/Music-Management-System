import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DeletePlaylist.css';

const DeletePlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

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

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  const handleDeletePlaylist = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/playlists/${selectedPlaylistId}`);
      console.log('Playlist deleted successfully:', response.data);
      alert('Playlist deleted successfully!');
      fetchPlaylists(); 
      setSelectedPlaylistId(null); 
    } catch (error) {
      console.error('Error deleting playlist:', error);
      alert('Error deleting the playlist!');
    }
  };

  return (
    <div className="form-container">
      <h2 className='h2'>Delete Playlist</h2>
      <select onChange={(e) => handleSelectPlaylist(e.target.value)}>
        <option value="null">Select Playlist to Delete</option>
        {playlists.map((playlist) => (
          <option key={playlist.playlist_id} value={playlist.playlist_id}>
            {playlist.title}
          </option>
        ))}
      </select>
      {selectedPlaylistId && (
        <button className="delete-song-button" onClick={handleDeletePlaylist}>Delete Playlist</button>
      )}
    </div>
  );
};

export default DeletePlaylist;
