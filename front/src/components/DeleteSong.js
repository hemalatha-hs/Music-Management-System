import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DeletePlaylist.css';

const DeleteSong = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleSelectSong = (songId) => {
    setSelectedSongId(songId);
  };

  const handleDeleteSong = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/songs/${selectedSongId}`);
      console.log('Song deleted successfully:', response.data);
      alert('Song deleted successfully!');
      fetchSongs(); // Refresh song list after deletion
      setSelectedSongId(null); // Clear selected song state
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('Error deleting the song!');
    }
  };

  return (
    <div className="form-container">
      <h2 className='h2'>Delete Song</h2>
      <select onChange={(e) => handleSelectSong(e.target.value)}>
        <option value="null">Select Song to Delete</option>
        {songs.map((song) => (
          <option key={song.song_id} value={song.song_id}>
            {song.title}
          </option>
        ))}
      </select>
      {selectedSongId && (
        <button className="delete-song-button" onClick={handleDeleteSong}>Delete Song</button>
      )}
    </div>
  );
};

export default DeleteSong;
