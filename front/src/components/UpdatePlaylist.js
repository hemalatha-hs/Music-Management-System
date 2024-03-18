import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpdatePlaylist.css'

const UpdatePlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [formData, setFormData] = useState({
    playlist_id: '',
    title: '',
    description: '',
  });

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

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setFormData({
      playlist_id: playlist.playlist_id,
      title: playlist.title,
      description: playlist.description,
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
      const response = await axios.put(`http://localhost:8080/playlists/${selectedPlaylist.playlist_id}`, formData);
      console.log('Playlist updated successfully:', response.data);
      alert('Playlist updated successfully!');
      fetchPlaylists(); 
      setSelectedPlaylist(null); 
      setFormData({ playlist_id: '', title: '', description: '' }); 
    } catch (error) {
      console.error('Error updating playlist:', error);
      alert('Error updating the playlist!');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Playlist</h2>
      <select onChange={(e) => handleSelectPlaylist(JSON.parse(e.target.value))}>
        <option value="null">Select Playlist</option>
        {playlists.map((playlist) => (
          <option key={playlist.playlist_id} value={JSON.stringify(playlist)}>
            {playlist.title}
          </option>
        ))}
      </select>
      {selectedPlaylist && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label>
              Playlist ID:
              <input
                type="number"
                name="playlist_id"
                value={formData.playlist_id}
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
          <div className="row1">
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
          <button type="submit">Update Playlist</button>
        </form>
      )}
    </div>
  );
};

export default UpdatePlaylist;
