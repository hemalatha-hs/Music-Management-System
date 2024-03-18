import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DeletePlaylist.css';

const DeleteAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:8080/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleSelectAlbum = (albumId) => {
    setSelectedAlbumId(albumId);
  };

  const handleDeleteAlbum = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/albums/${selectedAlbumId}`);
      console.log('Album deleted successfully:', response.data);
      alert('Album deleted successfully!');
      fetchAlbums(); // Refresh album list after deletion
      setSelectedAlbumId(null); // Clear selected album state
    } catch (error) {
      console.error('Error deleting album:', error);
      alert('Error deleting the album!');
    }
  };

  return (
    <div className="form-container">
      <h2 className='h2'>Delete Album</h2>
      <select onChange={(e) => handleSelectAlbum(e.target.value)}>
        <option value="null">Select Album to Delete</option>
        {albums.map((album) => (
          <option key={album.album_id} value={album.album_id}>
            {album.title}
          </option>
        ))}
      </select>
      {selectedAlbumId && (
        <button className="delete-song-button" onClick={handleDeleteAlbum}>Delete Album</button>
      )}
    </div>
  );
};

export default DeleteAlbum;
