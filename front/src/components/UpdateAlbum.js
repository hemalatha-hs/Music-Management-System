import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpdateAlbum.css';

const UpdateAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [formData, setFormData] = useState({
    album_id: '',
    title: '',
    release_date: '',
    artist_id: '',
  });

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

  const handleSelectAlbum = (album) => {
    setSelectedAlbum(album);
    setFormData({
      album_id: album.album_id,
      title: album.title,
      release_date: album.release_date,
      artist_id: album.artist_id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/albums/${selectedAlbum.album_id}`, formData);
      console.log('Album updated successfully:', response.data);
      alert('Album updated successfully!');
      fetchAlbums(); 
      setSelectedAlbum(null); 
      setFormData({ album_id: '', title: '', release_date: '', artist_id: '' }); 
    } catch (error) {
      console.error('Error updating album:', error);
      alert('Error updating the album!');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Album</h2>
      <select onChange={(e) => handleSelectAlbum(JSON.parse(e.target.value))}>
        <option value="null">Select Album</option>
        {albums.map((album) => (
          <option key={album.album_id} value={JSON.stringify(album)}>
            {album.title}
          </option>
        ))}
      </select>
      {selectedAlbum && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label>
              Album ID:
              <input
                type="number"
                name="album_id"
                value={formData.album_id}
                onChange={handleChange}
                disabled 
              />
            </label>
          </div>
          <div className="row">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Release Date:
              <input
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Artist ID:
              <input
                type="number"
                name="artist_id"
                value={formData.artist_id}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Update Album</button>
        </form>
      )}
    </div>
  );
};

export default UpdateAlbum;
