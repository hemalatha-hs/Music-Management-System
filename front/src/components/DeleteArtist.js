import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DeletePlaylist.css';

const DeleteArtist = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:8080/artists');
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleSelectArtist = (artistId) => {
    setSelectedArtistId(artistId);
  };

  const handleDeleteArtist = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/artists/${selectedArtistId}`);
      console.log('Artist deleted successfully:', response.data);
      alert('Artist deleted successfully!');
      fetchArtists(); // Refresh artist list after deletion
      setSelectedArtistId(null); // Clear selected artist state
    } catch (error) {
      console.error('Error deleting artist:', error);
      alert('Error deleting the artist!');
    }
  };

  return (
    <div className="form-container">
      <h2 className='h2'>Delete Artist</h2>
      <select onChange={(e) => handleSelectArtist(e.target.value)}>
        <option value="null">Select Artist to Delete</option>
        {artists.map((artist) => (
          <option key={artist.artist_id} value={artist.artist_id}>
            {artist.name}
          </option>
        ))}
      </select>
      {selectedArtistId && (
        <button className="delete-song-button" onClick={handleDeleteArtist}>Delete Artist</button>
      )}
    </div>
  );
};

export default DeleteArtist;
